import baseAPI from '../lib/axios/baseAPI';

export async function getCustomerInfoById(id) {
  try {
    const response = await baseAPI.get(`/api/Customer/${id}`);
    return response;
  } catch (error) {
    console.log('Get Customer Info By Id Service Error', error);
    return error;
  }
}
