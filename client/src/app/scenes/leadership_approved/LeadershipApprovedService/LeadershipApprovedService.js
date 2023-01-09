import axios from "axios";
const jsonAPI = "http://localhost:3000";

export const getListDataEmployees = () => {
    return axios.get(jsonAPI + "/listDataEmployees");
};