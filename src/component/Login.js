import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginInitiate, registerInitiate } from "../redux/actions/action";
const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const handleClick = () => {
		if (Email === "" || Password === "") {
			alert("please fill all the input fields with valid values");
		} else {
			dispatch(registerInitiate(Email, Password));
			setEmail("");
			setPassword("");
		}
	};
	const handleLogin = (e) => {
		e.preventDefault();
		if (Email === "" || Password === "") {
			alert("please fill all the input fields with valid values");
		} else {
			dispatch(loginInitiate(Email, Password));
			setEmail("");
			setPassword("");
		}
	};
	const { currentUser } = useSelector((state) => state.user);
	useEffect(() => {
		if (currentUser) {
			history.push("/");
			console.log("hi");
		}
	}, [currentUser, history]);

	return (
		<div className="login-container">
			<form action="">
				<h1>Login</h1>
				<input
					type="email"
					placeholder="email"
					value={Email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<input
					type="password"
					placeholder="Password"
					value={Password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<button className="btn btn-primary width-100" onClick={handleLogin}>
					Login
				</button>
				<p onClick={handleClick}>Dont have an account? SignUp</p>
			</form>
		</div>
	);
};

export default Login;
