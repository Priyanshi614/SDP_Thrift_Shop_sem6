import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Item from '../components/Item';
import "../style/items.css"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reset as rItemReset } from '../features/requestedItem/requestedItemSlice';
import { reset } from '../features/Items/itemSlice';

function ViewAllItems() {
    const { isError, isLoading, isSuccess, message, items } = useSelector((state) => state.item)
    const { isError:ItemsIsError, isLoading:ItemsIsLoading, isSuccess:ItemsIsSuccess, message:ItemsMessage, requestSuccess:ItemsRequestSuccess } = useSelector((state) => state.requestedItem)

    const dispatch = new useDispatch()

    const { requestSuccess } = useSelector((state) => state.requestedItem)

    const [userItems, setUserItem] = useState([])
    const [exceptUserItems, setExceptUserItems] = useState([])
    const {user} = useSelector((state) => state.auth)
    
    useEffect(() => {
      setUserItem(items.items)
    }, [items])

    useEffect( () => {
      console.log(12345465)
      if(ItemsIsSuccess) {
        console.log("toast", ItemsMessage)
        toast.success(ItemsMessage, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        })
        // toast.success("")
      } 
      else if(ItemsIsError) {
        toast.error(ItemsMessage, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        })
      }
      console.log("--- item ---")
      dispatch(rItemReset())
    }, [ItemsIsError, ItemsIsSuccess, ItemsMessage, ItemsRequestSuccess])

    useEffect( () => {
      dispatch(reset())
    }, [isError, isSuccess, message, dispatch])

    useEffect(() =>{
      if(userItems && user) {
        setExceptUserItems(
          // userItems
          userItems.filter((item)=>item.user!=user.email)
        );
      }
    }, [userItems])


    useEffect(() => {
      if(!user) {
        toast.warning("Please login first to access", {
          position: toast.POSITION.TOP_CENTER,
          theme: "light",
        })
      }
    }, [user])
    


  return (
    <div className='items-container'>
      {
        (exceptUserItems.length !== 0) ? (
          <>
            {
              exceptUserItems.map((item, idx) => (
                <Item item={item} key={idx} />
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

export default ViewAllItems