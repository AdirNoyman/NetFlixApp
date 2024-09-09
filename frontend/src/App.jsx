import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/home/HomePage';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUserStore';
import { useEffect } from 'react';

function App() {

  const { user, isCheckingUserAuth, authCheck } = useAuthStore();  

  useEffect(() => {

    authCheck();
    console.log(`User: ${user}, isCheckingUserAuth: ${isCheckingUserAuth} 😎🤘`);

  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <Footer />
    <Toaster />
    </>
  );
}

export default App;
