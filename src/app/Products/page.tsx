"use client";
import { Grid, Paper, styled, Tooltip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Zoom from '@mui/material/Zoom';
import './style.css'
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

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export default function ProductsPage() {
    const [Products, setProducts] = useState<ProdObj[]>([]);
    const [SearchQuerry, setSearchQuerry] = useState<string>('');
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A2027',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        height: '100%',
        color: theme.palette.text.secondary,
        position: 'relative',
    }));
    useEffect(() => {

        const localProducts = localStorage.getItem('Products')
        if (localProducts) {
            console.log("Local storage");
            setProducts(JSON.parse(localProducts))
        } else {
            console.log("Fetching Data");
            axios.get(`${NEXT_PUBLIC_BASE_URL}/products`)
                .then(response => {
                    console.log('Products:', response.data.data);
                    localStorage.setItem('Products', JSON.stringify(response.data.data))
                    setProducts(response.data.data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, [])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuerry(event.target.value);
    };
    const filteredItems = SearchQuerry
        ? Products.filter(
            (item) =>
                item.title.toLowerCase().includes(SearchQuerry.toLowerCase())
        )
        : Products;
    return (
        <div className='w-full items-center flex flex-col my-10 '>
            <div className="container">
                <h1 className="text-center mb-4">Shopping cart</h1>
                <input type="text" placeholder="Search" className="mb-5 opacity-80 hover:opacity-100 transition-all	 focus:opacity-100 w-full shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight border-transparent  hover:border-gray-300 border-2 focus:border-blue-300 focus:outline-none focus:shadow-outline" onChange={handleSearchChange} />
                <Grid container rowSpacing={3} columnSpacing={3}>
                    {filteredItems?.map((product) => (
                        <Grid key={product.id} item xs={12} sm={4} md={4} lg={2} className="">
                            {/* <div className=" p-3">{product.title}</div> */}
                            <Item className="BorderSettings">
                                <a target="_blank" href={product.imageCover}><img loading="lazy" className="ProdDisplay w-full" src={product.imageCover} alt={product.title} /></a>
                                <Tooltip
                                    followCursor
                                    TransitionComponent={Zoom} title={product.title}>
                                    <p className="mt-3 cursor-pointer text-white text-ellipsis overflow-hidden whitespace-nowrap">{product.title}</p>
                                </Tooltip>
                            </Item>
                        </Grid>
                    ))
                    }
                </Grid>
            </div>

        </div>
    )
}
