import baseAPI from '../lib/axios/baseAPI';

const mockUser = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDAzOTU5My1iNjQyLTQwMDEtYTY5Yy1jMTVlYzRhZjg0Y2EiLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiIiwibmFtZSI6IiIsImp0aSI6Ijg2NTY5MjAwLTE5NTctNDJmZS04NTE3LTQ0N2JkNThlZjI1YSIsImlhdCI6MTcwMjQ4NDM5MSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ3VzdG9tZXIiLCJleHAiOjE3MDI0ODc5OTEsImlzcyI6IkFsbzk5IiwiYXVkIjoiUmVzdGF1cmFudCJ9.ZZXHrWzX8EJ8DgGWrKL1PRmicftthCMszP5TuKeoO-k'
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
