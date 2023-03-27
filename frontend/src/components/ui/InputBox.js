import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './InputBox.module.css'
const InputBox = (props) => {

  return (
    <Form.Group className="mb-3" controlId={props.label}>
      <Form.Label>{props.label}</Form.Label>
      <div className={classes['input']}>
        <Form.Control 
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          placeholder={props.placeholder}
          />
        {props.pwdviewicon && <span onClick={props.onClick} className={classes['password-view-icon']}>{props.pwdviewicon}</span>}
      </div>
    </Form.Group>
  )
}

export default InputBox