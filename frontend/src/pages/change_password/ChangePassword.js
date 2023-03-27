import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import ContainerBox from '../../components/ui/ContainerBox'
import InputBox from '../../components/ui/InputBox'
import ButtonBox from '../../components/ui/ButtonBox'
import classes from './ChangePassword.module.css'
import { changePassword } from '../../app/features/authSlice'

const ChangePassword = () => {
    const [error, setError] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredCPassword, setEnteredCPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)

    const dispatch = useDispatch()
    const message = useSelector(state => state.auth.message)


    const pwdViewHandler = () => {
        if (viewPassword){
            setViewPassword(false)
        }else{
            setViewPassword(true)
        }
    }
    const changePasswordHandler = async(e) => {
        e.preventDefault()
        if (enteredPassword.trim().length < 6){
            setError('Password must be 6 and  more characters')
        }else if(enteredPassword !== enteredCPassword){
            setError("Password and confirm doesn't match")
        }else{
            const enteredData = {
                password: enteredPassword,
                password2: enteredCPassword,
            }
            const token = localStorage.getItem('token')
            try{
                const res = await dispatch(changePassword({token, enteredData}))
                if (res.error){
                    console.log(error)
                    return
                }else{
                    setEnteredPassword('')
                    setEnteredCPassword('')
                }
            }catch(error){
                console.log(error)
            }
        }
    }
    if (error || message){
        setTimeout(() => {
            setError('')
        },15000)
    }
  return (
    <ContainerBox className={classes['change-password']}>
        <div className="border p-4">
            <h3 className='text-center'>Change Password</h3>
            {!error && message && <p className='success'>{message}</p>}
            {error && <p className='error'>{error}</p>}
            <Form onSubmit={changePasswordHandler}>

                <InputBox 
                    label="Password"
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    />
                <InputBox 
                    label="Confirm Password"
                    type={!viewPassword ? "password" : "text"}
                    value={enteredCPassword}
                    onChange={(e) => setEnteredCPassword(e.target.value) }
                    placeholder="Enter your confirm password"
                    required
                    pwdviewicon = {viewPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    onClick={pwdViewHandler}
                />
                <ButtonBox
                    type="submit"
                    className='w-100 btn btn-secondary'
                >
                    Change Password
                </ButtonBox>
            </Form>
        </div>
    </ContainerBox>
  )
}

export default ChangePassword