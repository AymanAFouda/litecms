
//const API_BASE_URL = ""

export async function apiCallTest() {
    const response = await fetch('https://api.aruljohn.com/ip/json');
    if(!response.ok) throw new Error('faild to call API');
    
    const data = await response.json();
    console.log(data.ip);
    return data.ip;
}