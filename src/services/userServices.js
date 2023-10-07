import axios from './customize-axios'
const fetchAllUser = (page) => {
     // eslint-disable-next-line no-undef
     return axios.get(`/api/users?page=${page}`);

}

export { fetchAllUser}