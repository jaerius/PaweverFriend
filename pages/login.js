import React, {useState, useContext} from 'react';
import { AuthProvider, useAuth } from '../components/auth';
import { useRouter } from 'next/router';

const LoginComponent = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      const response = await fetch('http://localhost:3000/user');
      const users = await response.json();

      const user = users.find(user => user.userId === parseInt(id) && user.name === password);
        if (user) {
            // 로그인 성공 시
            const userData = { userId: user.userId, name: user.name, isLoggedIn: true };

            // 사용자 ID를 쿠키에 설정
            document.cookie = `user=${JSON.stringify(userData)}; max-age=${30 * 24 * 60 * 60}; path=/`;

            login(userData);
            console.log(login)
            console.log(userData.isLoggedIn)
            setTimeout(() => {
              router.push('/');
          }, 500);
        } else {
            // 로그인 실패 시
            alert('로그인 정보가 잘못되었습니다.');
        }

    };

    return (
      
     
  <div class="flex justify-center items-center h-screen" 
       style={{ 
        backgroundImage: "url('https://cdn.greenfieldpuppies.com/wp-content/uploads/2018/05/large-group-of-dogs-running-in-a-field-800x800.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' }}>
    <div class="w-full max-w-md px-5 py-24 mx-auto">
      <div class="bg-gray-100 rounded-lg p-8">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">로그인</h2>
        <div class="relative mb-4">
          <label for="full-name" class="leading-7 text-sm text-gray-600">ID</label>
          <input type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e)=> setId(e.target.value)}/>
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">비밀번호</label>
          <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={handleLogin}>로그인</button>
        <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
      </div>
    </div>
  </div>
      
       
    );
};

export default LoginComponent;
