import { useState, useEffect } from 'react'
import { ThreeDots } from "react-loader-spinner";
import { BsFillChatLeftQuoteFill } from "react-icons/bs"
import axios from "axios";
import "./index.css"

const QuoteGenerator = () => {
    const [data, setData] = useState(null)
    const [loading, setLoader] = useState(true)
    const [error, setError] = useState("")

    const formatError = (err) => {
        if (!err) return "Something went wrong."

        if (err.response) {
            switch (err.response.status) {
                case 404: return "Quote not found. Please try again."
                case 429: return "Too many requests. Please wait and try again."
                case 500: return "Server error. Try again later."
                default: return `Server error (${err.response.status}).`
            }
        }

        if (err.message === "Network Error")
            return "No internet connection. Please check your network."

        return err.message || "Unexpected error occurred."
    }

    const fetchData = async () => {
        try {
            setLoader(true)
            setError("")
            const response = await axios.get("https://info-hub-8c91.vercel.app/api/quote")

            if (!response.data) {
                setError("No quote available right now.")
                setLoader(false)
                return
            }

            setData(response.data)
            setLoader(false)
        } catch (err) {
            setError(formatError(err))
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

     if (error) {
        return (
            <div className="quote-container">
            <div className="top-contaier"> 
                <h4 className="heading">Quote for you <BsFillChatLeftQuoteFill /></h4>
                <button type='button' onClick={fetchData} className='refesh-button'>Another</button>
                </div>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="quote-container">
            <div className="top-contaier"> 
                <h4 className="heading">Quote for you <BsFillChatLeftQuoteFill /></h4>
                <button type='button' onClick={fetchData} className='refesh-button'>Another</button>
            </div>

            {loading ? (
                <div className="loader-container">
                    <ThreeDots
                        visible={true}
                        height="50"
                        width="50"
                        color=" #67c1dc"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            ) : (
                <>
                    {error && <p className='error'>{error}</p>}
                    
                    {!error && data && (
                        <div className='data-container'>
                            <div className='quote'>
                                <p>"{data.content}"</p>
                            </div>

                            <div className='quote-details'>
                                <div>
                                    <p><span>Author: </span>{data.author}</p>
                                    <p><span>Tag: </span>{data.tags?.[0] || "Unknown"}</p>
                                </div>
                                <div>
                                    <p><span>Date published: </span>{data.dateAdded}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default QuoteGenerator

