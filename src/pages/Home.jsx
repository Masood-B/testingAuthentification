import React, { useEffect } from "react";
import {account} from "../appwrite/config"
const Home = () => {
    useEffect(() =>{
        console.log(account)
    }, []);
    return (
        <h1>Welcome What Would You Like...</h1>
    );
}
 
export default Home;