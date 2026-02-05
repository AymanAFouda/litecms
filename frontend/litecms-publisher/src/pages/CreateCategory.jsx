import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api";
import toast from 'react-hot-toast';


export function CreateCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [createAnother, setCreateAnother] = useState(false)
    const navigate = useNavigate()

    const resetForm = () => {
        setCategoryName("")
    }

    const handleSubmit = async () => {
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
            toast.error(er)
        }
    }

  return (
    <>
    <title>Create Category</title>
    <main className="right_col" role="main" aria-label="Main content">
        <div className="">
            <div className="page-title">
                <div className="title_left">
                    <h3>Categories</h3>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h4>Create Category</h4>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <br />
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit()}} className="form-horizontal form-label-left">
                                <div className="row mb-3">
                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="category-name">
                                        Category Name <span className="required text-danger">*</span>
                                    </label>
                                    <div className="col-md-6 col-sm-6">
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
                                    <div className="col-md-6 col-sm-6 center-margin">
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox"
                                                id="createAnother"
                                                checked={createAnother}
                                                onChange={(e) => setCreateAnother(e.target.checked)} />

                                            <label className="form-check-label" htmlFor="createAnother">
                                                Create another category after this
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="ln_solid"></div>
                                <div className="row mb-3">
                                    <div className="col-md-6 col-sm-6 center-margin">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => navigate(-1)}>Cancel</button>
                                            <button className="btn btn-outline-primary" type="button" onClick={resetForm}>Reset</button>
                                            <button type="submit" className="btn btn-success">Submit</button>
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
    </>
  )
}