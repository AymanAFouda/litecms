const API_BASE_URL = "http://localhost:8080"


// Articles

export async function getArticles() {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if(!response.ok) throw new Error('Faild to fetch Articles');
    
    const data = await response.json();
    return data;
}

export async function getArticle(id) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    if(!response.ok) throw new Error('Faild to fetch Article');
    
    const data = await response.json();
    return data;
}

export async function createArticle(article) {
    const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    })

    if(!response.ok) throw new Error('Faild to create Article');
    
    const createdArticle = await response.json();
    return createdArticle;
}

export async function editArticle(article) {
    const response = await fetch(`${API_BASE_URL}/articles/${article.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    })

    if(!response.ok) throw new Error('Faild to edit Article');
    
    const updatedArticle = await response.json();
    return updatedArticle;
}

export async function deleteArticle(id) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if(!response.ok) throw new Error('Faild to delete Article');
}


// Categories 

export async function getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if(!response.ok) throw new Error('Faild to fetch Categories');
    
    const data = await response.json();
    return data;
}

export async function createCategory(categoryName) {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryName),
    })

    if(!response.ok) throw new Error('Faild to create Category');
    
    const createdCategory = await response.json();
    return createdCategory;
}

export async function editCategory(category) {
    const response = await fetch(`${API_BASE_URL}/categories/${category.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    })

    if(!response.ok) throw new Error('Faild to edit Category');
    
    const updatedCategory = await response.json();
    return updatedCategory;
}

export async function deleteCategory(id) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if(!response.ok) throw new Error('Faild to delete Category');
}

