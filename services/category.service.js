import baseAPI from '../lib/axios/baseAPI';

export async function getMenuCategory() {
  try {
    const response = await baseAPI.get('/api/MenuCategory');
    return response;
  } catch (error) {
    console.log('Get MenuCategory Service Error', error);
  }
}

export async function getMenuCategoryById(id) {
  try {
    const response = await baseAPI.get(`/api/MenuCategory/${id}?TotalRows=10`);
    return response;
  } catch (error) {
    console.log('Get MenuCategory Service Error', error);
  }
}

export async function postMenuCategory(payload) {
  try {
    const response = await baseAPI.post('/api/MenuCategory', payload);
    return response;
  } catch (error) {
    console.log('Post MenuCategory Service Error', error);
  }
}

export async function putMenuCategory(payload) {
  try {
    const response = await baseAPI.put('/api/MenuCategory', payload);
    return response;
  } catch (error) {
    console.log('Put MenuCategory Service Error', error);
  }
}

export async function deleteMenuCategory(id) {
  try {
    const response = await baseAPI.delete(`/api/MenuCategory/${id}`);
    return response;
  } catch (error) {
    console.log('Delete MenuCategory Service Error', error);
  }
}
