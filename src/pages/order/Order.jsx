import React, {useEffect, useState} from 'react';
import FilterBtns from "../../components/filterBtns/FilterBtns";
import "./style.css";
import Items from "../../components/items/Items";
import axios from "axios";
import {useMediaQuery} from "@react-hook/media-query";
import MyLoader from "../../components/myLoader/MyLoader";

const Order = () => {
    const [showCart, setShowCart] = useState(false);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [dataArray, setDataArray] = useState([]);
    const [clonedDataArray, setClonedDataArray] = useState([])
    const [shoppingCartItems, setShoppingCartItems]  = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const headline = "Order";
    const shoppingCartHeadline = "Warenkorb";
    const orderBtnText = "Jetzt Bestellen";
    const shoppingCartPlaceholder = "Noch keine Einträge im Warenkorb"
    const totalText = "Summe:"
    const isItDesktop = useMediaQuery('(min-width: 1440px)')
    let totalPriceCalculate = 0
    const [isData, setIsData] = useState(false)


    //toggles the shoppingCart
    const showShoppingCart = () => {
        setShowCart(!showCart);
    }

    //adds items to shoppingCart
    const addItemToCart = (product) => {
        setItemsInCart(itemsInCart + 1);
        const existingItemIndex = shoppingCartItems.findIndex((item) => item.id === product.id);

        if (existingItemIndex !== -1) {
            const updatedItems = [...shoppingCartItems];
            updatedItems[existingItemIndex].quantity += 1;
            setShoppingCartItems(updatedItems);
        } else {
            const newItem = {...product, quantity: 1};
            setShoppingCartItems([...shoppingCartItems, newItem]);
        }

        for (const item of shoppingCartItems){
            totalPriceCalculate += item.price * item.quantity
        }

        setTotalPrice(totalPriceCalculate)
    }

    //loads the products
    const loadProducts = async () => {
            try {
                const result = await axios.get('https://dummyjson.com/products');
                setDataArray(result.data.products);
                setClonedDataArray(result.data.products);
                setIsData(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    }

    //removes everything from the shoppingCart
    const orderBtnClick = () => {
        setShoppingCartItems([])
        setItemsInCart(0)
        setShowCart(!showCart);
        alert("Ihre Bestellung wurde aufgenommen")
    }

    useEffect(() => {
        loadProducts();
        window.scrollTo(0 ,0)
    }, []);

    return (
        <div>
            <div className="content__wrapper">
                <div className="header__wrapper">
                    <header className="header">
                        {headline}
                    </header>
                    <div className="underline"></div>
                    <FilterBtns clonedDataArray={clonedDataArray} setDataArray={setDataArray}/>
                </div>
                {isData ?<Items addItemToCart={addItemToCart} dataArray={dataArray}/> : <MyLoader />}
                <div className="shoppingCart" id="shoppingCart" onClick={showShoppingCart}>
                    {`Warenkorb (${itemsInCart})`}
                </div>
            <div className={showCart ? "blend__background" : ""} id="backgroundPop" onClick={showShoppingCart}></div>
            <section className={showCart || isItDesktop ? "shoppingCartPop" : ""} id="shoppingCartPop">
                <div className="shoppingCartPop__header">{showCart || isItDesktop? shoppingCartHeadline : ""}</div>
                <div className="shoppingCartPop__content" id="shoppingCartPopContent">
                    {itemsInCart === 0 && shoppingCartItems.length === 0 && (showCart || isItDesktop) ? shoppingCartPlaceholder : (showCart || isItDesktop) ? shoppingCartItems.map((product) => (
                        <div className="shoppingCartItem__wrapper" key={product.id}>
                            <div className="shoppingCartItem__name">{product.title} ({product.quantity})</div>
                            <div className="shoppingCartItem__price">{(product.price * product.quantity).toFixed(2)}</div>
                        </div>
                    )) : null
                    }
                    {itemsInCart === 0 && shoppingCartItems.length === 0 && (showCart || isItDesktop)  ? null: (showCart || isItDesktop) ?
                        <div className="total__wrapper">
                            <div className="total__text">{totalText}</div>
                            <div className="total__price">{totalPrice.toFixed(2)}</div>
                        </div> : null
                }
                </div>
                <div className={itemsInCart === 0 ? "shoppingCartPop__orderBtnInactive" :"shoppingCartPop__orderBtnActive"} id="shoppingCartPopOrderBtn" onClick={itemsInCart === 0 ? null :orderBtnClick}>{showCart || isItDesktop? orderBtnText : ""}</div>
            </section>
        </div>
            </div>
    );
};

export default Order;