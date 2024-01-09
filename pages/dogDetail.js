import { useState, useEffect } from 'react';
import CommentSection from '../components/CommentSection';
import cookie from 'cookie';
import Layout from '../components/layout';

const Dog = ({ dogData, comments }) => {
    return (
        <Layout>
        <div className="mx-auto mt-10 px-4 lg:px-40"> {/* 여기에 px-4 lg:px-20 클래스를 추가하여 여백을 조정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="md:col-span-1 min-w-0 max-w-md mx-auto"> {/* 최대 최소 너비 설정 */}
              {/* 이미지를 가득 채우고 비율을 유지하기 위해 object-cover를 사용 */}
              <img src={dogData.image_src} alt="Dog" className="w-full h-64 md:h-auto " />
            </div>
            <div className="md:col-span-1 min-w-0 max-w-md mx-auto"> {/* 최대 최소 너비 설정 */}
            <div className="bg-indigo-50 border-2 border-neutral-200 p-4 flex flex-col justify-between">
              <h1 className="text-xl font-bold">{dogData.dog_name}</h1>
              <div className="w-full border-t border-zinc-800"></div>
              <div className="flex-grow bg-indigo-50 border-2 border-neutral-200 p-4">
                <ul>
                  <li className="text-black text-md font-normal">묘종/견종: {dogData.breed}</li>
                  <li className="text-black text-md font-normal">나이: {dogData.age}</li>
                  <li className="text-black text-md font-normal">성별: {dogData.sex}</li>
                  <li className="text-black text-md font-normal">기간: {dogData.period}</li>
                  <li className="text-black text-md font-normal">분양 책임금: {dogData.deposit}</li>
                  {/* 나머지 개 정보 */}
                </ul>
              </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <CommentSection dogId={dogData.id} />
          </div>
        </div>
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

  return {
    props: { dogData, comments },
  };
}
