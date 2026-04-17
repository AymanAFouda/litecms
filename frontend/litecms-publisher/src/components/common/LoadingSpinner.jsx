export function LoadingSpinner() {
    return (
        <main className="spinner-container right_col d-flex justify-content-center align-items-center pt-0" role="main" aria-label="Main content"> 
            <div className="large-spinner spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </main>
    );
}