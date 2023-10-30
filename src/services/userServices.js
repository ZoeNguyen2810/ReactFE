import axios from './customize-axios'
const fetchAllUser = (page) => {
     // eslint-disable-next-line no-undef
     return axios.get(`/api/users?page=${page}`);

}

const postCreateUser = ( name , job) => {
     return axios.post('/api/users' , { name , job})
}
const putUpdateUser = ( name , job) => {
     return axios.put('/api/users/' , { name , job})
}

const deleteUser = ( id) => {
     return axios.delete(`/api/users/${id}`)
}

const LoginAPI = ( email, password) => {
     return axios.post(`/api/login` , { email, password})
}


export { fetchAllUser , postCreateUser , putUpdateUser , deleteUser, LoginAPI}