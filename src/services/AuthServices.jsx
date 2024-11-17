import AppConfig from '../core/config';

const fetchSignUp = async (info) => {
  const url = `${AppConfig.api_base_url}/user/sign-up`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  return response;
};

const fetchSignIn = async (username, password) => {
  const url = `${AppConfig.api_base_url}/user/sign-in`;

  const data = {
    grant_type: 'password',
    username,
    password,
    scope: null,
    client_id: null,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&'),
  });

  return response;
};

const fetchRefresh = async () => {
  const url = `${AppConfig.api_base_url}/user/refresh`;

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status === 401 || response.status === 422) {
    const retryResponse = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });

    return retryResponse;
  }
  return response;
};

const fetchSignOut = async () => {
  const url = `${AppConfig.api_base_url}/user/sign-out`;

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });

  return response;
};

const fetchFindId = async (info) => {
  const url = `${AppConfig.api_base_url}/user/find-id`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: info }),
  });

  return response;
};

const fetchFindPassword = async (info) => {
  const url = `${AppConfig.api_base_url}/user/check-id-and-phone`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  return response;
};

const fetchUpdatePassword = async (uid, newPassword) => {
  const url = `${AppConfig.api_base_url}/user/me/password`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ uid: uid, password: newPassword }),
  });

  return response;
};

export {
  fetchSignIn,
  fetchRefresh,
  fetchSignOut,
  fetchSignUp,
  fetchFindId,
  fetchFindPassword,
  fetchUpdatePassword,
};
