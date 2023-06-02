import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}/api/requestedItem`

const addRequestedItem = async (r_item_user) => {
    console.log("In Service",r_item_user)
    const r_item_user_seperated = {
        "item" : r_item_user.item,
        "user" : r_item_user.user
    }
    console.log(r_item_user.item, r_item_user.user)
    console.log(localStorage.getItem("token"))

    const resp = await axios.post(`${API_URL}/`, r_item_user_seperated, {
        headers: {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data
}

const getAllPendingRequests = async () => {
    console.log("in service")
    const resp = await axios.get(`${API_URL}/pending`, {
        headers: {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data 
}

const getAllRequests = async () => {
    console.log("in service")
    const resp = await axios.get(`${API_URL}/`, {
        headers: {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data 
}

const getAllAcceptedRequests = async () => {
    console.log("in service")
    const resp = await axios.get(`${API_URL}/accepted`, {
        headers: {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data 
}

const acceptRequest = async (r_item_id) => {
    console.log("in service",r_item_id)
    const resp = await axios.post(`${API_URL}/accept/`, r_item_id, {
        headers : {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data
}

const deniedRequest = async (r_item_id) => {
    console.log("in service",r_item_id)
    const resp = await axios.post(`${API_URL}/denied/`, r_item_id, {
        headers : {
            "authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data
}


const requestedItemService = {
    addRequestedItem,
    getAllPendingRequests,
    acceptRequest,
    getAllAcceptedRequests,
    deniedRequest,
    getAllRequests
}

export default requestedItemService