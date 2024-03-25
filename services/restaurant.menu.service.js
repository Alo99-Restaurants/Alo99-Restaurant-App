import baseAPI from '../lib/axios/baseAPI';

export async function getRestaurantMenu() {
  try {
    const response = await baseAPI.get('/api/RestaurantMenu?TotalRows=50');
    return response;
  } catch (error) {
    console.log('Get RestaurantMenu Service Error', error);
  }
}

export async function postRestaurantMenu(payload) {
  try {
    const response = await baseAPI.post('/api/RestaurantMenu', payload);
    return response;
  } catch (error) {
    console.log('Post RestaurantMenu Service Error', error);
  }
}

export async function putRestaurantMenu(id, payload) {
  try {
    const response = await baseAPI.put(`/api/RestaurantMenu/${id}`, payload);
    return response;
  } catch (error) {
    console.log('Put RestaurantMenu Service Error', error);
  }
}

export async function deleteRestaurantMenu(id) {
  try {
    const response = await baseAPI.delete(`/api/RestaurantMenu/${id}`);
    return response;
  } catch (error) {
    console.log('Delete RestaurantMenu Service Error', error);
  }
}
