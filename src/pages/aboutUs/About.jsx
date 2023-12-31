import React, {useEffect} from 'react';
import "./style.css"

const About = () => {
    const storeFront = require('../../assets/images/storeFront.png');
    const productImg = require('../../assets/images/iPhone.png');

    const headline = 'About Us';
    const storeHeadline = 'The Store';
    const productsHeadline = 'The Products';
    const altImageRestaurant = "a empty restaurant with black and brown chairs some black lamps brown tables and golden partitions";
    const altImageFood = "a burger with a meat patty some salad and a portion of fries in front of it";
    const fillerText =" Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cumque eligendi esse laudantium magnam\n" +
        "molestiae perspiciatis quibusdam rerum suscipit. Sapiente.\n" +
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cumque eligendi esse laudantium magnam\n" +
        "molestiae perspiciatis quibusdam rerum suscipit. Sapiente.";

    useEffect(() => {
        window.scrollTo(0 ,0);
    }, []);
    
    return (
        <div>
            <div className="content__wrapper">
            <div className="header">
                {headline}
            </div>
            <div className="underline"></div>
            <section className="aboutus__wrapper">
                <div className="restaurant__wrapper">
                    <img src={storeFront} className="image__restaurant" alt={altImageRestaurant} />
                        <div className="text__wrapper">
                            <div className="header__restaurant">
                                {storeHeadline}
                            </div>
                            <div className="text__restaurant">
                                {fillerText}
                            </div>
                        </div>
                </div>
                <div className="food__wrapper">
                    <img src={productImg} className="image__food" alt={altImageFood} />
                        <div className="text__wrapper">
                            <div className="header__food">
                                {productsHeadline}
                            </div>
                            <div className="text__food">
                                {fillerText}
                            </div>
                        </div>
                </div>
            </section>
            </div>
        </div>
    );
};

export default About;