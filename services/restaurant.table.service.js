import baseAPI from '../lib/axios/baseAPI';

// Floor tables
export async function getFloorTablesService(id_floor) {
  try {
    const response = await baseAPI.get(`/api/Table?RestaurantFloorId=${id_floor}`);
    return response;
  } catch (error) {
    console.error('Get Floor Tables Service Error', error);
  }
}

export async function getFloorTableDetailService(id_floor) {
  try {
    const response = await baseAPI.get(`/api/Table/${id_floor}`);
    return response;
  } catch (error) {
    console.error('Get Floor Table Detail Service Error', error);
  }
}
