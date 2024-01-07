'use client'
import Layout from "../components/layout";
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react';
import Image from "next/image";
import { Web3Storage } from 'web3.storage'
import { pinFileToIPFS } from "./pinata";
import axios from "axios";
import { useWallet } from './walletContext';
import abi from "./api/abi";
import {ethers} from "ethers";

export default function UserRegForm() {
	const {account, connectWallet} = useWallet('');

/*	let ethersProvider;
    if (account) {
   	    ethersProvider = new ethers.BrowserProvider(window.ethereum); //ethers.BrowserProvider in v6
    } */
	const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

	useEffect(() => {
        // 쿠키에서 userId 읽어와 상태에 설정
        const userCookie = getCookie('user');
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUserId(userData.userId);
        }
    }, []);

	const router = useRouter()
		const [userId, setUserId] = useState('');
		const [sex, setSex] = useState('');
	    const [image, setImage] = useState('')
		const [url, setUrl] =useState('')
		const [cid, setCid] = useState('')

        const handleChange = (event) => {
			setSex(event.target.value);
		  };


		function getAccessToken () {
			return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdmRWVDMmRiNjZkQmE2ODk0QzQ2MWFDMzg0YUY3OEI4OWRCRWVGRjIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTU3OTM4NTE5MTUsIm5hbWUiOiJpcC1zaGVpbGQifQ.UPG5fSYIewbayQrPWiPIIMUnv71fwQhgzostIFOWHlI'
		}
		function makeStorageClient () {
			return new Web3Storage({ token: getAccessToken() })
		}

		async function uploadImageToIPFS(event) {
			const file = event.target.files[0];
			if (!file) return;
	
			const client = makeStorageClient();
	
			// IPFS에 이미지 업로드하고 CID 얻기
			setCid( await client.put([file]));
			const ipfsUrl = `https://${cid}.ipfs.w3s.link/${file.name}`;
	
			setImage(ipfsUrl); // 업로드된 이미지 URL을 상태로 저장
		}


		const upload = async (e) => {
            
			const file = e.target.files[0];
			// 1. file(이미지파일)을 IPFS에 올려서 주소 받아오기.
			const result = await pinFileToIPFS(file); 
			setUrl(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
			
		}
		
  /*      
  // 1. 반려동물 입양 등록 함수
  const enrollPet = async (name, CID, balance, duration) => {

    const ca = "0x12493e27B5b2794a27d1e9Ca5b5a93871c4a71d4";
    // PawEverFriends 컨트랙트 객체
    const PEFcontract = new ethers.Contract(ca, abi, ethersProvider.getSigner());

    // 반려동물 입양 등록 함수
    const enroll = await PEFcontract.enroll(name, CID, balance, duration);

    // enroll 트랜잭션
    await enroll.wait();
	console.log(userId);
  };
	*/	

  return (
    <Layout >
		<section className="bg-white dark:bg-gray-900">
		  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
			  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">강아지 등록하기</h2>
			  <form id="sbtForm" onSubmit={ async (e) => {
				e.preventDefault()
	
				const frmData ={
					"image_src": url,
					"dog_name": e.target.dog_name.value,
					"breed": e.target.breed.value,
					"age": e.target.age.value,
					"sex": e.target.sex.value,
					"deposit": e.target.deposit.value,
					"period": e.target.period.value,
					"userId": userId, 
					"senderId": userId,
					"receiverId": null,
				}

	


				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(frmData)
				}
				await fetch('/user')

				await fetch('/dog' ,options)
				.then(function(response) {
					return response.json()
				})
				.then(function(myJson) {
					console.log(JSON.stringify(myJson))
					router.push('/ip-member')
				});
					
				
				
					  
			}} >
				
				  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">			  
					  <div>
					  <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">강아지 사진</label>
						<input
							type="file"
							name= "url"
							id= "url"
							onChange={upload}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="img"
							required=""
						/>		  
					  </div> 
					  <div className="w-full">
						  <label htmlFor="dog_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">강아지 이름</label>
						  <input type="text" name="dog_name" id="dog_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="강아지의 이름을 입력해주세요" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">나이</label>
						  <input type="text" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="나이를 입력해주세요" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="breed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">견종</label>
						  <input type="text" name="breed" id="breed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="견종을 입력해주세요" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">성별</label>
						  <select id="sex" value={sex} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							<option value="">선택하세요</option>
							<option value="male">수컷</option>
							<option value="female">암컷</option>
						  </select>
					 </div>
					 <div className="w-full">
						  <label htmlFor="deposit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">책임비</label>
						  <input type="text" name="deposit" id="deposit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="책임비를 입력해주세요" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">예치 기간</label>
						  <input type="text" name="period" id="period" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="기간을 입력해주세요" required="" />
					  </div>
				  </div>
				  <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
					  입양 등록
				  </button>
			  </form>
		  </div>
		</section>
    </Layout>
  )
}

