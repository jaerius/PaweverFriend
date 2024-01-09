import { useState, useEffect } from 'react';
import CommentSection from '../components/CommentSection';

const DogDetail = ({ dog }) => {
  // 서버 사이드에서 데이터를 가져오기 때문에, 초기 상태에는 댓글이 비어 있습니다.
  const [comments, setComments] = useState([]);

  // 댓글을 서버에서 불러오는 함수
  const fetchComments = async () => {
    const res = await fetch(`http://localhost:8080/dog/${dog.id}/comments`);
    const data = await res.json();
    setComments(data);
  };

  // 컴포넌트가 마운트될 때 댓글을 불러옵니다.
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${dog.image})` }}>
          <div className="flex justify-end">
            <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              {/* ... SVG path for heart icon */}
            </svg>
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{dog.name}</h1>
          <p className="text-gray-700 mb-2">나이: {dog.age}살</p>
          <p className="text-gray-700">견종: {dog.breed}</p>
        </div>
        <div className="p-4 border-t border-gray-300 text-gray-700">
          <CommentSection dogId={dog.id} />
        </div>
      </div>
    </div>
  );
};

// 이 함수는 서버에서 강아지의 상세 정보를 불러오기 위해 사용됩니다.
export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:8080/dog/${params.id}`);
  const dog = await res.json();

  return { props: { dog } };
}

export default DogDetail;
