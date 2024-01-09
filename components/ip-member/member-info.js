import Image from "next/image";
import {useRouter} from 'next/router'


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
    
    return (

<div className="project-card">
<div className="card card-side bg-base-100 shadow-xl flex">
  <figure className="w-1/2 flex justify-center items-center"> {/* 사진을 가운데 정렬 */}
    {imageSrc && <img src={imageSrc} alt="Uploaded Image" className="w-full h-auto rounded-l" />} 
  </figure>
  <div className="card-body w-1/2 flex flex-col justify-between p-4"> 
  <div>
  <div className="space-y-4">
      <h1 className="text-2xl font-bold">{dog_name}</h1>
      <h2 className="text-xl">견종 : {breed}</h2> 
      <h3 className="text-xl">성별 : {sex}</h3> 
      <h4 className="text-xl">나이 : {age}</h4> 
      <h5 className="text-xl">책임비 : {deposit}</h5> 
      <h6 className="text-xl">예치 기간 : {period}</h6> 
      <h7 className="text-xl">연락처 : {email}</h7>
    </div>
    </div>
    <div className="flex justify-center items-center">
            <button
          className="w-32 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => router.push({
            pathname:  `../../dogDetail`,
            query:{
              id: id,
            }

          })}
        >
          상세 정보
        </button>
        
            </div>
            </div></div>
            </div>
    );
}

