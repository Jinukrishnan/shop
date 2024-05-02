import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
const Home = ({search}) => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const [categories, setCategories] = useState([])
    async function getProducts() {
        const res = await axios.get("https://dummyjson.com/products/")
        // console.log(res.data.products);
        setData([...res.data.products])
        const resCat=await axios.get("https://dummyjson.com/products/categories")
        console.log(resCat.data);
        setCategories([...resCat.data])
    }
    useEffect(() => {
        getProducts()
    }, [])
    if (data.length==0) 
    return (<Loading/>)
    console.log(`from home ${search}`);
    return (
        <div className='home'>
            <div className="container-fluid p-3 d-flex " style={{overflow:"auto"}}>
                <button className='btn btn-outline-secondary px-3' onClick={()=>{setFilter("")}}>All</button>
                {
                    categories.map((cat,index)=>(<button className='btn btn-outline-secondary px-3 mx-2' key={index} onClick={()=>{setFilter(cat)}}>{cat}</button>))
                }
            </div>
            <div className="container">
                <div className="row mt-5">
                    {
                        data.filter(i=> i.title.toLowerCase().includes(search.toLowerCase()))
                        .filter((dt)=> dt.category.includes(filter))
                        .map((dt,index) => (<div className='col-lg-3 my-5 cl' key={index}>
                            <Link to={`/details/${dt.id}`} style={{textDecoration:"none"}}>
                            <div className="card crd" style={{ width: "15rem" }}>
                                <div className="image" style={{ width: "100%", height: "200px" }}>
                                    <img src={dt.thumbnail} className="card-img-top" alt="... " style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{dt.title.substring(0, 15)}</h5>
                                    <p className="card-text">{dt.rating}</p>
                                    <p className="card-text">{dt.price}</p>
                                    
                                  
                                </div>
                            </div>
                            </Link>
                        </div>))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
