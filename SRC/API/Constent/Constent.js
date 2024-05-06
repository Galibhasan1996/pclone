export const KEY = 'nwKlvxFNLCCGuBIR8BsDBfpsPwBCOPrIb1S1Bp0n2LQ1i2Xs55chuMgl'
import axios from 'axios'
import Toast from 'react-native-toast-message';

export const BASE_URL = 'https://api.pexels.com/'
export const SEARCH_VIDEO = "videos/search?query="
export const SEARCH_PHOTO = "v1/search?query="

// https://api.pexels.com/v1/search?query=nature&per_page=1
// https://api.pexels.com/videos/search?query=nature&per_page=1

// ------------fetch data by axios-------------
export const getData = async (url) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                'Authorization': KEY,
            },
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// -----------get search data by axios--------------

export const SearchData = async (url, endPoint, InputValue, Quantity) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${url}${endPoint}${InputValue}&per_page=${Quantity}`,
            headers: {
                'Authorization': KEY,
            },
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// -----------toast message------------

export const showToastRN = (title, text1, text2) => {
    Toast.show({
        type: title,
        text1: text1,
        text2: text2
    });
}