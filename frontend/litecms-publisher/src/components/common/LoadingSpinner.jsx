export function LoadingSpinner({ size }) {
    const sizeClasses = {
        'sm': 'small-spinner',
        'md': 'medium-spinner',
        'lg': 'large-spinner',
    };

    return (
        <div className={`${sizeClasses[size]} spinner-border text-primary`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}