import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset,addItem } from "../../features/Items/itemSlice"

function AddItem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: "",
    city: "",
    neighbourhood: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // useselector
  const {isError, isLoading, isSuccess, message} = useSelector( (state) => state.item )

  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      toast.error("Please login first to access", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      })
    }      
  }, [])

  
  useEffect(() => {
    if(isError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      })
    }
     
    // FIXME: check, after the navigation toast will work or not 
    if(isSuccess) {
      // redirect to home
      navigate("/")
      // toast.success(message, {
      //   position: toast.POSITION.TOP_CENTER,
      //   theme: "dark",
      // })
    }
    console.log("--- in add item ---")
    // TODO: create reset reducer in itemSlice
    dispatch(reset())

  }, [isError, isSuccess, message, navigate, dispatch]) 


  const {title, description, state, city, neighbourhood} = formData;

  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  // const onChangeSelectionList = (e) => {
  //   console.log(e.target.value)
  //   setFormData((prev) => ({
  //     ...prev,
  //     ["category"]: e.target.value,
  //   }));
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, password, password2);
    
    if (
      title === "" ||
      description === "" ||
      state === "" ||
      city === "" ||
      neighbourhood === "" ||
      selectedFile === null
      ) {
        toast.error("Please fill all the fields", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
        // console.log(itemData);
      } else {
        const itemData = {
            title,          
            description,
            state,
            city,
            neighbourhood,
            // TODO: NEW
            selectedFile
        };
        
      console.log(itemData);
      dispatch(addItem(itemData));
    }
  };
  return (
    <div className="container">
      {
        (user &&  <>
          <div className="form">
            <div className="form-group">
              <form onSubmit={onSubmit} encType="multipart/form-data">
                {/* title */}
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  placeholder="Enter item title"
                />

                {/* description */}
                <textarea id="w3review" name="description" rows="4" cols="50" onChange={onChange} className="form-control" placeholder="Description">
                    
                </textarea>

                {/* state */}
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={state}
                  onChange={onChange}
                  placeholder="state"
                />

                {/* city */}
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={city}
                  onChange={onChange}
                  placeholder="city"
                />

                {/* neighbourhood */}
                <input
                  type="text"
                  className="form-control"
                  id="neighbourhood"
                  name="neighbourhood"
                  value={neighbourhood}
                  onChange={onChange}
                  placeholder="neighbourhood"
                />
                {/* item-image */}
                <input type="file" id="file" name="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>

                {/* button */}
                <div className="form-group">
                  <button type="submit" className="btn btn-block addItem-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        
        </>)
      }
    </div>
  );
}

export default AddItem;
