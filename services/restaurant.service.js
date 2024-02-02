import baseAPI from '../lib/axios/baseAPI';

export async function getRestaurantService() {
  try {
    const response = await baseAPI.get('/api/Restaurant');
    return response;
  } catch (error) {
    console.error('Get Restaurant Service Error', error);
  }
}

export async function getRestaurantByIdService(id) {
  try {
    const response = await baseAPI.get(`/api/Restaurant/${id}`);
    return response;
  } catch (error) {
    console.error('Get Restaurant Service Error', error);
  }
}

export async function updateRestaurantService(id, payload) {
  try {
    if (id) {
      const response = await baseAPI.put(`/api/Restaurant/${id}`, payload);
      return response;
    }
    throw new Error(`Invalid ID: ${id}`);
  } catch (error) {
    console.error('Update Restaurant Service Error', error);
  }
}

export async function deleteRestaurantService(id) {
  try {
    if (id) {
      const response = await baseAPI.put(`/api/Restaurant/${id}`);
      return response;
    }
    throw new Error(`Invalid ID: ${id}`);
  } catch (error) {
    console.error('Delete Restaurant Service Error', error);
  }
}

// Restaurant images
export async function getRestaurantImageByIdService(id) {
  try {
    const response = await baseAPI.get(
      `/api/RestaurantImage/?RestaurantId=${id}`
    );
    return response;
  } catch (error) {
    console.error('Get Restaurant Image Service Error', error);
  }
}

export async function postRestaurantImageByIdService(
  id,
  imgURL,
  description = ''
) {
  try {
    if (!imgURL || !id) {
      return false;
    }

    let name = '';
    const regex = /\/([^\/]+)$/;
    const match = imgURL.match(regex);
    if (match) {
      name = match[1];
    }

    const payload = {
      name,
      description,
      url: imgURL,
      restaurantId: id
    };

    const response = await baseAPI.post(`/api/RestaurantImage`, payload);
    return response;
  } catch (error) {
    console.error('Post Restaurant Image Service Error', error);
  }
}

export async function deleteRestaurantImageByIdService(id) {
  try {
    const response = await baseAPI.delete(`/api/RestaurantImage/${id}`);
    return response;
  } catch (error) {
    console.error('Delete Restaurant Image Service Error', error);
  }
}

// Restaurant floor service
export async function getRestaurantFloorsService(id) {
  try {
    const response = await baseAPI.get(
      `/api/RestaurantFloor?RestaurantId=${id}`
    );
    return response;
  } catch (error) {
    console.error('Get Restaurant Floors Service Error', error);
  }
}

export async function postRestaurantFloorsService(payload) {
  try {
    const response = await baseAPI.post('/api/RestaurantFloor', payload);
    return response;
  } catch (error) {
    console.error('Post Restaurant Floors Service Error', error);
  }
}

export async function getRestaurantFloorByIdService(id) {
  try {
    const response = await baseAPI.get(`/api/RestaurantFloor/${id}`);
    return response;
  } catch (error) {
    console.error('Get Restaurant Floor Detail Service Error', error);
  }
}

export async function updateRestaurantFloorByIdService(id, payload) {
  try {
    const response = await baseAPI.put(`/api/RestaurantFloor/${id}`, payload);
    return response;
  } catch (error) {
    console.error('Update Restaurant Floor Detail Service Error', error);
  }
}

export async function deleteRestaurantFloorByIdService(id) {
  try {
    const response = await baseAPI.delete(`/api/RestaurantFloor/${id}`);
    return response;
  } catch (error) {
    console.error('Delete Restaurant Floor Detail Service Error', error);
  }
}
