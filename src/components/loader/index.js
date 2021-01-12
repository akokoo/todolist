import React from "react";
import loading from "./../../assets/loading.svg";
import './loader.scss';

const Loading = () => {
    console.log('render preloader');
    return <div className="spinner">
        <img src={loading} alt="Loading" />
    </div>
};

export default Loading;