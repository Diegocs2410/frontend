import { useState } from 'react';
import { useHistory } from 'react-router';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';

export const Register = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const { isLoading, registerUser } = useUser();

  const register = (e) => {
    e.preventDefault();
    registerUser(userData, history);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='container'>
          <div className='d-grid  align-content-center min-vh-100 justify-content-center'>
            <form onSubmit={register}>
              <div className='card p-5 shadow border-5 bg-gradient'>
                <i className='fas fa-user text-center fa-3x '></i>
                <h3 className='text-center fw-bold fs-1 mb-5'>Register</h3>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    placeholder='ex: Pepito Perez'
                    autoFocus
                    required
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    value={userData.name}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Username / Email
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    placeholder='email@email.com'
                    autoFocus
                    required
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    value={userData.email}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='password'
                    placeholder='******'
                    required
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    value={userData.password}
                  />
                </div>
                <button className='btn btn-primary boton ' type='submit'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
