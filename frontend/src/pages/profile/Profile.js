import React, { useEffect, useState } from 'react'
import ContainerBox from '../../components/ui/ContainerBox'
import { Image, Table } from 'react-bootstrap'
import classes from './Profile.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const image = 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
    const fetchProfileData = async () => {
        try{
            const res = await axios.get(`api/accounts/profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                })
                if (res.status === 200){
                    const data = await res.data
                    setProfileData(data)
                }
        }catch(error){
            console.log(error.code)
        }
    }
    fetchProfileData()
  }, [token])
    return (
    <div className={classes.profile}>
        <ContainerBox>
            <div className={classes['profile-img']}>
                <Image src={image} />           

            </div>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <td>Name </td>
                    <td>{profileData.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{profileData.email}</td>
                </tr>
                </tbody>
            </Table>
        </ContainerBox>
    </div>
  )
}

export default Profile