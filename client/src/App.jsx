import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { Provider } from 'react-redux';
import Store from './Store';
import { loadUser } from './actions/auth';
import { useEffect } from 'react';
import store from './Store';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivaterRoute from './components/routing/PrivaterRoute';
// import PrivaterRoute from './components/routing/PrivaterRoute';
if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(()=>{
  
      store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  return (
    <>
      <Navbar />
      <div className={isHomeRoute ? 'landing' : 'container'}>
        <Alert />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<PrivaterRoute component={Dashboard}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;