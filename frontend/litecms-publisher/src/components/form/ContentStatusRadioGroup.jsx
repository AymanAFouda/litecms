const statusList = [
    {
        id: "statusDraft",
        value: "DRAFT"
    },
    {
        id: "statusPublisher",
        value: "PUBLISHED"
    },
    {
        id: "statusArchived",
        value: "ARCHIVED"
    },
]

export const ContentStatusRadioGroup = ({ formData, handleChange }) => {
    return (
        <div className="col-12 d-flex justify-content-start align-items-center flex-wrap gap-5">
            {statusList.map((status, index) => (
                <div key={index} className="form-check form-check-inline mb-0 d-flex align-items-center gap-2">
                    <input
                        className="form-check-input" 
                        type="radio"
                        name="status"
                        id={status.id}
                        value={status.value}
                        checked={formData.status === status.value}
                        onChange={handleChange}
                        required />
                    <label className="form-check-label" htmlFor={status.id}>{status.value}</label>
                </div>
            ))}
        </div>
    )
}