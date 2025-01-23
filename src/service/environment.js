import { getApiEndPoints } from "../api";
const environmentList ={
    STG: 'https://expense-tracker-backend-stage.onrender.com',
    PROD : 'https://expense-tracker-backend-po7m.onrender.com',
}
const env = process.env.REACT_APP_ENV
const endPoints = getApiEndPoints(environmentList[env]);

export const environment = {
    ...endPoints
}