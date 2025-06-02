import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import styles from '../styles/Auth.module.css';
import { signin, signup } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Loader from '../components/common/Loader'; 


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate()

  const handleLoginSubmit = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signin(credentials);
      login({ token: data.token, userId: data.userId,role: data.role });
      toast.success("Logged in successfully!")
      if(data.role=="ROLE_ORGANIZER"){
        navigate('/organizer')
      }
      else{
        navigate('/')
      }
    } catch (err) {
      setError(err.message);
      toast.error("Login failed.")
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (userInfo) => {
    setLoading(true);
    setError(null);
    try {
      await signup(userInfo);
      setIsLogin(true);
      toast.success("Account created successfully!")
    } catch (err) {
      setError(err.message);
      toast.error("Signup failed.")
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.authContainer}>
        {loading && <Loader/>}
      <div className={styles.formsContainer}>
        <div className={`${styles.formsWrapper} ${!isLogin ? styles.slideSignup : ''}`}>
          <div className={`${styles.formSection} ${isLogin ? `${styles.activeForm} ${styles.loginMargin}` : styles.inactiveForm}`}>
            <LoginForm onSwitch={toggleForm} onSubmit={handleLoginSubmit} />
          </div>

          <div className={`${styles.formSection} ${!isLogin ? styles.activeForm : styles.inactiveForm} ${isLogin ? styles.hiddenForm : ''}`}>
            <SignupForm onSwitch={toggleForm} onSubmit={handleSignupSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
