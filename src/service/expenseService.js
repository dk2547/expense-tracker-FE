import axios from 'axios';
import {environment} from './environment'
const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
      // You can add custom headers here like auth tokens
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Example of a GET request
const fetchCategory = async () => {
    try {
      const response = await api.get(environment.GET_CATAGORY);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const saveExpense = async (payload) => {
    try {
      const response = await api.post(environment.EXPENSE,payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const getExpense = async () => {
    try {
      const response = await api.get(environment.EXPENSE);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await api.delete(`${environment.DELETE_EXPENSE}${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const editExpense = async (id,payload) => {
    try {
      const response = await api.put(`${environment.DELETE_EXPENSE}${id}`,payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


  export default {
    fetchCategory,saveExpense,getExpense,deleteExpense,editExpense
  };