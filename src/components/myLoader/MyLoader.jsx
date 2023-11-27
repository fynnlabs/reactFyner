import React from 'react';
import './style.css'

const MyLoader = () => {
    const timesMyLoader = [1,2,3,4,5,6,7];

    return (
        timesMyLoader.map(() => (
            <div className="skeleton__wrapper">
                <div className="skeleton__image" />
                <div className="skeleton__textWrapper">
                    <div className="skeleton__header" />
                    <div className="skeleton__description" />
                </div>
            </div>))
    );
};

export default MyLoader;