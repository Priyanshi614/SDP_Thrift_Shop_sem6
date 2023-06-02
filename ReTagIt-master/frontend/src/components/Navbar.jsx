import React from 'react'
import { Link } from 'react-router-dom'
import "../style/Navbar.css"

import { useNavigate } from 'react-router-dom'
import { reset, logout } from '../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    function logoutUser() {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    function loginUser() {
        navigate("/login");
    }

    function viewAllUserItems() {
        navigate("/viewAllUserItems")
    }

    function viewRequests() {
        console.log(123, user)
        if(user != null) {
            console.log('inside');
            navigate("/viewAllRequests");
        } else {
            toast.warn('Please Login first', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    function viewAllAcceptedRequests() {
        console.log(123, user)
        if(user != null) {
            console.log('inside');
            navigate("/viewAllAcceptedRequests");
        } else {
            toast.warn('Please Login first', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    function viewAllRequests() {
        if(user != null) {
            console.log('inside');
            navigate("/viewAllRequestsByUser");
        } else {
            toast.warn('Please Login first', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    function addItem() {
        if(user != null) {
            navigate("/addItem")
        } else {
            toast.warn('Please Login first', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    return (
        <nav className="navbar navbar-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">
                {/* <img src="./img/logo-01.png" alt="" width="50" height="50" /> */}
                ReTagIt
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className='navbar-complete'>

                        <div className="navbar-nav">
                           
                            <Link className="nav-link" to="/viewAllItems">All Items</Link>
                            <div className="nav-link" onClick={addItem}>Add Item</div>
                            <div>
                                {user
                                    ? (
                                        <>
                                            {/* Hello {user.name} */}
                                            <div className='nav-link' onClick={logoutUser}>Logout</div>
                                            <div className="nav-link" onClick={viewAllUserItems}>All Requests</div>
                                        </>
                                    )
                                    : (
                                        <div className='nav-link' onClick={loginUser}>Login</div>
                                    )}
                            </div>
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Requests
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><div className="dropdown-item" onClick={viewAllAcceptedRequests}>Accepted Requests</div></li>
                                    <li><div className="dropdown-item" onClick={viewRequests}>Pending Requests</div></li>
                                    {/* <li><hr className="dropdown-divider" /></li> */}
                                    {/* <li><Link className="dropdown-item" to="#">Something else here</Link></li> */}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Your Requests
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><div className="dropdown-item" onClick={viewAllRequests}>All Requests</div></li>
                                                                
                                </ul>
                            </li>
                        </div>
                                    
                    </div>



                </div>
            </div>
        </nav>
    )
}

export default Navbar
