import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './landing-page/landing-page.scss'
import Signup from "./authentication-module/components/Signup";
import Dashboard from "./authentication-module/components/Dashboard";
import Login from "./authentication-module/components/Login"
import PrivateRoute from "./authentication-module/components/PrivateRoute";
import ForgotPassword from "./authentication-module/components/ForgotPassword";
import UpdateProfile from "./authentication-module/components/UpdateProfile";
import DatabaseLogin from "./authentication-module/components/DatabaseCheck";
import {AuthProvider} from './authentication-module/context/AuthContext'
import LandingPage from "./landing-page/LandingPage";
import DatabaseProvider from "./products/context/DatabaseContext";

function App() {
  return (
      <div className="App">
        <Router>
          <DatabaseProvider>
            <AuthProvider>
              <Routes>
                <Route path="*" element={<LandingPage />} />
                <Route path="/loading" element={<DatabaseLogin />} />
                <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </DatabaseProvider>
        </Router>
      </div>
  );
}

export default App;
