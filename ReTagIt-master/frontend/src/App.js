import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { getAllItems, reset } from "../src/features/Items/itemSlice"

import './App.css';
import AddItem from './pages/form/AddItem';
import ViewAllItems from './pages/ViewAllItems';
import ViewAllRequests from './pages/ViewAllRequests';
import ViewAllAcceptedRequests from './pages/ViewAllAcceptedRequests';
import ViewAllRequestsByUser from './pages/ViewAllRequestsByUser';
import Navbar from "./components/Navbar"
import ViewAllItemsByUser from './pages/ViewAllItemsByUser';
import Sidebar from './components/navComponents/Sidebar';

function App() {

  const {items, isLoading, isError, isSuccess, itemAdded} = useSelector((state) => state.item)

  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reset())
  }, [isSuccess, isError, isLoading, itemAdded])

  useEffect(() => {
    // console.log("in app.js")
    dispatch(getAllItems())
    
  }, []);

  // useEffect(() => {
  //   // console.log("in app.js")
  //   dispatch(getAllItems())
    
  // }, [itemAdded, user]);

  return (
    <>
     <Router >
        <Sidebar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/viewAllItems' element={<ViewAllItems />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addItem' element={<AddItem />} />
            <Route path='/viewAllRequests' element={<ViewAllRequests /> } ></Route>
            <Route path='/viewAllAcceptedRequests' element={<ViewAllAcceptedRequests /> } ></Route>
            <Route path='/viewAllRequestsByUser' element={<ViewAllRequestsByUser /> } ></Route>
            <Route path='/viewAllUserItems' element={<ViewAllItemsByUser />} />
        </Routes>
    </Router>
    <ToastContainer />
      
    </>
  );
}

export default App;
