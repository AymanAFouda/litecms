import { useState, useEffect } from "react";
import { getCategoriesAndCounts, getCategories } from "../services/categoryApi"

export function useCategories() {
    const [categoryList, setCategoryList] = useState([]);
    const [categoriesAreLoading, setCategoriesAreLoading] = useState(false);
    const [categoriesLoadError, setCategoriesLoadError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesAreLoading(true);
            try {
                const catList = await getCategories();
                setCategoryList(catList);
                
                setCategoriesLoadError(null);
            } catch (er) {
                setCategoriesLoadError(er);
            } finally {
                setCategoriesAreLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categoryList, categoriesAreLoading, categoriesLoadError };
}

export function useCategoryCounts() {
    const [categoryList, setCategoryList] = useState([]);
    const [categoriesAreLoading, setCategoriesAreLoading] = useState(false);
    const [categoriesLoadError, setCategoriesLoadError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesAreLoading(true);
            try {
                const catList = await getCategoriesAndCounts();
                setCategoryList(catList);
                
                setCategoriesLoadError(null);
            } catch (er) {
                setCategoriesLoadError(er);
            } finally {
                setCategoriesAreLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categoryList, categoriesAreLoading, categoriesLoadError };
}