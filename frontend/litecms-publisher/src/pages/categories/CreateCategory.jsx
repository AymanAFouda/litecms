import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AnotherCheckBox } from "../../components/form/AnotherCheckBox";
import { createCategory } from "../../services/categoryApi";

export function CreateCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [createAnother, setCreateAnother] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()

    useEffect(() => { 
        document.title = "Create Category"; 
    }, []);

    const resetForm = () => {
        setCategoryName("")
        setCreateAnother(false)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const payload = {
                name: categoryName,
            };

            const createdCategory = await createCategory(payload)
            toast.success("Category created successfully!")

            if(createAnother) {
                setCategoryName("")
                setCreateAnother(false)
            } else {
                navigate("/categories")
            }
        } catch(er) {
            toast.error("Failed to create Category")
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <main className="right_col" role="main" aria-label="Main content">
        <div className="">
            <div className="page-title">
                <div className="title_left">
                    <h3>Categories</h3>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>Create Category</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <br />
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit()}} className="form-horizontal form-label-left">
                                <div className="row mb-3">
                                    <label className="col-form-label col-sm-3 label-align fs-6" htmlFor="category-name">
                                        Category Name <span className="required text-danger">*</span>
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            id="category-name"
                                            required
                                            minLength={2}
                                            className="form-control"
                                            aria-describedby="category-name-help" 
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)} />

                                        <div id="category-name-help" className="form-text">{`Enter category name (minimum 2 characters)`}</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6 center-margin">
                                        <AnotherCheckBox 
                                            label="Create another category after this"
                                            checked={createAnother}
                                            onChange={setCreateAnother}
                                        />
                                    </div>
                                </div>
                                <div className="ln_solid"></div>
                                <div className="row mb-3">
                                    <div className="col-sm-6 center-margin">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(-1)}>Cancel</button>
                                            <button className="btn btn-outline-primary" type="button" onClick={resetForm}>Reset</button>
                                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}