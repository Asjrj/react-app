import axios from 'axios'
const baseUrl = '/api/data'


const getCustomers = () => {
    const promise = axios.get('http://localhost:3003/api/customer/')
    return promise
}

const addCustomer = (newData) => {
    return axios.post(baseUrl, newData)
        .then(response => response.data)
}

const deleteCustomer = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const updateCustomer = (Data) => {
    return axios.put(`${baseUrl}/${Data.id}`, Data)
}

export default { getCustomers, addCustomer, deleteCustomer, updateCustomer }
