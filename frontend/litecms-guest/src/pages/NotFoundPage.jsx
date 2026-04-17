import { useEffect } from "react";

export const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Page not found"
    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="flex h-[40vh] items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-4">Error 404</h1>
                        <div className="content">
                            <h2 id="page-not-found">Page Not found</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}