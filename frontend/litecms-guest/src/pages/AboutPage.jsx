import { useEffect } from "react";
import AboutLayout from "../components/layouts/AboutLayout";

const data = { 
    title: "About LiteCMS",
    content: `
## What is LiteCMS

LiteCMS is a lightweight Content Management System designed to make publishing and exploring digital content simple and efficient. The platform enables structured presentation of articles, photo galleries, and embedded videos within a clean and accessible interface.

Built with a focus on usability and performance, LiteCMS provides a streamlined experience for both content publishers and site visitors. LiteCMS is designed around the idea that content management should be straightforward and distraction-free. The system focuses on essential features while maintaining a clean, responsive, and accessible user experience across desktop and mobile devices.

LiteCMS was developed as an academic software engineering project to demonstrate practical full-stack development, modern web architecture, and effective content management design.The platform emphasizes clarity, usability, and solid engineering foundations.

---

## What LiteCMS Offers

LiteCMS helps content creators organize and present information while allowing visitors to easily discover and interact with published content.

### For Content Publishers

- Create, edit, publish, and delete content  
- Save and manage draft content  
- Organize posts using categories and tags  
- Manage images and embedded videos  
- Access a personal dashboard with basic insights  

### For Visitors

- Browse articles, galleries, and videos  
- Search content using keywords and filters  
- Like published content  
- Leave comments without registration  

---

## Technology Behind LiteCMS

LiteCMS is powered by a modern full-stack architecture:

- **Backend:** Java 17+ with Spring Boot  
- **Frontend:** React.js responsive interface  
- **Search:** Elasticsearch full-text search  
- **Database:** PostgreSQL relational database  
- **Mobile Support:** Android WebView application  

This architecture ensures reliable performance, maintainability, and efficient content retrieval.

---

## Our Focus

LiteCMS prioritizes:

- Clean and intuitive user experience  
- Efficient content organization  
- Fast and accurate search  
- Responsive design across devices  
- Maintainable and modular architecture  
`,
}

export const AboutPage = () => {

    useEffect(() => {
        document.title = "About"
    }, []);

    return (<AboutLayout data={data} />)
}