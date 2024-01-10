import Layout from "../components/layout"
import MemberItem from "../components/ip-member/member-info"
import {useRouter} from 'next/router'

export default function Projects({resData}) {
    const router = useRouter();
    
    function regSbt() {
        router.push('/user-reg-form')
    }    
    
    const brighterWhite = "rgba(255, 255, 255, 0.9)";

    return (
        <Layout>
            <div className="relative flex justify-center mx-auto px-2 min-w-8 sm:px-6 lg:px-8">
            <img className="w-full max-w-7xl h-100 sm:h-70 md:h-80 filter brightness-90" src="https://www.pdsa.org.uk/media/11747/golden-lab-running-through-field-with-man.jpg" />
                <div className="absolute top-1/2 left-1/2 brightness-200 shadow-lg transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-3xl font-bold font-['Inter']">
                    <p>보호 유기 동물을 입양하는 문화를 만들어 갑니다.</p>
                </div>
            </div>
            <br/>
            <div className="flex flex-col mx-auto px-4 min-w-0 sm:px-6 lg:px-8">
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl sm:text-xl ml-20">
                            PawEverFriends의 보호유기동물 : <span className="pl-4 text-blue-500">{resData.length}</span>
                        </h1>
                        <button className="text-center text-violet-500 text-md bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl border border-violet-500 mr-20" onClick={regSbt}>
                            입양 보내기
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 ml-12 mr-12">
                    {resData.map((list, index) => (
                        <div className="flex justify-center max-w-xs sm:max-w-sm md:max-w-md" key={index}>
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
    const res = await fetch('http://localhost:8080/dog', { cache: 'no-cache' });
    const data = await res.json();
  
    if (!Array.isArray(data)) {
      console.error('응답이 배열이 아닙니다:', data);
      return { props: { resData: [] } }; // 빈 배열 반환
    }
  
    const dogsWithoutReceiverId = data.filter(dog => !dog.receiverId);
    return { props: { resData: dogsWithoutReceiverId } };
  }
