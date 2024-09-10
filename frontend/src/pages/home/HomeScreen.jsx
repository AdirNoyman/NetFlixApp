import { useAuthStore } from '../../store/authUserStore.js';

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <h1>HomeScreen</h1>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default HomeScreen;
