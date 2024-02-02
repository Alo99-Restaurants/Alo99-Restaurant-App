import baseAPI from '../lib/axios/baseAPI';

export async function login(payload) {
  try {
    const response = await baseAPI.post('/api/User/login', payload);
    return response;
  } catch (error) {
    console.log('response error', error);
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
