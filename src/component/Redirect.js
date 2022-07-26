import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
const Redirect = () => {
	const history = useHistory();
	const [Count, setCount] = useState(5);
	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 1000);
		Count === 0 && history.push("/landing");
		return () => clearInterval(interval);
	}, [Count, history]);
	return <p>Redirecting to login page in {Count}</p>;
};

export default Redirect;
