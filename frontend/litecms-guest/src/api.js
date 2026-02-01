
const API_BASE_URL = "http://localhost:8080/api/articles"

export async function getArticles() {
    const response = await fetch(API_BASE_URL);
    if(!response.ok) throw new Error('Faild to fetch Articles');
    
    const data = await response.json();
    console.log(data);
    return data;
}

export async function apiCallTest() {
    const response = await fetch('https://api.aruljohn.com/ip/json');
    if(!response.ok) throw new Error('faild to call API');
    
    const data = await response.json();
    console.log(data.ip);
    return data.ip;
}