import React from 'react'
import { Button } from 'react-bootstrap'

const ButtonBox = (props) => {
  return (
    <Button 
        className={props.className}
        type={props.type || 'button'} 
        variant={props.variant}
        onClick={props.onClick}>
            {props.children}
    </Button>
  )
}

export default ButtonBox