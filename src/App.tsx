import AuthProvider from "./context/auth/AuthContext";
import { Home, Login, SignUp, Account } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/privateRoutes/privateRoute";
import ProtectedRoute from "./routes/protectedRoutes/protectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoute>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
