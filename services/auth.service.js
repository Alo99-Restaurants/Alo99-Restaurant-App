import baseAPI from '../lib/axios/baseAPI';

export async function registerService(payload) {
  try {
    const response = await baseAPI.post('/api/User/register', payload);
    return response;
  } catch (error) {
    console.log('Register Service error', error);
    return error;
  }
}

export async function login(payload) {
  try {
    const response = await baseAPI.post('/api/User/login', payload);
    return response;
  } catch (error) {
    console.log('Login error', error);
    return error;
  }
}

export async function loginWithGG(googleAccessToken) {
  try {
    const response = await baseAPI.get(
      `/api/User/google-auth-token?accessToken=${googleAccessToken}`);
    return response;
  } catch (error) {
    console.log('Login error', error);
    return error;
  }
}

export async function logout(payload) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  } catch (error) {
    return error;
  }
}

export async function resetPasswordRequest(email) {
  try {
    const response = await baseAPI.post(`/api/User/reset-password-request`, {
      email: email,
      clientUrl: 'https://booking-api.vietmap.io/api/User/reset-password'
    });
    return response;
  } catch (error) {
    console.log('POST request reset password error', error);
    return error;
  }
}

export async function requestConfirmEmail(email) {
  try {
    const response = await baseAPI.post(`/api/Customer/confirm-email-request`, {
      email: email,
      clientUrl: 'https://booking-api.vietmap.io/api/Customer/confirm-email'
    });
    return response;
  } catch (error) {
    console.log('POST request confirm email error', error);
    return error;
  }
}