import baseAPI from '../lib/axios/baseAPI';

export async function getBookingService() {
  try {
    const response = await baseAPI.get('/api/Booking');
    return response;
  } catch (error) {
    console.log('Get Booking Service Error', error);
  }
}

export async function createBookingService(payload) {
  try {
    const response = await baseAPI.post('/api/Booking', payload);
    return response;
  } catch (error) {
    console.log('Post Booking Service Error', error);
  }
}
