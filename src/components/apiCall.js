import axios from 'axios';



export const  getCities = async () => {
    try {
        let data = await axios.get(`http://localhost:4000/api/cities`)
        return data
    }
    catch (error) {
        throw error
    }
}
export const  loadCities = async (dataInput) => {
    try {
        let data = await axios.post(`http://localhost:4000/api/cities`,{dataInput})
        return data
    }
    catch (error) {
        throw error
    }
}

export const  deleteCities = async (id) => {
    try {
        let data = await axios.delete(`http://localhost:4000/api/cities/${id}`)
        return data
    }
    catch (error) {
        throw error
    }
}
export const  modifiCities = async (id,dataInput) => {
    try {
        let data = await axios.put(`http://localhost:4000/api/cities/${id}`, {dataInput})
        return data
    }
    catch (error) {
        throw error
    }
}