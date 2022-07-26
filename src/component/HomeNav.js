import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutInitiate } from "../redux/actions/action";
const HomeNav = () => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const handleClick = () => {
		dispatch(logoutInitiate());
	};
	const [Show, setShow] = useState(false);
	const transitionNav = () => {
		if (window.scrollY > 90) {
			setShow(false);
		} else {
			setShow(true);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", transitionNav);
		return () => {
			window.removeEventListener("scroll", transitionNav);
		};
	});

	return (
		<div className={Show ? "nav" : "nav-fixed"}>
			<div className="container">
				<div className="brand">
					<img
						src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg"
						alt="netflix"
					/>
				</div>
				<div className="nav-btn">
					<img
						src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/2x/external-user-back-to-school-kmg-design-outline-color-kmg-design.png"
						alt=""
						onClick={handleClick}
						className="profile"
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeNav;
