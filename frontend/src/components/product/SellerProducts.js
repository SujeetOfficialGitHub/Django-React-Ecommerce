import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ProductPrice from '../../components/ui/ProductPrice'
import {FaTrash, FaEdit} from 'react-icons/fa';
import {AiOutlineEye} from 'react-icons/ai'
import {Image, Modal} from 'react-bootstrap'
import classes from './SellerProducts.module.css'
import ButtonBox from '../ui/ButtonBox';
import { useDispatch } from 'react-redux';
import { sellerProductDelete } from '../../app/features/sellerProductSlice';

const SellerProducts = ({i, item}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteHandler = (slug) => {
        dispatch(sellerProductDelete({slug}))
    }

    const populateDataHandler = () => {
        navigate(`/products-listed/${item.slug}`)
    }
  return (
    <>
        <tr>
            <td>{i+1}</td>
            <td className={classes.image}>
                <Image src={item.image} />
            </td>
            <td className={classes.category}>
                {item.category}
            </td>
            <td className={classes.title}>
                {item.title.length >30 ? item.title.substr(0, 30) + "..." : item.title}
            </td>
            <td>
                <ProductPrice price={item.market_price} selling_price={item.selling_price} />
            </td>
            <td className={classes.actions}>
                <ButtonBox onClick={handleShow} variant="success"><AiOutlineEye /></ButtonBox>
                <ButtonBox onClick={populateDataHandler} variant="warning"><FaEdit /></ButtonBox>
                <ButtonBox onClick={() => deleteHandler(item.slug)} variant="danger"><FaTrash /></ButtonBox>
            </td>
        </tr>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{item.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <dl>
                    <dt>Category</dt>
                    <dd className='text-capitalize'>{item.category}</dd>

                    <dt>Image</dt>
                    <dd className='text-center'><Image style={{width: '10rem', height: '10rem'}} src={item.image} /></dd>

                    <dt>Price</dt>
                    <dd><ProductPrice price={item.market_price} selling_price={item.selling_price} /></dd>
                    
                    <dt>Description</dt>
                    <dd>{item.description}</dd>
                </dl>
            </Modal.Body>
            
            <Modal.Footer>
                <ButtonBox variant="secondary" onClick={handleClose}>
                    Close
                </ButtonBox>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default SellerProducts