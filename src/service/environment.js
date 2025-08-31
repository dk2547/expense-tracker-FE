import { getApiEndPoints } from "../api";
const environmentList ={
    STG: 'http://raspberrypi:9091',
    PROD : 'http://raspberrypi:9090',
}
const env = window._env_.REACT_APP_ENV
const endPoints = getApiEndPoints(environmentList[env]);

export const environment = {
    ...endPoints
}