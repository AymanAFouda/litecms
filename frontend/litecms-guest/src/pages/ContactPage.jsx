import { useEffect } from "react";
import ContactLayout from "../components/layouts/ContactLayout";

const data = {
    title: "Let’s Talk </br> About You",
    phone: "+1234567890",
    mail: "contact@litecms.com",
    location: "Tuzla, İstanbul/Turkey",
}

export const ContactPage = () => {
    useEffect(() => {
        document.title = "Contact Us - LiteCMS"
    }, []);

    return (<ContactLayout data={data} />)
}