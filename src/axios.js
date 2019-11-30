import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL:'http://localhost:8000';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;
