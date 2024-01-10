import { useState, useEffect } from 'react';
import axios from 'axios';
import { pinFileToIPFS } from "../pages/pinata";

export default function CommentSection({ dogId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const submitComment = async () => {
    try {
      // 먼저 기존 개 객체를 가져옵니다.
    const response = await axios.get(`http://localhost:8080/dog/${dogId}`);
    const dogData = response.data;

    const newCommentObject = {
      text: newComment,
      image: imageUrl, // 이미지 URL 추가
    };

    // 새 댓글을 기존 댓글 목록에 추가합니다.
    const updatedComments = [...dogData.comments, newCommentObject];

    // PUT 요청을 사용하여 서버에 업데이트된 개 객체를 보냅니다.
    await axios.put(`http://localhost:8080/dog/${dogId}`, {
      ...dogData, // 기존 개 데이터
      comments: updatedComments // 업데이트된 댓글 목록
    });

    // 클라이언트 상태도 업데이트합니다.
    setComments(updatedComments);
    setNewComment(''); // 입력 필드 초기화
    setImageUrl('');
    } catch (error) {
      console.error('댓글 추가에 실패했습니다:', error);
    }
  };

  const fetchComments = async () => {
    try{
    console.log(dogId)
    const response = await axios.get(`http://localhost:8080/dog/${dogId}`);
    
    const dogData = response.data;
    if (dogData && Array.isArray(dogData.comments)) {
      setComments(dogData.comments);
    } else {
      // 댓글 데이터가 없거나 예상한 형식이 아닌 경우
      setComments([]);
    }
  } catch (error) {
    console.error('댓글을 불러오는데 실패했습니다:', error);
  }
  };

  const upload = async (e) => {
            
    const file = e.target.files[0];
    // 1. file(이미지파일)을 IPFS에 올려서 주소 받아오기.
    const result = await pinFileToIPFS(file); 
    setImageUrl(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
    
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
    <div className="mt-6 flex justify-between items-center">
    <h2 className="text-lg font-semibold">댓글</h2>
    <button className="text-center text-violet-500 text-sm bg-white hover:bg-purple-300 font-bold py-2 px-4 rounded-2xl  border border-violet-500"
    onClick={submitComment}
  >
    댓글 달기
  </button>
    </div>
    <div className="mt-2">
  <input 
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text" 
    value={newComment} 
    onChange={(e) => setNewComment(e.target.value)} 
    placeholder="댓글을 입력하세요"
  />
  
  </div>
  <input
                     type="file"
                     name= "url"
                     id= "url"
                     onChange={upload}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="img"
                     required=""
                  />
  

    <ul className="mt-4">
    {comments.map((comment, index) => (
  <li key={index} className="bg-gray-100 rounded mt-2 p-2">
    <div className="flex flex-col">
      <div className="justify-start">
      {comment.image && (
        <img 
          src={comment.image} 
          alt="Comment" 
          className="max-w-s max-h-40 object-cover self-center justify-start" // 최대 너비와 높이를 제한
        />
      )}
      </div>
      <div className={comment.image ? "mt-2" : ""}>{comment.text}</div> {/* 이미지가 있으면 마진 추가 */}
    </div>
  </li>
))}

    </ul>
  </div>
  );
}