import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export let wishContext = createContext();
export default function WishContextProvider({ children }) {
    let [wishItemsNumber, setwishItemsNumber] = useState(null);
    const apiUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';
    let headerconfig = {
        headers: {
            token: localStorage.getItem('userData'),
        },
    };



    function getWishItems() {
        return axios.get(apiUrl, headerconfig);
    }
    function removeWishItems(id) {
        return axios.delete(`${apiUrl}/${id}`, headerconfig);
    }
    function addWishItems(id) {
        let data = {
            productId: id
        }
        return axios.post(apiUrl, data, headerconfig);
    }
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            getWishItems().then((req) => {
                setwishItemsNumber(req.data.count)
               
            }).catch((err) => {
                console.log(err.response.data.message)
            })
        }

    }, [])



    return <wishContext.Provider value={{ wishItemsNumber, setwishItemsNumber, getWishItems, removeWishItems,addWishItems }}>{children}</wishContext.Provider>


}
