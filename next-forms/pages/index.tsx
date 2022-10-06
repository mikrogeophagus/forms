import { useAuthContext } from '../lib/AuthContext';
import { login, logout } from '../lib/auth';
import axios from 'axios'; 

const TopPage = () => {
  const { currentUser } = useAuthContext();

  const callApiAndDisplay = async () => {
    try {
      const idToken = await currentUser?.getIdToken(true);
      const response = await axios.get('/api', {
        headers: {
          'authorization': idToken || '',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      alert('メッセージ: ' + response.data?.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="mb-3">
        メールアドレス: {currentUser?.email || 'ログインしていません'}
      </div>
      <div 
        onClick={() => login()}
        className="m-1 p-1 rounded bg-green-500 text-white hover:bg-green-600 transition cursor-pointer"
      >
        ログイン
      </div>
      <div 
        onClick={() => logout()}
        className="m-1 p-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition cursor-pointer"
      >
        ログアウト
      </div>
      <div className="flex justify-center">
        <div
          onClick={() => callApiAndDisplay()}
          className="my-3 mx-1 p-3 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition cursor-pointer"
        >
          API 呼び出し
        </div>
      </div>
    </>
  );
};

export default TopPage;