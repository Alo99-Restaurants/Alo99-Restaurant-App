import baseAPI from '../lib/axios/baseAPI';

export async function createPayment(payload) {
  try {
    const response = await baseAPI.post('/api/Payment/create-payment', payload);
    return response;
  } catch (error) {
    console.log('Post Payment Service Error', error);
  }
}
