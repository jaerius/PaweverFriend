// pages/api/comments.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // JSON Server에 새 댓글 추가
    const { id, comment } = req.body;
    const response = await axios.post(`http://localhost:8080/dog/${id}`, {
      text: comment
    });
    res.status(200).json(response.data);
  }
}