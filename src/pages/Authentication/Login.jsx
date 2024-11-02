import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Typography,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';

import { AuthContext } from '../../core/auth';
import { UserContext } from '../../core/user';

import { fetchSignIn } from '../../services/AuthServices';

const Login = () => {
  const navigate = useNavigate();

  const { authState, setAuthState } = useContext(AuthContext);
  const { userState, setUserState } = useContext(UserContext);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isError, setIsError] = useState(false);

  const onClickSignIn = async () => {
    if (validate()) {
      try {
        const response = await fetchSignIn(id, password);

        if (response.ok) {
          setUserState({ isLoading: true });

          await setAuthState({
            isAuthenticated: true,
            isLoading: false,
          });
          setPassword('');
          navigate('/home');
        } else if (response.status === 400) {
          setIsError(true);
          setAuthState({ ...authState, isLoading: false });
        } else {
          alert('Unknown error. Please try again later.');
          setAuthState({ ...authState, isLoading: false });
        }
      } catch (error) {
        alert('Network error. Please try again later.');
        setAuthState({ ...authState, isLoading: false });
      }
    }
  };
  const validate = () => {
    const isValidId = validateId();
    const isValidPassword = validatePassword();

    return isValidId && isValidPassword;
  };

  const validateId = () => {
    if (id.length === 0) {
      setIdError('Please enter your ID.');
      return false;
    }
    setIdError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError('Please enter your password.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col w-full items-center justify-center">
        <Typography
          className="pb-7"
          style={{ fontSize: '28px', fontWeight: '400' }}
        >
          Login
        </Typography>
      </div>
      <div className="grid items-center justify-center mb-5">
        <OutlinedInput
          id="filled-start-adornment"
          variant="standard"
          style={{
            border: '1px solid #000000',
            borderRadius: '20px',
            height: '40px',
          }}
          startAdornment={
            <InputAdornment position="start">ID | </InputAdornment>
          }
          fullWidth={true}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="grid items-center justify-center mb-5">
        <OutlinedInput
          id="filled-start-adornment"
          variant="standard"
          style={{
            border: '1px solid #000000',
            borderRadius: '20px',
            height: '40px',
          }}
          startAdornment={
            <InputAdornment position="start">PW | </InputAdornment>
          }
          fullWidth={true}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {isError && (
        <div className="flex w-full justify-center mb-5">
          <Typography color="error">
            아이디 혹은 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
          </Typography>
        </div>
      )}
      <div className="flex items-center justify-center mb-5">
        <Button
          tabIndex="submit"
          variant="contained"
          style={{
            backgroundColor: '#526C6F',
            color: 'white',
            fontSize: '20px',
            fontWeight: '700',
            width: '255px',
            height: '40px',
            borderRadius: '20px',
          }}
          onClick={onClickSignIn}
        >
          로그인
        </Button>
      </div>

      <div className="flex flex-row items-center justify-center">
        <Button
          color="primary"
          style={{
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontWeight: 'bold',
            color: '#000000',
          }}
          className="mr-10"
          onClick={() => navigate('/find-Id')}
        >
          아이디 찾기
        </Button>

        <Button
          color="primary"
          style={{
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontWeight: 'bold',
            color: '#000000',
          }}
          className="mx-10"
          onClick={() => navigate('/find-Password')}
        >
          비밀번호 찾기
        </Button>

        <Button
          color="primary"
          style={{
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontWeight: 'bold',
            color: '#000000',
          }}
          className="ml-10"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};
export default Login;
