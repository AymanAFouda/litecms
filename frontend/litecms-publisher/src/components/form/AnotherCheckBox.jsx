export const AnotherCheckBox = ({ label, checked, onChange }) => {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                id="createAnother"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="createAnother">
                {label}
            </label>
        </div>
    )
}