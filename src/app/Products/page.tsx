"use client";
import { Grid, Paper, styled } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

interface NestedObject {
    name: string;
    slug: string;
    image: string;
    // Add other properties as needed
}
interface ProdObj {
    id: string;
    title: string;
    slug: string;
    imageCover: string;

    description: string;
    quantity: number;
    price: number;

    ratingsAverage: number;
    ratingsQuantity: number;

    brand: NestedObject
    category: NestedObject
    // Add other properties as needed
}
export default function page() {
    const [Products, setProducts] = useState<ProdObj[]>([])
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
        position: 'relative',
    }));
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
        .then(response => {
            console.log('Products:', response.data.data);
            localStorage.setItem('Products', JSON.stringify(response.data.data))
            setProducts(response.data.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return (
        <div className='w-full items-center flex flex-col'>
            
        <Grid container rowSpacing={3} columnSpacing={3}>
            {Products?.map((product) => (
                    <Grid key={product.id} item xs={12} sm={4} md={2} className="">
                        {/* <div className=" p-3">{product.title}</div> */}
                        <Item className="BorderSettings">
                            <a target="_blank" href={product.imageCover}><img loading="lazy" className="ProdDisplay w-full" src={product.imageCover} alt={product.title} /></a>
                            <p className=" text-white">{product.title}</p>
                        </Item>
                    </Grid>
            ))
        }
        </Grid>
        </div>
    )
}
