import React,{useState} from 'react'
import {useDispatch} from 'react-redux'

import {signIn} from '../redux/user/userSlice'
const SignIn : React.FC= () => {
    const [Credentials,setCredentials] = useState({username:"",password:""});
    const dispatch = useDispatch();
    const handleChange = (e:any)=>{
        const value = e.target.value
        const name = e.target.name
        setCredentials({...Credentials,[name]:value})
    }
  return (
    <div>
        <input type="text" name="username" onChange={handleChange}/>
        <input type="text" name="password" onChange={handleChange}/>
        <button onClick={()=>dispatch(signIn(Credentials))}>SignIn</button>
    </div>
  )
}

export default SignIn