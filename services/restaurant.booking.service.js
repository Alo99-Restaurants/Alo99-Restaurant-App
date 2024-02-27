import { buildQueryString } from '../helper';
import baseAPI from '../lib/axios/baseAPI';

export async function getBookingService(payload) {
  try {
    const queryString = buildQueryString(payload);
    const response = await baseAPI.get(`/api/Booking/${queryString}`);
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

export async function checkTablesBookingService(payload) {
  try {
    const response = await baseAPI.post('/api/Table/find', payload);
    return response;
  } catch (error) {
    console.log('Get Table Booking Service Error', error);
  }
}

export async function getBookingDetailByIdService(id) {
  try {
    const response = await baseAPI.get(`/api/Booking/${id}`);
    return response;
  } catch (error) {
    console.log('Get Booking Detail By Id Service Error', error);
  }
}

export async function createBookingOrderService(payload) {
  try {
    const response = await baseAPI.post(
      '/api/BookingMenu/CreatesOrUpdatesBookingMenu',
      payload
    );
    return response;
  } catch (error) {
    console.log('Post Booking Order Service Error', error);
  }
}

export async function getBookingMenuService(payload) {
  try {
    const queryString = buildQueryString(payload);
    const response = await baseAPI.get(`/api/BookingMenu/${queryString}`);
    return response;
  } catch (error) {
    console.log('Get Booking Menu Service Error', error);
  }
}