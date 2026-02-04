import { LoadingSpinner } from "../components/common/LoadingSpinner"

export function Home() {
    return(
        <main className="spinner-container right_col d-flex justify-content-center align-items-center pt-0" role="main" aria-label="Main content">
            <LoadingSpinner size='lg' />
        </main>
    )
}