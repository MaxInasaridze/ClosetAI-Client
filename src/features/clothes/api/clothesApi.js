import API from "../../shared/api/axios";

export const getAllClothes = async () => {
  const response = await API.get("/clothes");
  return response.data;
};

export const getSingleClothes = async (id) => {
  const response = await API.get(`/clothes/${id}`);
  return response.data;
};

export const createClothes = async (data) => {
  const response = await API.post("/clothes", data);
  return response.data;
};

export const updateClothes = async (id, data) => {
  const response = await API.put(
    `/clothes/${id}`,
    data
  );

  return response.data;
};

export const deleteClothes = async (id) => {
  const response = await API.delete(
    `/clothes/${id}`
  );

  return response.data;
};