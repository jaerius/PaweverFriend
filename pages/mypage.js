import Layout from "../components/layout";
import MemberItem from "../components/ip-member/member-info";
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '../components/auth';
import { useState } from 'react';
import cookie from 'cookie';

export default function Projects({ sentDogs, receivedDogs }) {
    const router = useRouter();
    const { user } = useAuth();
    const [displayDogs, setDisplayDogs] = useState([]);

    function regSbt() {
        router.push('/user-reg-form');
    }

    const showSentDogs = () => {
        setDisplayDogs(sentDogs);
    };

    const showReceivedDogs = () => {
        setDisplayDogs(receivedDogs);
    };
    
   

    return (
        <Layout>
                <div className="flex justify-center">
                <h1 className="text-4xl sm:text-3xl">
                    {user ? `${user?.name}님의 유기보호동물` : '로그인 후 이용해주세요'}
                    <span className="pl-4 text-blue-500"></span>
                </h1>
                </div>
                <br />
                <br />
                <br />
                <div className="flex flex-col mx-2">
                <div className="flex justify-between items-center mb-4">
                <div>
                <button className="text-center text-violet-500 text-lg bg-white hover:bg-purple-300 font-bold py-2 px-4" onClick={showSentDogs}>입양 보낸 동물</button>
                <button className="text-center text-violet-500 text-lg bg-white hover:bg-purple-300 font-bold py-2 px-4" onClick={showReceivedDogs}>입양 받은 동물</button>
                </div>
                <button className="text-center text-violet-500 text-lg bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl  border border-violet-500" onClick={regSbt}>
                    입양 보내기
                </button> 
                </div>
                </div>
                
                <br />


                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {displayDogs.map((list, index) => (
                        <div className="flex justify-center" key={index}>
                            <MemberItem data={list}></MemberItem>
                        </div>
                    ))}
                </div>
            
        </Layout>
    );
}

// 각 요청 때마다 호출
export async function getServerSideProps(context) {
    // 사용자가 로그인한 경우의 user ID
  //  const loggedInUserId = context.req.cookies ? context.req.cookies.userId : null;
  const parsedCookies = cookie.parse(context.req.headers.cookie || '');
  const userCookie = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
  const loggedInUserId = userCookie ? userCookie.userId : null;
    // 만약 쿠키가 존재하면 로그인한 사용자의 ID를 출력
    console.log('Logged In User ID:', loggedInUserId);

    let sentDogs = [];
    let receivedDogs = [];
    // 로그인한 경우에만 서버에서 모든 사용자 정보를 가져옴
    let loggedInUserData = [];
    if (loggedInUserId) {
        const res = await fetch('http://localhost:8080/dog', { cache: 'no-cache' });
        const allDogsData = await res.json();

        // 사용자가 로그인한 경우, 해당 ID에 맞는 사용자 정보만 필터링
        sentDogs = allDogsData.filter(dog => dog.senderId == loggedInUserId);
        receivedDogs = allDogsData.filter(dog => dog.receiverId == loggedInUserId);    } 

    return {
        props: {
            sentDogs,
            receivedDogs,
        },
    };
}


