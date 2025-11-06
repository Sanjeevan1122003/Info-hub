import { useState, useEffect } from 'react'
import { ThreeDots } from "react-loader-spinner";
import { BsFillChatLeftQuoteFill } from "react-icons/bs"
import axios from "axios";
import "./index.css"


const QuoteGenerator = () => {
    const [data, setData] = useState(null)
    const [loading, setLoader] = useState(true)
    const [error, setError] = useState("");


    const fetchData = async () => {
        try {
            setLoader(true);
            setError("");
            const response = await axios.get("https://info-hub-8c91.vercel.app/api/quote");
            setData(response.data);
            setLoader(false);
        } catch (err) {
            setError(err);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="quote-container">
            <div className="top-contaier"> 
                <h4 className="heading">Quote for you <BsFillChatLeftQuoteFill /></h4>
                <button type='button' onClick={fetchData} className='refesh-button'>Another</button>
            </div>
            {loading? (<>
            <div className="loader-container">
                <ThreeDots
                    visible={true}
                    height="50"
                    width="50"
                    color=" #67c1dc"
                    ariaLabel="three-dots-loading"
                />
            </div></>):(<>
            {error && <p className='error'>{error}</p>}
            <div className='data-container'>
                <div className='quote'>
                    <p>"{data.content}"</p>
                </div>
                <div className='quote-details'>
                    <div>
                        <p><span>Author: </span>{data.author}</p>
                        <p><span>Tag: </span>{data.tags[0]}</p>
                    </div>
                    <div>
                        <p><span>Date published: </span>{data.dateAdded}</p>
                    </div>
                </div>
            </div></>)}
        </div>
    )


}

export default QuoteGenerator



