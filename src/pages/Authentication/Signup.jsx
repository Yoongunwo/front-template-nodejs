import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, TextField, Typography } from '@mui/material';

import { fetchSignUp } from '../../services/AuthServices';

const Signup = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onclickSignup = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    let singupInfo = {
      id: id,
      password: password,
      is_admin: false,
    };

    fetchSignUp(singupInfo).then((response) => {
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      } else {
        alert('회원가입에 실패하였습니다.');
      }
    });
  };
  return (
    <div className="flex w-full">
      <div className="flex w-full items-center justify-center flex-col">
        <div className="flex items-center justify-center flex-col pb-6">
          <div className="flex w-full flex-row pb-2">
            <Typography fontWeight="400" fontSize="24px">
              아이디 *
            </Typography>

            <div className="grow"></div>
            <Typography color="#191FBF">
              영문자, 숫자만 입력가능. 최소 3자이상 입력하세요.
            </Typography>
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={id}
            style={{ width: '545px' }}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center flex-col pb-6">
          <div className="flex w-full flex-row pb-2">
            <Typography fontWeight="400" fontSize="24px">
              비밀번호 *
            </Typography>
            <div className="grow"></div>
            <Typography color="#191FBF">
              8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
            </Typography>
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={password}
            type="password"
            style={{ width: '545px' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center flex-col pb-6">
          <div className="flex w-full flex-row pb-2">
            <Typography fontWeight="400" fontSize="24px">
              비밀번호 확인 *
            </Typography>
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={passwordConfirm}
            type="password"
            style={{ width: '545px' }}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center flex-col pb-6">
          <div className="flex w-full">
            <div className="grow" />
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: '#526C6F',
                color: 'white',
                fontSize: '20px',
                fontWeight: '700',

                borderRadius: '20px',
              }}
              onClick={onclickSignup}
            >
              가입하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
