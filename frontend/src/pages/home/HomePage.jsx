import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import {useAuthStore} from '../../store/authUserStore.js';

const HomePage = () => {
  const {user} = useAuthStore();
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
