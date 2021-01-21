import axiosInstance from "./../Axios/axiosInstance";
export const markAsUpdate = (id, communication) => {
console.log("markAsUpdate");
  axiosInstance
    .put(`api/mark_lead/${id}`, communication)
    .then((response) => {})
    .catch((err) => console.log(err));
};
