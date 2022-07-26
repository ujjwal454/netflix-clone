import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import Landing from "./component/Landing";
import UseRoute from "./component/UseRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/actions/action";
import auth from "./firebase-config";
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(setUser(user));
			} else {
				dispatch(setUser(null));
			}
		});
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<UseRoute exact path="/" component={Home}></UseRoute>
					<Route path="/landing" component={Landing}></Route>
					<Route>404 NOT FOUND</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
