import React, { useEffect } from 'react'
// import Currency from 'react-currency-icons'
import "../style/item.css"
import { useSelector, useDispatch } from "react-redux";
import { addRequestedItem } from "../features/requestedItem/requestedItemSlice"
import { deleteItem } from '../features/Items/itemSlice';
import { toast } from "react-toastify";
import { reset } from '../features/requestedItem/requestedItemSlice';

function Item({ item, byUser = false }) {

  // getting logged user
  const { user } = useSelector((state) => state.auth)
  const { isError, isLoading, isSuccess, message, requestSuccess } = useSelector((state) => state.requestedItem)

  const dispatch = new useDispatch()

  useEffect(()=>{
    console.log('first  child load');
  },[])

  // const loggedUser = localStorage.getItem("user");
  // useEffect( () => {
  //   console.log(12345465)
  //   if(isSuccess) {
  //     console.log("toast", message)
  //     toast.success(message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       theme: "dark",
  //     })
  //     // toast.success("")
  //   } 
  //   else if(isError) {
  //     toast.error(message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       theme: "dark",
  //     })
  //   }
  //   console.log("--- item ---")
  //   dispatch(reset())
  // }, [requestSuccess])

  const makeRequest = (item) => {
    if (user == null) {
      toast.warning("Please login first", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      })
    }
    // console.log(item)
    // console.log(user)
    const r_item_user = {
      item,
      user
    }
    dispatch(addRequestedItem(r_item_user))
    console.log("after dispatch");
  }

  const deleteItemFun = (item) => {
    if (user == null) {
      toast.warning("Please login first", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      })
    }

    dispatch(deleteItem(item))
  }

  return (
    <div className='item'>
      <div className="item-img-container">
        <img
          className='item-image'
          loading='lazy'
          src={`${process.env.REACT_APP_API_URL_IMG}/image/${item.selectedFile}`} alt="" />
        {/* <div className="inr-currency">
              
              <Currency code="INR" size="small" />
            </div> */}
      </div>
      <div className='about-item'>

        <div className='item-price'>{item.title}</div>
        {/* <div className='item-title'>{item.title}</div> */}
        <div className='item-details' style={{"whiteSpace": "nowrap",
        "overflow": "hidden",
        "textOverflow": "ellipsis"}} data-bs-toggle="tooltip" data-bs-placement="bottom" title={`${item.description}`}>{item.description}</div>
        <div className='item-location'>
          {item.neighbourhood} {item.city} {item.state}
        </div>
        <div className="btn-ask">
          {byUser ? (
            <>
              <button className='ask-btn' onClick={() => deleteItemFun(item)} >Delete</button>
            </>
          ) : (
            <>
              <button className='ask-btn' onClick={() => makeRequest(item)} >Request</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Item
