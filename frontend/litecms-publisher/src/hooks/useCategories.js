import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryApi";
import toast from "react-hot-toast";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const data = await getCategories();
                setCategories(data);
                setLoadError(null);
            } catch (er) {
                toast.error("Failed to load categories");
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, setCategories , isLoading, loadError };
}