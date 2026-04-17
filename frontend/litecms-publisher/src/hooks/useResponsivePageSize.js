import { useEffect, useState } from "react";

export function useResponsivePageSize({
    mobile = 5,
    desktop = 10,
    breakpoint = 768
} = {}) {
    const [itemsPerPage, setItemsPerPage] = useState(desktop);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(
                window.innerWidth < breakpoint ? mobile : desktop
            );
        };

        handleResize();
    }, []);

    return itemsPerPage;
}