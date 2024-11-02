import AppConfig from '../core/config';

import { fetchRefresh } from './AuthServices';

const fetchMe = async () => {
  const url = `${AppConfig.api_base_url}/user/me`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  });

  if (response.status === 401 || response.status === 422) {
    const refreshResponse = await fetchRefresh();

    if (refreshResponse.status === 200) {
      const retryResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      return retryResponse;
    }
  }

  return response;
};

const fetchUpdateMe = async (userInfo) => {
  const url = `${AppConfig.api_base_url}/user/me`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userInfo),
  });

  if (response.status === 401 || response.status === 422) {
    const refreshResponse = await fetchRefresh();

    if (refreshResponse.status === 200) {
      const retryResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
      });

      return retryResponse;
    }
  }
  return response;
};

const fetchUpdatePasswordMe = async (password) => {
  const url = `${AppConfig.api_base_url}/user/me/password`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(password),
  });

  if (response.status === 401 || response.status === 422) {
    const refreshResponse = await fetchRefresh();

    if (refreshResponse.status === 200) {
      const retryResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(password),
      });

      return retryResponse;
    }
  }
  return response;
};

export { fetchMe, fetchUpdateMe, fetchUpdatePasswordMe };
