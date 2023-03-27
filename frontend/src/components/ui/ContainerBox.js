import React from 'react'
import { Container } from 'react-bootstrap'
const ContainerBox = (props) => {
  return <Container className={props.className}>{props.children}</Container>
}

export default ContainerBox