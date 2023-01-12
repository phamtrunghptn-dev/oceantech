import axios from "axios";
const jsonAPI = "http://localhost:3000";

export const getListDataEmployees = () => {
    return axios.get(jsonAPI + "/listDataEmployees");
};
export const editEmployee = (obj) => {
    return axios.put(jsonAPI + "/listDataEmployees/" + obj.id, obj);
  };