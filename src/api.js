import axios from 'axios';

export const getApiEndPoints = (hostURL='')=>{
    return {
        GET_CATAGORY: `${hostURL}/expense/category`,
        EXPENSE: `${hostURL}/expense`,
        DELETE_EXPENSE: `${hostURL}/expense/`,
    }
}