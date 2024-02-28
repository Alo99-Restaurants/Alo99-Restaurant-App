import baseAPI from '../lib/axios/baseAPI';

export async function getCustomerInfoByIdService(id) {
  try {
    const response = await baseAPI.get(`/api/Customer/${id}`);
    return response;
  } catch (error) {
    console.log('Get Customer Info By Id Service Error', error);
    return error;
  }
}

export async function editCustomerInfoByIdService(id, payload) {
  try {
    const response = await baseAPI.put(`/api/Customer/${id}`, payload);
    return response;
  } catch (error) {
    console.log('Put Customer Info By Id Service Error', error);
    return error;
  }
}

