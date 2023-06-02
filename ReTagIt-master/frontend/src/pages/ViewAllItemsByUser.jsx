import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Item from '../components/Item';
import "../style/items.css"
import { getAllUserItems, reset } from '../features/Items/itemSlice';

import { toast } from "react-toastify";

function ViewAllItemsByUser() {
    const { isError, isLoading, isSuccess, message, userItems, itemAdded } = useSelector((state) => state.item)

    const {user} = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllUserItems())
    }, [])

    useEffect(() => {
      if(!user) {
        toast.error("Please login first to access", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        })
      }      
    }, [])

    useEffect(() => {
        dispatch(getAllUserItems())
    }, [itemAdded, dispatch])

    useEffect(() => {
        if(isSuccess) {
            toast.success("Successfully deleted", {
                position: toast.POSITION.TOP_CENTER,
                theme: "dark",
              })
        }
        dispatch(reset())
    }, [itemAdded])

    
    const items = userItems.items


  return (
        <div className='items-container'>
      {
        (userItems.length != 0) ? (
          <>
            {
              items.map((item, idx) => (
                <Item item={item} key={idx} byUser={true}/>
              ))
            
            }
          </>
        ) : (
          <div className='center-div'>
            <span className="loader"></span>
          </div>
        )
      }
    </div>
  )
}

export default ViewAllItemsByUser