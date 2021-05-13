import axios from 'axios';
import setAuthToken from './setAuthToken'

const refresh = async () => {
  if (localStorage.rtoken) {
    setAuthToken(localStorage.rtoken);
  }

  try {
    const res = await axios.get('/api/auth/refresh');
    console.log(res);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('rtoken', res.data.rtoken);
    setAuthToken(localStorage.token);
  } catch (err) {
    console.log("tushar");
  }
};

export default refresh; 
