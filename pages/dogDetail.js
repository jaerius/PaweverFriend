import { useState, useEffect } from 'react';
import CommentSection from '../components/CommentSection';
import cookie from 'cookie';
import Layout from '../components/layout';
import { useRouter } from 'next/router'; // useRouter 가져오기 추가
import { useConnectWallet } from "@web3-onboard/react";
import {ethers} from "ethers";
import abi from "./api/abi";

const Dog = ({ dogData, comments, loggedInUserId }) => {
  const router = useRouter(); // useRouter로 router 가져오기
  const id = dogData.id
  const dogId = dogData.dogId
  const deposit = dogData.deposit
  const dog_name = dogData.dog_name
  const breed = dogData.breed
  const sex = dogData.sex
  const age = dogData.age
  const period = dogData.period
  const senderId = dogData.senderId
  const image_src = dogData.image_src
  
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	//지갑 연결
	//이더스 프로바이더: create an ethers provider
	let ethersProvider;
	if (wallet) {
	  ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any"); //ethers.BrowserProvider in v6
	}
	const PawEverFriends_CA = "0x402bb9D05F7cB024C3e2Fe3ABd79dA70C8E034Ac";

	const Paw_Refund = async (pet_Number)=> {
    const Paw_contract = new ethers.Contract(PawEverFriends_CA, abi, ethersProvider.getSigner());
    const Refund = await Paw_contract.refund(pet_Number);
    Refund.wait();
  }
  const Paw_StopRefund = async (pet_Number)=> {
    const Paw_contract = new ethers.Contract(PawEverFriends_CA, abi, ethersProvider.getSigner());
    const StopRefund = await Paw_contract.stopRefunding(pet_Number);
    StopRefund.wait();
  }
  
  function regSbt() {
    router.push({
      pathname: '/appform',
      query:{
        id: id,
        dogId: dogId,
        deposit: deposit,
        dog_name: dog_name,
        breed: breed,
        sex: sex,
        age: age,
        period: period,
        senderId: senderId,
        image_src: image_src,
        
        
      }});
  }

  

    return (
      <Layout>
      <div className="mx-auto mt-10 px-4 lg:px-40"> {/* 여기에 px-4 lg:px-20 클래스를 추가하여 여백을 조정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 items-stretch">
          <div className="col-span-1"> {/* 최대 최소 너비 설정 */}
            {/* 이미지를 가득 채우고 비율을 유지하기 위해 object-cover를 사용 */}
            <img src={dogData.image_src} alt="Dog" className="w-full h-64 md:h-auto " />
          </div>
          <div className="bg-indigo-50 border-2 border-neutral-200 p-4 flex flex-col justify-between h-full">
          <h1 className="text-2xl font-bold">이름 : {dogData.dog_name}</h1>
          <div className="border-t border-zinc-800 my-4"></div>
          <div className="flex-grow">
                <li className="text-black text-xl mb-2 font-body"> 묘종/견종: {dogData.breed}</li>
                <li className="text-black text-xl mb-2 font-['Inter']"> 나이: {dogData.age}</li>
                <li className="text-black text-xl mb-2 font-sans"> 성별: {dogData.sex}</li>
                <li className="text-black text-xl mb-2 font-normal"> 기간: {dogData.period}</li>
                <li className="text-black text-xl mb-2 font-normal"> 분양 책임금: {dogData.deposit}</li>
                {/* 나머지 개 정보 */}
              </div>
            </div>
            
          </div>
          
          {dogData.receiverId === null ? (
  loggedInUserId === dogData.senderId ? (
    <button
      className="text-center text-violet-500 text-lg bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl  border border-violet-500"
    >
      입양 대기중
    </button>
  ) : (
    <button
      className="text-center text-violet-500 text-lg bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl  border border-violet-500"
      onClick={regSbt}
    >
      입양받기신청
    </button>
  )
) : (
  <button
    className="text-center text-violet-500 text-lg bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl  border border-violet-500"
    onClick={() => {
      if (loggedInUserId === dogData.receiverId) {
        console.log(dogData.dogId);
        Paw_Refund(dogData.dogId);
      } else if (loggedInUserId === dogData.senderId) {
        // 환급 중단 버튼 동작 추가
        console.log("환급 중단");
        Paw_StopRefund(dogData.dogId);
      }
    }}
  >
    {loggedInUserId === dogData.receiverId ? "환급받기" : "환급중단"}
  </button>
)}




        
        <div className="mt-6">
          <CommentSection dogId={dogData.id} />
        </div>
      </div>
      <br/>
    </Layout>
    );
  };

export default Dog;

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie || '');
  const userCookie = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
  const loggedInUserId = userCookie ? userCookie.userId : null;

  

  console.log('Logged In User ID:', loggedInUserId);

  const { id } = context.query;
  const res = await fetch(`http://localhost:8080/dog/${id}`);
  const dogData = await res.json();

  const commentsRes = await fetch(`http://localhost:8080/dog/${id}`);
  const comments = await commentsRes.json();
  console.log(dogData.id)
  return {
    props: { dogData, comments,  loggedInUserId },
  };
}