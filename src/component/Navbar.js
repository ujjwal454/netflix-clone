import React from "react";

const Navbar = () => {
	return (
		<div className="nav container">
			<div className="brand">
				<img
					src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg"
					alt="netflix"
				/>
			</div>
			<div className="nav-btn">
				<button className="btn btn-primary">Sign Up</button>
			</div>
		</div>
	);
};

export default Navbar;
