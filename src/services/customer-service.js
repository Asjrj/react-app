import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/customers'
const loginUrl = 'http://localhost:3003/api/login'


const login = async (loginData) => {
    const data = await axios.post(loginUrl, loginData)
    return data
}

const getCustomers = async () => {
    const data = await axios.get(baseUrl)
    return data
}

const addCustomer = async (newData) => {
    const data = await axios.post(baseUrl, newData)
    return data
}

const deleteCustomer = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

const updateCustomer = async (Data) => {
    await axios.put(`${baseUrl}/${Data.id}`, Data)
}

export default { login, getCustomers, addCustomer, deleteCustomer, updateCustomer }
