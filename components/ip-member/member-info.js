import Image from "next/image";
import {useRouter} from 'next/router'
//import imgfile from '../../public/images/profile/paw-print.jpg'
import { ReactComponent as Paw } from "../../public/images/profile/Paw_Print.svg";


export default function MemberItem({data}){

    const router = useRouter();

    const seq = data.user_seq
    const imageSrc = data?.image_src
    const email = data.email
    const name = data.name
    const birth = data.birth
    const hp = data.hp
    const address = data.address
    const regDttm = data.reg_dttm
    const modDttm = data.mod_dttm
    const dog_name = data.dog_name
    const sex = data.sex
    const breed = data.breed
    const age = data.age
    const deposit = data.deposit
    const period = data.period
    const id = data.id
    const dogId = data.dogId
    
    return (

<div className="project-card">
<div className="card card-side bg-base-100 flex">
  <figure className="flex-none w-1/2 mt-5 ml-5"> {/* 사진을 가운데 정렬 */}
    {imageSrc && <img src={imageSrc} alt="Uploaded Image" className="w-full h-auto rounded-l" />} 
  </figure>
  <div className="card-body w-1/2 flex flex-col justify-between p-4"> 
  <div>
  <div className="space-y-2">
      <h1 className="text-2xl font-bold mb-5">이름 : {dog_name}</h1>
      <h2 className="text-xl mb-1">견종 : {breed}</h2> 
      <h3 className="text-xl mb-1">성별 : {sex}</h3> 
      <h4 className="text-xl mb-1">나이 : {age}</h4> 
      
      
    </div>
    </div>
    <div className="flex justify-center items-center ">
            <button
        className="flex items-center w-35 mt-5 bg-violet-500 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-violet-500 font-bold rounded-lg text-sm px-5 py-2.5 text-amber-200 ml-2 mb-2"
        onClick={() => router.push({
            pathname:  `../../dogDetail`,
            query:{
              id: id,
              dogId: dogId,
            }

          })}
        >
        <img src="/images/profile/Paw_Print.svg" alt="Paw" className="mr-2"/>
  
          상세 정보
        </button>
        
            </div>
            </div></div>
            </div>
    );
    
}
