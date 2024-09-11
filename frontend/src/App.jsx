import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/home/HomePage';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUserStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {
  const { user, isCheckingUserAuth, authCheck } = useAuthStore();

  console.log(`User: ${user}, isCheckingUserAuth: ${isCheckingUserAuth} 😎🤘`);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingUserAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={'/'} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={'/'} />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
