import baseAPI from '../lib/axios/baseAPI';

const mockUser = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
};

const mockSuccessResponse = {
  status: 200,
  data: {
    success: true,
    message: 'Đăng nhập thành công',
    user: mockUser,
  },
};

function myPromiseFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockSuccessResponse);
    }, 1000);
  });
}

export async function login(payload) {
  try {
    // const response = await baseAPI.post('/api/v1/user/list/', payload);
    // return response;

    const response = await myPromiseFunction();
    return response.data;
  } catch (error) {
    return error;
  }
}
