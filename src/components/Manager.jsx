import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPass = () => {


        if (ref.current.innerHTML === "Show") {
            ref.current.innerHTML = "Hide"
            passwordref.current.type = "text"
        } else {
            ref.current.innerHTML = "Show"
            passwordref.current.type = "password"
        }

    }
    const SavePass = () => {
        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){

            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast.success('Password saved!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
        else{
            toast.error("Please enter details")
        }

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true, 
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
        navigator.clipboard.writeText(text)
    }
    const deletepass =(id) => {
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        

        
        
    }
    const editpass =(id) => {


        setform(passwordArray.filter(i=>i.id===id)[0]) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
      
    }
    

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"

            />

            <div className="container w-[50%] mx-auto min-h-[75vh]  text-black m-5">

                <div className="logo font-bold text-4xl flex
                            justify-center mt-10">
                    <div>
                        <span className='text-sky-500'> &lt; </span>
                        Pass <span className='text-sky-900'>Man</span> <span className='text-sky-500'> /&gt;</span>

                    </div>
                </div>
                <p className='text-2xl font-semibold text-center m-7 text-sky-950 '>Your Password Manager</p>

                <div className="text-black flex flex-col p-4">
                    <input onChange={handlechange} placeholder='Enter Website URL' value={form.site} className='text-black p-2  border m-3 border-green-800' type="text" name="site" id="" />
                    <div className="flex flex-col md:flex-row">
                        <input onChange={handlechange} value={form.username} name='username' placeholder='Enter Username' className='text-black p-2  border m-3 border-green-800' type="text" />
                        <input ref={passwordref} onChange={handlechange} value={form.password} name="password" placeholder='Enter Password' className='text-black  p-2 border m-3 border-green-800' type="password" />
                        <span ref={ref} className='md:relative  font-bold  w-fit p-1 rounded-lg cursor-pointer  text-black top-[15px] left-[-70px] ' onClick={showPass}>Show</span>
                    </div>
                    <button onClick={SavePass} className='text-2xl font-bold text-center text-white bg-purple-600 w-fit m-auto rounded p-3 hover:bg-purple-500'>Save</button>
                </div>
                <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

                <div className=" w-[90%] passwords flex  flex-col justify-center items-center mx-auto">
                    <h2 className='text-2xl  m-6 font-mono font-extrabold'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="  rounded-md overflow-hidden table-auto w-full  ">
                        <thead className='bg-sky-900 text-white'>
                            <tr>
                                <th className='p-2'>Website URL</th>
                                <th className='p-2'>Username</th>
                                <th className='p-2'>Password</th>
                                <th className='p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-sky-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' cursor-pointer text-center py-2 border-white border-[2px] rounded-md' href={item.site} target="_blank"  >{item.site} <br />   </td>
                                    <td className='text-center py-2 border-white border-[2px] rounded-md' > {item.username}  <br /> <span className='font-medium hover:font-bold text-red-900  cursor-pointer ' onClick={() => {
                                        copyText(item.username)
                                    }} >Copy</span> </td>
                                    <td className='text-center py-2 border-white border-[2px] rounded-md'> {item.password}  <br /> <span className='font-medium text-red-900  hover:font-bold cursor-pointer ' onClick={() => {
                                        copyText(item.password)
                                    }} >Copy</span> </td>
                                    <td className='text-center py-2 border-white border-[2px] rounded-md'><span className='font-bold hover:font-extrabold text-black cursor-pointer ' onClick={()=>{
                                        deletepass(item.id)
                                    }}>Delete</span>  <br /><span className='font-bold hover:font-extrabold text-black cursor-pointer ' onClick={()=>{
                                        editpass(item.id)
                                    }}>Edit</span>  </td>
                                </tr>
                            })}


                        </tbody>
                    </table>}

                </div>
            </div>
        </>
    )
}

export default Manager
