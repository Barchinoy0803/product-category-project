import React from 'react'
import Navbar from '../../components/Navbar'
import useGet from '../../hooks/useGet'
import "./style.scss"
import { CircularProgress } from '@mui/material'

const Home = () => {
    const { data, loading, error } = useGet("/products", false)

    return (
        <>
            <Navbar />
            <div className='container products__wrapper'>
                {
                    loading ? <CircularProgress /> :
                    data?.data?.map((product) => (
                        <div className='product__card'>
                            <img src={product.img} alt="" />
                            <h1>{product.name}</h1>
                            <strong>{product.price} USD</strong>
                            <p>{product.description}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Home