export function Categories() {
    return(
    <div className="nav-md">
        <div className="container body">
                {/* top navigation */}
                <div className="top_nav">
                    <div className="nav_menu d-flex align-items-center justify-content-between">
                        <div className="nav toggle">
                            <a id="menu_toggle"><i className="fas fa-bars"></i></a>
                        </div>
                        <nav className="nav navbar-nav ms-auto">
                            <ul className="navbar-right d-flex align-items-center gap-3 pe-3">
                                <li className="nav-item dropdown">
                                    <a href="#" role="button" className="dropdown-toggle info-number" id="navbarDropdown1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-envelope"></i>
                                        <span className="badge bg-green">6</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end list-unstyled msg_list dropdown-menu-lg" role="menu" aria-labelledby="navbarDropdown1">
                                        <li className="nav-item">
                                            <a className="dropdown-item">
                                                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                                                <span>
                                                    <span>John Smith</span>
                                                    <span className="time">3 mins ago</span>
                                                </span>
                                                <span className="message">
                                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="dropdown-item">
                                                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                                                <span>
                                                    <span>John Smith</span>
                                                    <span className="time">3 mins ago</span>
                                                </span>
                                                <span className="message">
                                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="dropdown-item">
                                                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                                                <span>
                                                    <span>John Smith</span>
                                                    <span className="time">3 mins ago</span>
                                                </span>
                                                <span className="message">
                                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="dropdown-item">
                                                <span className="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                                                <span>
                                                    <span>John Smith</span>
                                                    <span className="time">3 mins ago</span>
                                                </span>
                                                <span className="message">
                                                    Film festivals used to be do-or-die moments for movie makers. They were where...
                                                </span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <div className="text-center">
                                                <a className="dropdown-item">
                                                    <strong>See All Alerts</strong>
                                                    <i className="fas fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            <li className="nav-item dropdown">
                                <a href="#" role="button" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="images/img.jpg" alt=""/>John Doe
                                </a>
                                <div className="dropdown-menu dropdown-menu-end dropdown-usermenu dropdown-menu-sm" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#" role="button"> Profile</a>
                                    <a className="dropdown-item" href="#" role="button">
                                        <span className="badge bg-red float-end">50%</span>
                                        <span>Settings</span>
                                    </a>
                                    <a className="dropdown-item" href="#" role="button">Help</a>
                                    <a className="dropdown-item" href="login.html"><i className="fas fa-sign-out-alt float-end"></i> Log Out</a>
                                </div>
                            </li>
                        </ul>
                        </nav>
                    </div>
                </div>
                {/* /top navigation */}

                {/* page content */}
                <main className="right_col" role="main" aria-label="Main content">
                    <div className="">
                        <div className="page-title">
                            <div className="title_left">
                                <h3>Form Validation</h3>
                            </div>

                            <div className="title_right">
                                <div className="col-md-5 col-sm-5 mb-3 float-end top_search">
                                    <div className="input-group search-bar-fix">
                                        <input type="text" className="form-control" placeholder="Search for..."/>
                                        <button className="btn btn-outline-secondary" type="button">
                                        <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h4>Form validation <small>sub title</small></h4>
                                        <ul className="nav navbar-right panel_toolbox">
                                            <li>
                                                <a className="collapse-link"><i className="fas fa-chevron-up"></i></a>
                                            </li>
                                            <li className="dropdown">
                                                <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false"><i className="fas fa-wrench"></i></a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" href="#">Settings 1</a>
                                                    <a className="dropdown-item" href="#">Settings 2</a>
                                                </div>
                                            </li>
                                            <li>
                                                <a className="btn-btn-close-link"><i className="fas fa-times"></i></a>
                                            </li>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="x_content">
                                        <div className="alert alert-info">
                                            <strong>Bootstrap 5 Form Validation</strong> - This form uses modern Bootstrap 5 validation with custom feedback messages and styles.
                                        </div>
                                        
                                        <form className="row g-3 needs-validation" noValidate>
                                            <div className="col-md-12">
                                                <h5 className="text-primary mb-3">Personal Information</h5>
                                            </div>
                                            
                                            {/* First Name */}
                                            <div className="col-md-6">
                                                <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="firstName" name="firstName" required minLength="2"/>
                                                <div className="valid-feedback">
                                                    Looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide a valid first name (minimum 2 characters).
                                                </div>
                                            </div>
                                            
                                            {/* Last Name */}
                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" id="lastName" name="lastName" required minLength="2"/>
                                                <div className="valid-feedback">
                                                    Looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide a valid last name (minimum 2 characters).
                                                </div>
                                            </div>
                                            
                                            {/* Email */}
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label">Email Address <span className="text-danger">*</span></label>
                                                <input type="email" className="form-control" id="email" name="email" required/>
                                                <div className="valid-feedback">
                                                    Email looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide a valid email address.
                                                </div>
                                            </div>
                                            
                                            {/* Phone */}
                                            <div className="col-md-6">
                                                <label htmlFor="phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
                                                <input type="tel" className="form-control" id="phone" name="phone" required pattern="[0-9\-\+\s\(\)]{8,20}"/>
                                                <div className="valid-feedback">
                                                    Phone number is valid!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide a valid phone number (8-20 characters).
                                                </div>
                                            </div>
                                            
                                            {/* Occupation */}
                                            <div className="col-md-6">
                                                <label htmlFor="occupation" className="form-label">Occupation</label>
                                                <input type="text" className="form-control" id="occupation" name="occupation" minLength="3"/>
                                                <div className="valid-feedback">
                                                    Great!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Occupation must be at least 3 characters long.
                                                </div>
                                            </div>
                                            
                                            {/* Age */}
                                            <div className="col-md-6">
                                                <label htmlFor="age" className="form-label">Age <span className="text-danger">*</span></label>
                                                <input type="number" className="form-control" id="age" name="age" required min="18" max="100"/>
                                                <div className="valid-feedback">
                                                    Age is valid!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide a valid age (18-100).
                                                </div>
                                            </div>
                                            
                                            {/* Date of Birth */}
                                            <div className="col-md-6">
                                                <label htmlFor="birthDate" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                                <input type="date" className="form-control" id="birthDate" name="birthDate" required/>
                                                <div className="valid-feedback">
                                                    Date looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide your date of birth.
                                                </div>
                                            </div>
                                            
                                            {/* Gender */}
                                            <div className="col-md-6">
                                                <label htmlFor="gender" className="form-label">Gender <span className="text-danger">*</span></label>
                                                <select defaultValue="" className="form-select" id="gender" name="gender" required>
                                                    <option disabled value="">Choose...</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                                <div className="valid-feedback">
                                                    Selection looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please select a gender.
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <h5 className="text-primary mb-3 mt-4">Security Information</h5>
                                            </div>
                                            
                                            {/* Password */}
                                            <div className="col-md-6">
                                                <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="password" className="form-control pe-5" id="password" name="password" required 
                                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}" 
                                                        title="Must contain at least 8 characters including uppercase, lowercase, number, and special character"/>
                                                    <button type="button" className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3" id="togglePassword">
                                                        <i className="fas fa-eye text-muted" id="passwordIcon"></i>
                                                    </button>
                                                </div>
                                                <div className="valid-feedback">
                                                    Strong password!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                                                </div>
                                            </div>
                                            
                                            {/* Confirm Password */}
                                            <div className="col-md-6">
                                                <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                                                <div className="position-relative">
                                                    <input type="password" className="form-control pe-5" id="confirmPassword" name="confirmPassword" required/>
                                                    <button type="button" className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3" id="toggleConfirmPassword">
                                                        <i className="fas fa-eye text-muted" id="confirmPasswordIcon"></i>
                                                    </button>
                                                </div>
                                                <div className="valid-feedback">
                                                    Passwords match!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Passwords do not match.
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <h5 className="text-primary mb-3 mt-4">Additional Information</h5>
                                            </div>
                                            
                                            {/* Message */}
                                            <div className="col-md-12">
                                                <label htmlFor="message" className="form-label">Message <span className="text-danger">*</span></label>
                                                <textarea className="form-control" id="message" name="message" rows="4" required minLength="10"></textarea>
                                                <div className="valid-feedback">
                                                    Message looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please provide a message (minimum 10 characters).
                                                </div>
                                            </div>
                                            
                                            {/* Terms and Conditions */}
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="agreeTerms" required/>
                                                    <label className="form-check-label" htmlFor="agreeTerms">
                                                        I agree to the <a href="#" className="text-decoration-none">Terms and Conditions</a> <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="invalid-feedback">
                                                        You must agree to the terms and conditions before submitting.
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Newsletter Subscription */}
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="newsletter"/>
                                                    <label className="form-check-label" htmlFor="newsletter">
                                                        Subscribe to our newsletter for updates
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            {/* Submit Buttons */}
                                            <div className="col-12">
                                                <hr className="my-4"/>
                                                <button className="btn btn-primary me-2" type="submit">
                                                    <i className="fas fa-check me-2"></i>Submit Form
                                                </button>
                                                <button className="btn btn-secondary" type="reset">
                                                    <i className="fas fa-undo me-2"></i>Reset Form
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div> 
            {/* /page content */}
    </div>
    )
}