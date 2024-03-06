import { buildQueryString } from '../helper';
import baseAPI from '../lib/axios/baseAPI';

export async function createPaymentService(payload) {
  try {
    const response = await baseAPI.post('/api/Payment/create-payment', payload);
    return response;
  } catch (error) {
    console.log('Post Payment Service Error', error);
  }
}

export async function getStatusVNPay(payload) {
  try {
    const queryString = buildQueryString(payload)
    const response = await baseAPI.get(`/api/Payment/ipn${queryString}`);
    return response;
  } catch (error) {
    console.log('Get Payment Status VNPay Service Error', error);
  }
}