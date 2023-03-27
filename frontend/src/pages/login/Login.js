import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import InputBox from '../../components/ui/InputBox'
import ContainerBox from '../../components/ui/ContainerBox'
import classes from './Login.module.css'
import ButtonBox from '../../components/ui/ButtonBox'
import { useDispatch } from 'react-redux'
import { login } from '../../app/features/authSlice'

const Login = () => {
    const [error, setError] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const pwdViewHandler = () => {
      if (viewPassword){
          setViewPassword(false)
      }else{
          setViewPassword(true)
      }
    }
    
    const loginHandler = (e) => {
        e.preventDefault()
        if (enteredEmail.trim().length < 9 || !enteredEmail.includes('@')){
            setError('Please enter a valid email')
        }else if (enteredPassword.trim().length < 6){
            setError('Password must be 6 and  more characters')
        }else{
            const enteredData = {
                email: enteredEmail,
                password: enteredPassword,
            }
            try{
                dispatch(login({enteredData}))
                navigate('/')
            }catch(error){
                console.log(error)
            }
        }
    }
    if (error){
        setTimeout(() => {
            setError('')
        },10000)
    }
  return (
    <ContainerBox className={classes.login}>
        <div className="border p-4">
            <h3 className='text-center'>Login</h3>
            {error && <p className='text-light bg-danger text-center p-1'>{error}</p>}
            <Form onSubmit={loginHandler}>
                <InputBox 
                    label="Email"
                    type="email"
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <InputBox 
                    label="Password"
                    type={viewPassword ? "text" : "password"}
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    onClick={pwdViewHandler}
                    pwdviewicon = {viewPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                />
                <Link to="/reset-password">Forgot Password</Link>
                <ButtonBox
                    type="submit"
                    className='w-100 btn btn-secondary'
                >
                    Login
                </ButtonBox>
            </Form>
            <p className='mt-2'>Don't have an account. Please <Link to='/signup'>Sign up now</Link></p>
        </div>
    </ContainerBox>
  )
}

export default Login