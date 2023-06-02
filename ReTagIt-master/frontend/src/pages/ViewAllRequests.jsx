import React from 'react'
import { useEffect } from 'react'
import {viewAllPendingRequests, reset} from "../features/requestedItem/requestedItemSlice"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RItems from '../components/RItems'

import { toast } from "react-toastify";

function ViewAllRequests() {
  const {r_items, isLoading, isError, isSuccess, message, item_swaped} = useSelector((state) => state.requestedItem)
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("In view all requests")
    dispatch(viewAllPendingRequests())
  }, [])

  useEffect(() => {
    dispatch(viewAllPendingRequests())
  }, [item_swaped])

  useEffect(() => {
    dispatch(reset())
  }, [isError, isSuccess, message,item_swaped, dispatch])

  useEffect(() => {
    if(!user) {
      toast.error("Please login first to access", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      })
    }      
  }, [])

  return (
    <>

      { (r_items.length != 0) ? (
        <>
          <h1>All Requests </h1>
          <div>
            <RItems r_items={r_items}/>
          </div>
        </>
      ) : (
        <div className='center-div'>
            <img src="./img/empty.svg" width={500}/>
            <h2 style={{"textAlign" : "center", "padding": "1rem"}}> No Requests </h2>
        </div>
        
      )}
      
    </>
  )
}

export default ViewAllRequests