import React, {useState, useRef} from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import InputBox from '../../components/ui/InputBox'
import ContainerBox from '../../components/ui/ContainerBox'
import classes from './SellerSignup.module.css'
import ButtonBox from '../../components/ui/ButtonBox'
import { sellerSignup } from '../../app/features/authSlice'


const SellerSignup = () => {
    const [error, setError] = useState('')
    const [enteredName, setEnteredName] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredCPassword, setEnteredCPassword] = useState('')
    const acceptTermsRef = useRef()
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

    const signupHandler = async(e) => {
        e.preventDefault()
        if (enteredName.trim().length < 3){
            setError('Name must be 3 and more charachers')
        }else if (enteredEmail.trim().length < 9 || !enteredEmail.includes('@')){
            setError('Please enter a valid email')
        }else if (enteredPassword.trim().length < 6){
            setError('Password must be 6 and  more characters')
        }else if(enteredPassword !== enteredCPassword){
            setError("Password and confirm doesn't match")
        }else{
            const tc = acceptTermsRef.current.checked;
            const enteredData = {
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                password2: enteredCPassword,
                tc: tc
            }
            try{
                const res = await dispatch(sellerSignup({enteredData}))
                if (res.error){
                    if (res.payload.email){
                        setError(res.payload.email[0])
                    }else if(res.payload.non_field_errors){
                        setError(res.payload.non_field_errors[0])
                    }else{
                        setError('Request failed')
                    }
                    return;
                }else{
                    // After form submit set field empty
                    setEnteredName('')
                    setEnteredEmail('')
                    setEnteredPassword('')
                    setEnteredCPassword('')
                    acceptTermsRef.current.checked = false
                    navigate('/login')

                }  
            }catch(error){
                console.log(error)
            }
        }
    }

    // After 15s hide error message 
    if (error){
        setTimeout(() => {
            setError('')
        },15000)
    }
    return (
    <ContainerBox className={classes.signup}>
        <div className="border p-4">
            <h3 className='text-center'>Become a Seller</h3>
            {error && <p className='error'>{error}</p>}
    
            <Form onSubmit={signupHandler}>
                <InputBox 
                    label="Name"
                    type="text"
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        ref={acceptTermsRef}
                        label={<span>Accept<Link to="/terms-and-conditons"> 
                            Terms and Conditions</Link></span>} 
                        required
                    />
                </Form.Group>
                <ButtonBox
                    type="submit"
                    className='w-100 btn btn-secondary'
                >
                    Sign up
                </ButtonBox>
            </Form>
            <p className='mt-2'>Already have an account. Please <Link to='/login'>Login</Link></p>
        </div>
    </ContainerBox>
  )
}

export default SellerSignup