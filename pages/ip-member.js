import Layout from "../components/layout"
import MemberItem from "../components/ip-member/member-info"
import {useRouter} from 'next/router'

export default function Projects({resData}) {
    const router = useRouter();
    
    function regSbt() {
        router.push('/user-reg-form')
    }    
    
    return (
        <Layout>
    <div className="relative flex justify-center mx-2">
        <img className="w-full max-w-6xl h-auto sm:h-64 md:h-90 bg-black bg-opacity-30" src="https://www.pdsa.org.uk/media/11747/golden-lab-running-through-field-with-man.jpg"></img>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-3xl font-bold font-['Inter']">
            <p>보호 유기 동물을 입양하는 문화를 만들어 갑니다.</p>
        </div>
    </div>

    <div className="flex flex-col mx-2">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl sm:text-xl">
                PawEverFriends의 보호유기동물 : <span className="pl-4 text-blue-500">{resData.length}</span>
            </h1>
            <button className="text-center text-violet-500 text-md bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl  border border-violet-500" onClick={regSbt}>
                사용자 등록
            </button> 
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            {resData.map((list, index) => (
                <div className="flex justify-center max-w-xs sm:max-w-md">
                    <MemberItem data={list} key={index}></MemberItem>
                </div>
            ))}
        </div>
    </div>
</Layout>

    );
}

// 각 요청 때마다 호출
export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:8080/dog',{ cache: 'no-cache' })
    const resData = await res.json()    
    
    return {
      props: {resData},
    }
}
