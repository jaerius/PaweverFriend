import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommentSection({ dogId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const submitComment = async () => {
    try {
      // 먼저 기존 개 객체를 가져옵니다.
    const response = await axios.get(`http://localhost:8080/dog/${dogId}`);
    const dogData = response.data;

    // 새 댓글을 기존 댓글 목록에 추가합니다.
    const updatedComments = [...dogData.comments, newComment];

    // PUT 요청을 사용하여 서버에 업데이트된 개 객체를 보냅니다.
    await axios.put(`http://localhost:8080/dog/${dogId}`, {
      ...dogData, // 기존 개 데이터
      comments: updatedComments // 업데이트된 댓글 목록
    });

    // 클라이언트 상태도 업데이트합니다.
    setComments(updatedComments);
    setNewComment(''); // 입력 필드 초기화
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

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-6">
    <h2 className="text-lg font-semibold">댓글</h2>
    <div className="mt-2">
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" 
        value={newComment} 
        onChange={(e) => setNewComment(e.target.value)} 
        placeholder="댓글을 입력하세요"
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        onClick={submitComment}
      >
        댓글 달기
      </button>
    </div>
    <ul className="mt-4">
      {comments.map((comment, index) => (
        <li key={index} className="bg-gray-100 rounded mt-2 p-2">{comment}</li>
      ))}
    </ul>
  </div>
  );
}
