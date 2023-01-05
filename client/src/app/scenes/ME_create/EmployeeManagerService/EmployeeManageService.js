import axios from "axios";
const jsonAPI = "http://localhost:3000";

export const getListDataEmployees = () => {
  return axios.get(jsonAPI + "/listDataEmployees");
};
export const addEmployee = (obj) => {
  return axios.post(jsonAPI + "/listDataEmployees", obj);
};
export const editEmployee = (obj) => {
  return axios.put(jsonAPI + "/listDataEmployees/" + obj.id, obj);
};
export const deleteEmployee = (obj) => {
  return axios.delete(jsonAPI + "/listDataEmployees/" + obj.id);
};
//
export const getTeam = () => {
  return axios.get(jsonAPI + "/Team");
};
export const getGender = () => {
  return axios.get(jsonAPI + "/Gender");
};
export const getPosition = () => {
  return axios.get(jsonAPI + "/Position");
};
export const getDergeeField = () => {
  return axios.get(jsonAPI + "/DergeeField");
};
export const getRelated = () => {
  return axios.get(jsonAPI + "/Related");
};
