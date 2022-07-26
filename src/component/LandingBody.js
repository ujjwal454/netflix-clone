import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import Login from "./Login";
const LandingBody = () => {
	const [isActive, setisActive] = useState(false);
	const handleCLick = (e) => {
		e.preventDefault();
		setisActive(!isActive);
	};
	return (
		<>
			{!isActive ? (
				<div className="landing-body-container">
					<h1>
						Unlimited movies, TV <br /> shows and more.
					</h1>
					<h2>Watch anywhere. Cancel anytime.</h2>
					<p>
						Ready to watch? Enter your email to create or restart your
						membership.
					</p>
					<form className="landing-form">
						<input
							type="text"
							placeholder="Email Address"
							className="landing-input"
						/>
						<button className="btn btn-secondary" onClick={handleCLick}>
							Get Started <AiOutlineRight className="right" />
						</button>
					</form>
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

export default LandingBody;
