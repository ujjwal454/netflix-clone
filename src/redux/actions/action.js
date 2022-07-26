import * as types from "../constants/Types";
import auth from "../../firebase-config";

export const registerStart = () => {
	return {
		type: types.REGISTER_START,
	};
};

export const registerFail = (err) => {
	return {
		type: types.REGISTER_FAIL,
		payload: err,
	};
};
export const registerSuccess = (user) => {
	return {
		type: types.REGISTER_SUCCESS,
		payload: user,
	};
};
export const loginStart = () => {
	return {
		type: types.LOGIN_START,
	};
};

export const loginFail = (err) => {
	return {
		type: types.LOGIN_FAIL,
		payload: err,
	};
};
export const logoutSuccess = () => {
	return {
		type: types.LOGIN_SUCCESS,
	};
};
export const logoutStart = () => {
	return {
		type: types.LOGIN_START,
	};
};

export const logoutFail = (err) => {
	return {
		type: types.LOGIN_FAIL,
		payload: err,
	};
};

export const loginSuccess = (user) => {
	return {
		type: types.LOGIN_SUCCESS,
		payload: user,
	};
};

export const setUser = (User) => {
	return {
		type: types.SET_USER,
		payload: User,
	};
};
export const registerInitiate = (email, password) => {
	return function (dispatch) {
		dispatch(registerStart());
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(registerSuccess(user));
			})
			.catch((err) => {
				dispatch(registerFail(err));
			});
	};
};

export const loginInitiate = (email, password) => {
	return function (dispatch) {
		dispatch(loginStart());
		auth
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(loginSuccess(user));
			})
			.catch((err) => {
				dispatch(loginFail(err));
			});
	};
};

export const logoutInitiate = () => {
	return function (dispatch) {
		dispatch(logoutStart());
		auth
			.signOut()
			.then((res) => {
				dispatch(logoutSuccess());
			})
			.catch((err) => {
				dispatch(logoutFail(err));
			});
	};
};
