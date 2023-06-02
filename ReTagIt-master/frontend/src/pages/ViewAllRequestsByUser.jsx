import React, { useState } from 'react'
import { useEffect } from 'react'
import { viewAllRequests, reset } from "../features/requestedItem/requestedItemSlice"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import RItems from '../components/RItems'
import {FaFilter} from "react-icons/fa"
import "../style/viewItems.css"
import { toast } from "react-toastify";


function ViewAllRequestsByUser() {

  const { r_items_all, isLoading, isSuccess, isError, message } = useSelector((state) => state.requestedItem)
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const [r_items_filtered, set_r_items_filtered] = useState([]);
  // let filtered_items;
  const [action, setAction] = useState("all")

  useEffect(() => {
    dispatch(viewAllRequests())
  }, [])

  // useEffect(() => {
  //   set_r_items_filtered(r_items_all)
  //   console.log("asdasdas")
  //   filter()
  // }, [action])

  useEffect(()=>{
    set_r_items_filtered(r_items_all)
  }, [r_items_all])

  useEffect(() => {
    dispatch(reset())
  }, [isSuccess, isError, message, dispatch])

  useEffect(() => {
    if(!user) {
      toast.error("Please login first to access", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      })
    }      
  }, [])

  
  return (
    <div>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle filter-dropdown" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              Filter <FaFilter size={25}/>
            </button>
            <ul className="dropdown-menu filter-dropdown-items" aria-labelledby="dropdownMenuButton2 ">
              <li><div className="dropdown-item " onClick={() => setAction("pending")}>Pending</div></li>
              <li><div className="dropdown-item " onClick={() => setAction("accepted")}>Accepted</div></li>
              <li><div className="dropdown-item " onClick={() => setAction("rejected")}>Rejected</div></li>
              <li><hr className="dropdown-divider" /></li>
              <li><div className="dropdown-item " onClick={() => setAction("all")}>All</div></li>
            </ul>
          </div>
          
      {(r_items_filtered.length != 0) ? (
        <>
          <div>
            <RItems r_items={r_items_filtered.filter((item)=>{
                if(action === "pending") {
                    return item.isRequestComplete === false 
                }
                else if(action === "accepted") {
                    return (item.isRequestComplete === true) && (item.permission === true) 
                }
                else if(action === "rejected") {
                    return (item.isRequestComplete === true) && (item.permission === false) 
                }
                else{
                  return true
                }
            })} loggedUserRequests={true} />
          </div>
        </>
      ) : (
        <div className='center-div'>
          <img src="./img/empty.svg" width={500} />
          <h2 style={{ "textAlign": "center", "padding": "1rem" }}> No Requests </h2>
        </div>

      )}
    </div>
  )
}

export default ViewAllRequestsByUser