import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}/api/item`
const API_URL_IMG = `${process.env.REACT_APP_API_URL_IMG}`


const getAllItems = async () => {
    // get all items
    // TODO: create backend for get items
    // console.log("above get request")
    const items = await axios.get(`${API_URL}/`);
    // console.log("IN item service", items.data)
    return items.data;
   
}

const deleteItem = async (item) => {
    const resp = await axios.delete(`${API_URL}/${item._id}`, {
        headers: {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })

    return resp.data
    // console.log("delete", item)
}

const getAllUserItems = async () => {
    // console.log("above get request")
    const items = await axios.get(`${API_URL}/user`, {
        headers: {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    // console.log("IN item service", items.data)
    console.log(items.data)
    return items.data
}

// TODO: NEW
const addImage = async (formdata) => {
    console.log("asdasd sdasda")
    console.log(formdata)
    const resp = await axios.post(`${API_URL_IMG}/upload`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    console.log("response data",resp.data)
    return resp.data
}

const addItem = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"))
    item.user = user.email
    console.log("item in addItem", item)

    const resp = await axios.post(`${API_URL}/`, item, {
        headers:{
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    });

    return resp.data
}

const itemService = {
    getAllItems,
    addItem,
    addImage,
    getAllUserItems,
    deleteItem
}

export default itemService
