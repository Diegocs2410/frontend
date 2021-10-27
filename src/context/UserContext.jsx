import axios from 'axios';
import Swal from 'sweetalert2';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const initialState = {
  login: false,
  token: '',
  name: '',
  id: '',
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  // UseEffect, when aplication starts, verify if the user is logged
  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem('user'));
    initial ? initial.login && setUser(initial) : setUser(initialState);
  }, []);
  // Functions
  // ----------------------------------------------------------------
  const loginUser = async (user, history) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:4000/user/login', user);
      setIsLoading(false);
      // Now, capture the "ok" property and check if it's true'
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.token,
          name: data.name,
          id: data._id,
        };
        localStorage.setItem('user', JSON.stringify(userLogin));
        setUser(userLogin);
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        history.push('/notes');
      }
    } catch (error) {
      setIsLoading(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error LoginUser: ' + error.message);
    }
  };
  const registerUser = async (user, history) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:4000/user/register', user);
      setIsLoading(false);
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.token,
          name: data.name,
          id: data._id,
        };
        localStorage.setItem('user', JSON.stringify(userLogin));
        setUser(userLogin);
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        history.push('/notes');
      }
    } catch (error) {
      setIsLoading(false);
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error LoginUser: ' + error.message);
    }
  };
  const exit = () => {
    setUser(initialState);
    localStorage.removeItem('user');
  };
  const value = {
    user,
    loginUser,
    registerUser,
    exit,
    isLoading,
  };
  return <UserContext.Provider value={value} {...props} />;
};
// Export de function that handle useContext
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser error');
  }
  return context;
}
