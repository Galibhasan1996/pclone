export const KEY = 'nwKlvxFNLCCGuBIR8BsDBfpsPwBCOPrIb1S1Bp0n2LQ1i2Xs55chuMgl'
import axios from 'axios'




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