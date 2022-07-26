import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
import requests from "../Axios/Request";
const Banner = () => {
	const [Movie, setMovie] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
		}

		fetchData();
	}, []);

	return (
		<div
			className="banner-container"
			style={{
				backgroundImage: `url('https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}')`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="container">
				<h1>{Movie?.title || Movie?.origital_name || Movie?.name}</h1>
				<div className="btn-container">
					<button>play</button>
					<button>my list</button>
				</div>
				<p>{Movie?.overview}</p>
			</div>
			<div className="banner__fade"></div>
		</div>
	);
};

export default Banner;
