import React from 'react'
import "../style/item.css"
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlinePending } from 'react-icons/md';
import { RxCrossCircled } from 'react-icons/rx';

import { deleteItem } from '../features/Items/itemSlice';

import { useSelector, useDispatch } from "react-redux"
import { acceptRequest, deniedRequest } from "../features/requestedItem/requestedItemSlice"

function RItem({ r_item, loggedUserRequests = false }) {
  const dispatch = useDispatch()
  // console.log(loggedUserRequests)

  const accept_Request = (r_item_id) => {
    const r_item_ = {
      "r_item_id": r_item_id
    }
    dispatch(acceptRequest(r_item_))
    dispatch(deleteItem(r_item.item))
  }

  const denied_Request = (r_item_id) => {
    const r_item = {
      "r_item_id": r_item_id
    }
    dispatch(deniedRequest(r_item))
  }

  const item = r_item.item
  const requestedUser = r_item.requestedUser
  // console.log(r_item.owner)

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
        <div className='item-details'>{item.description}</div>
        <div className='item-title'>Requested User: {requestedUser.name}</div>
        {/* <div className='item-location'>
          {item.neighbourhood} {item.city} {item.state}
        </div> */}
        <div className='item-details'>User's Mobile: {requestedUser.mobile}</div>
        {r_item.isRequestComplete && (
          r_item.permission && (
            <div>Owner's Mobile: {r_item.owner.mobile}</div>
            
          )
        )}
        <div className='success-reject-btns'>
          {
            loggedUserRequests ? (
              <>
                {
                  r_item.isRequestComplete ? (
                    <>
                      {
                        r_item.permission ? (
                          <>
                            <span className='accepted'>Accepted</span><BsCheckCircleFill size={25} color="green" />
                          </>
                        ) : (
                          <>
                            <span className='rejected'>Rejected</span><RxCrossCircled size={25} color="red" />
                          </>
                        )
                      }
                    </>
                  ) : (
                    <>
                      <span className='msg'>Pending</span><MdOutlinePending size={25} className="msg" />
                    </>
                  )
                }
            
              </>
            ) : (
              <>
                {r_item.isRequestComplete ? (
                  <>
                    <span className='accepted'>Accepted</span><BsCheckCircleFill size={25} color="green" />
                  </>
                ) : (
                  <>
                    <button className='reject-btn' onClick={() => denied_Request(r_item._id)} >Reject</button>
                    <button className='success-btn' onClick={() => accept_Request(r_item._id)} >Accept</button>
                  </>
                )}
              </>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default RItem