const fetch = require('node-fetch');
const https = require('https');

const fetcher = async (url) => {
    try{
        const httpsAgent = new https.Agent({
            rejectUnauthorized: true
        })
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            agent:httpsAgent,
            timeout: 9000
        });
        const data = await response.json();
        return new Promise((resolve) => {
            resolve(data);
        })
    } catch (e){
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}

export { fetcher };