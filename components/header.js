import Link from 'next/link';
import DarkModeToggleButton from './elements/dark-mode-toggle-button';
import { AuthProvider, useAuth } from '../components/auth';
import React from 'react';
import {useRouter} from 'next/router'

export default function Header(){

    const router = useRouter();
    const { user, logout } = useAuth();

    console.log(user)

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        router.push("/");
    };

    return (
       
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                    <Link href="/">
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                                 <img src="/images/profile/logo.svg" alt="logo" className="w-12 h-12 text-white rounded-full" />
                            <span className="ml-3 text-xl">Pawever Friend</span>
                        </a>
                    </Link>


                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                        <Link href="/">
                            <a className="mr-5 hover:text-gray-900">홈</a>
                        </Link>                                               
                        <Link href="/ip-member">
                            <a className="mr-5 hover:text-gray-900">메인페이지</a>
                        </Link>	
                        <Link href="/mypage">
                            <a className="mr-5 hover:text-gray-900">마이페이지</a>
                        </Link>						
                        {user ? (
                // 로그인 상태일 때: 로그아웃 버튼을 표시
                            
                            <button 
                                 onClick={handleLogout} 
                                 style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                             로그아웃
                </button>
                ) : (
                // 로그인 상태가 아닐 때: 로그인 페이지로의 링크를 표시
                <Link href="/login" passHref>
                    <button>
                        로그인
                    </button>
                </Link>
                 )}
                    </nav>
                    {/* 다크모드 토글 버튼 작업해야함 */}
                    <DarkModeToggleButton/>
                </div>     
            </header>          
        </>
        
    );
}
