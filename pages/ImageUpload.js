import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await uploadToIPFS(image);
    await saveToDB(url);
  };

  // IPFS에 이미지 업로드 및 URL 반환
  const uploadToIPFS = async (file) => {
    // 여기에 IPFS 업로드 로직 구현
    // 예시: const url = await ipfs.add(file);
    return 'ipfs_url'; // IPFS URL을 반환
  };

  // db.json 파일에 URL 저장
  const saveToDB = async (url) => {
    // 여기에 db.json에 URL을 저장하는 로직 구현
    // Node.js 서버나 로컬 파일 시스템 사용 가능
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <button type="submit">업로드</button>
    </form>
  );
}