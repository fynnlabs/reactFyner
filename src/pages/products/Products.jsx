import axios from "axios";
import React, { useEffect, useState } from 'react';
import './style.css';
import FilterBtns from "../../components/filterBtns/FilterBtns";
import Items from "../../components/items/Items";
import MyLoader from "../../components/myLoader/MyLoader";

const Products = () => {
    const [dataArray, setDataArray] = useState([]);
    const [clonedDataArray, setClonedDataArray] = useState([]);
    const [isData, setIsData] = useState(false);
    const headline = "Our Products";
    const url = 'https://dummyjson.com/products';

    useEffect(() => {
        loadProducts(url);
        window.scrollTo(0 ,0);
    }, []);

    const loadProducts = async (url) => {
        try {
            const result = await axios.get(url);
            setDataArray(result.data.products);
            setClonedDataArray(result.data.products);
            setIsData(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="content__wrapper">
            <div className="header__wrapper">
                <header className="header">
                    {headline}
                </header>
                <div className="underline"></div>
                <FilterBtns clonedDataArray={clonedDataArray} setDataArray={setDataArray}/>
            </div>
            {isData ?<Items dataArray={dataArray}/> : <MyLoader />}
        </div>
    );
};

export default Products;