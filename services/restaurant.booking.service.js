import baseAPI from '../lib/axios/baseAPI';

export async function getBooking() {
  try {
    const response = await baseAPI.get('/api/Booking');
    return response;
  } catch (error) {
    console.log('Get Booking Service Error', error);
  }
}
