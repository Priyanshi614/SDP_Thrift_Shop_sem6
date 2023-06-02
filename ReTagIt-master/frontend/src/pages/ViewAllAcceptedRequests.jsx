import React from 'react'
import { useEffect } from 'react'
import {viewAllAcceptedItem, reset} from "../features/requestedItem/requestedItemSlice"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RItems from '../components/RItems'

function ViewAllAcceptedRequests() {
    const {r_items_accepted, isError, isSuccess, isLoading, message, item_swaped} = useSelector((state) => state.requestedItem)


    const dispatch = useDispatch()
    useEffect(() => {
      console.log("In view all accepted requests")
      dispatch(viewAllAcceptedItem())
    }, [])

    useEffect(() => {
        dispatch(viewAllAcceptedItem())
    }, [item_swaped])

    useEffect(() => {
        dispatch(reset())
    }, [isError, isSuccess, message,item_swaped, dispatch])
    
  
    return (
      <>
  
        { (r_items_accepted.length != 0) ? (
          <>
            <h1>All Requests </h1>
            <div>
              <RItems r_items={r_items_accepted}/>
            </div>
          </>
        ) : (
          <div className='center-div'>
              <img src="./img/empty.svg" width={500}/>
              <h2 style={{"textAlign" : "center", "padding": "1rem"}}> No accepted requests yet </h2>
          </div>
          
        )}
        
      </>
    )
}

export default ViewAllAcceptedRequests