import Layout from "../components/layout"
import { useRouter } from 'next/router'
import React, {useState} from 'react';


export default function Contract() {
	// 2. 반려동물 입양하기 함수
	const adoptPet = async (number, balance) => {  // balance를 문자열로 받아야함

		// PawEverFriends 컨트랙트 객체
		const PEFcontract = new ethers.Contract(PawEverFriends_CA, PawEverFriendsABI, ethersProvider.getSigner());
	
		// 입양에 필요한 이더량을 wei 단위로 설정
		const amountInWei = ethers.utils.parseEther(balance);
	
		// 반려동물 입양하기 함수
		const adopt = await PEFcontract.adopt(number, { value: amountInWei });
	
		// adopt 트랜잭션
		await adopt.wait();
	  };
	  
	const router = useRouter();

    
        const [isAgreed, setIsAgreed] = useState(false);
      
        const handleCheckboxChange = (event) => {
          setIsAgreed(event.target.checked);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            if (!isAgreed) {
              alert('동의해야 진행할 수 있습니다.');
              return;
            }
            // 동의하였으므로 폼 제출 또는 다음 단계로 진행
            alert('동의하였습니다!');
          };
        

  return (
    <Layout >
  
		<section className="bg-white dark:bg-gray-900">
		  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
			  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">입양 동의 여부</h2>
			  <form id="categoryForm" onSubmit={ async (e) => {
				e.preventDefault()
	
				const frmData ={
					"name": e.target.name.value,
					"code": e.target.code.value,
					"use_yn": e.target.use_yn.value
				}

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(frmData)
				}

				await fetch('/category' ,options)
				.then(function(response) {
					return response.json()
				})
				.then(function(myJson) {
					console.log(JSON.stringify(myJson))
					router.push('/ip-category')
				});
			}} >

<div className="terms-and-conditions mb-4 overflow-auto border border-gray-300 p-4" style={{ height: '300px' }}>
                  <p>

제 1 장 총칙



제 1조 (목적)



본 약관은 서비스(이하 "회사"라 한다)는 홈페이지에서 제공하는 서비스(이하 "서비스"라 한다)를 제공함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.



제 2조 (용어의 정의)



1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.

'서비스'란 회사가 이용자에게 서비스를 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 구성한 가상의 공간을 의미하며, 서비스 자체를 의미하기도 합니다.

'회원(이하 "회원"이라 한다)'이란 개인정보를 제공하여 회원등록을 한 자로서 홈페이지의 정보를 지속적으로 제공받으며 홈페이지가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.

'아이디(이하 "ID"라 한다)'란 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 회원 고유의 계정 정보를 의미합니다.

'비밀번호'란 회원이 부여 받은 ID와 일치된 회원임을 확인하고, 회원의 개인정보를 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 의미합니다.

'회원탈퇴(이하 "탈퇴"라 한다)'란 회원이 이용계약을 해지하는 것을 의미합니다.



2. 본 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관계법령 및 서비스 별 안내에서 정하는 바에 의합니다.



제 3조 (이용약관의 효력 및 변경)



1. 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 각 서비스 사이트의 초기 서비스화면에 게시합니다.

2. 회사는 약관의 규제에 관한 법률, 전자거래기본법, 전자 서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.

3. 회사는 본 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 회사가 제공하는 서비스 사이트의 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.

다만, 회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 회원이 알기 쉽도록 표시합니다.

4. 회원은 개정된 약관에 대해 거부할 권리가 있습니다. 회원은 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 회원등록을 해지할 수 있습니다.

단, 개정된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우에는 약관의 변경사항에 동의한 것으로 간주합니다.

5. 변경된 약관에 대한 정보를 알지 못해 발생하는 회원 피해는 회사가 책임지지 않습니다.



제 4조 (약관 외 준칙)



1. 본 약관은 회사가 제공하는 서비스에 관해 별도의 정책 및 운영규칙과 함께 적용됩니다.

2. 본 약관에 명시되지 아니한 사항과 본 약관의 해석에 관하여는 관계법령에 따릅니다.</p>
</div>

				  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <form onSubmit={handleSubmit}>
                    <div>
                    <input
                     type="checkbox"
                     id="agreement"
                     checked={isAgreed}
                     onChange={handleCheckboxChange}
                    />
                    <label htmlFor="agreement"> 이용약관에 동의합니다.</label>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">입양하기</button>
                    </form>
					  
					  
				  </div>
				  
			  </form>
		  </div>
		</section>
    </Layout>
  )
}
