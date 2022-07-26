import React from "react";
import LandingBody from "./LandingBody";
import Navbar from "./Navbar";

const Landing = () => {
	return (
		<div className="landing-container">
			<Navbar />
			<div className="landing-body">
				<LandingBody />
			</div>
		</div>
	);
};

export default Landing;
