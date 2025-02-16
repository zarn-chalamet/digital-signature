import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import uploadArea from "../assets/upload_area.svg"
import {toast} from "react-toastify"
import axios from "axios"
import { AppContext } from "../context-api/AppContext";

// Required for accessibility
Modal.setAppElement("#root");

export default function ManageUser() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {backendUrl,token,users,getUsersList,toggleRestricted} = useContext(AppContext);

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [image,setImage] = useState(false);

  const createNewUser = async (e) => {
    e.preventDefault();
    try {
      if(!image){
        toast.error("No image is uploaded!")
        return;
      }

      const formData = new FormData()
      formData.append('image',image),
      formData.append('first_name',firstname)
      formData.append('last_name',lastname)
      formData.append('email',email)
      formData.append('password',password)

      const {data} = await axios.post(backendUrl+"/api/admin/add-user",formData,{headers: {token}});

      if(data.success){
        toast.success(data.message)
        setImage(false)
        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")

        setModalIsOpen(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleRestriction = (userId) => {
    toggleRestricted(userId);
  };

  useEffect(()=>{
    getUsersList()
  },[])

  return (
    <div>
      <h3>Manage User</h3>
      <div className="flex flex-row justify-between">
        <div></div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create New User
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Create New User"
        className="bg-white p-5 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold">Create New User</h2>
        <form className="mt-4">

        <label htmlFor="doc-img">
            <img className="w-20" src={image ? URL.createObjectURL(image) : uploadArea} alt=""/>
          </label>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='doc-img' hidden/>


          <label htmlFor="firstname">User's Firstname</label>
          <input
            type="text"
            placeholder="Enter employee's firstname"
            className="border p-2 w-full mb-3"
            value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
          />

          <label htmlFor="lastname">User's Lastname</label>
          <input
            type="text"
            placeholder="Enter employee's lastname"
            className="border p-2 w-full mb-3"
            value={lastname}
            onChange={e=>setLastname(e.target.value)}
          />

          <label htmlFor="first_name">User's Email</label>
          <input
            type="email"
            placeholder="It must be your Organization-Email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />

          <label htmlFor="first_name">User's Password</label>
          <input
            type="text"
            placeholder="Enter password"
            className="border p-2 w-full mb-3"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <button type="submit" onClick={createNewUser} className="px-4 py-2 bg-blue-500 text-white rounded">
            Add user
          </button>
          <button
            type="button"
            onClick={() => setModalIsOpen(false)}
            className="ml-3 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </form>
      </Modal>

      {/* users list */}
      <div>
        {
          users.map((user,index) => (
            <div className="flex flex-row justify-around" key={index}>
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <p>{user.email}</p>
              <p>{user.password}</p>
              <p>{user.date}</p>

              {/* toggle switch button */}
              la
              <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={user.isRestricted}
              onChange={() => toggleRestriction(user._id)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}
