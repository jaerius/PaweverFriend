import Layout from "../components/layout";
import MemberItem from "../components/ip-member/member-info";
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '../components/auth';

export default function Projects({ resData }) {
    const router = useRouter();
    const { user } = useAuth();

    function regSbt() {
        router.push('/user-reg-form');
    }

    // 로그인한 사용자의 ID
    const logInUserId = user?.id;

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-3 mb-10 bg-transparent">
                <h1 className="text-4xl font-bold sm:text-6xl">
                    {user ? `${user?.name}님의 유기보호동물` : '로그인 후 이용해주세요'}
                    <span className="pl-4 text-blue-500"></span>
                </h1>
                <br />
                <br />
                <br />
                <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" onClick={regSbt}>
                    사용자등록
                </button>
                <br />

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {resData.map((list, index) => (
                        <div className="flex justify-center" key={index}>
                            <MemberItem data={list}></MemberItem>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

// 각 요청 때마다 호출
export async function getServerSideProps(context) {
    // 사용자가 로그인한 경우의 user ID
    const loggedInUserId = context.req.cookies ? context.req.cookies.userId : null;

    // 만약 쿠키가 존재하면 로그인한 사용자의 ID를 출력
    console.log('Logged In User ID:', loggedInUserId);

    // 로그인한 경우에만 서버에서 모든 사용자 정보를 가져옴
    let loggedInUserData = [];
    if (loggedInUserId) {
        const res = await fetch('http://localhost:8080/user', { cache: 'no-cache' });
        const allUsersData = await res.json();

        // 사용자가 로그인한 경우, 해당 ID에 맞는 사용자 정보만 필터링
        loggedInUserData = allUsersData.filter(user => user.id == loggedInUserId);
    }

    return {
        props: {
            resData: loggedInUserData,
        },
    };
}


