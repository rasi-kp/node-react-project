import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser({ closeModaluser ,selectedEmail}) {
    // const navigate = useNavigate()
    const [user, setUserData] = useState('');
    useEffect(() => {
      const fetchData = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await fetch(`http://localhost:5000/getUser/${selectedEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });
              
              if (!response.ok) {
                  throw new Error('Failed to fetch user data');
              }
              const datas = await response.json();
              setUserData(datas.data);
          } catch (error) {
              console.error(error);
          }
      };
      fetchData();
  }, []);
    const [nerror, setNerror] = useState("")
    const [showModal, setShowModal] = React.useState(true);
    const adduser =async (e) => {
        e.preventDefault()
    setNerror('');
    if (user.name.trim() === '') {
      setNerror('Name is required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          data:user
        }),
      });
      if (!response) {
        throw new Error('Failed to sign in');
      }
      const data = await response.json();
      console.log(data);
      if (data.user) {
        toast.success("Successfully Edit ")
        // setShowModal(false)
        closeModaluser(false)
      }
    } catch (error) {
      alert(error.message)
    }
    }
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-80 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        EDIT USER
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModaluser}>
                                        <span className="text-black focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                <p className="">Name :</p>
                                    <input
                                        className="mt-2 mb-1 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded "
                                        type="text"
                                        value={user.name}
                                        onChange={e => setUserData({ ...user, name: e.target.value })}
                                        placeholder="Name"
                                        name="name"
                                    />
                                    <p className="text-red-600 hover:underline hover:underline-offset-4">{nerror}</p>
                                <p className="">Email :</p>
                                    <input
                                        className="mt-2 mb-1 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                                        type="text"
                                        value={user.email}
                                        // onChange={e => setUserData({ ...user, email: e.target.value })}
                                        placeholder="Email Address"
                                        name="email"
                                        readOnly
                                    />
                                    <p className="">Address :</p>
                                    <input
                                        className="mt-2 mb-1 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded "
                                        type="text"
                                        value={user.address}
                                        onChange={e => setUserData({ ...user, address: e.target.value })}
                                        placeholder="Name"
                                        name="name"
                                    />
                                    <p className="">DOB :</p>
                                    <input
                                        className="mt-2 mb-1 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded "
                                        type="text"
                                        value={user.dob}
                                        onChange={e => setUserData({ ...user, dob: e.target.value })}
                                        placeholder="Name"
                                        name="name"
                                    />
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={closeModaluser}>
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={adduser}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <ToastContainer/>
        </>
    );
}
export default AddUser