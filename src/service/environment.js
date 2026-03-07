import {getApiEndPoints} from '../api';
const environmentList = {
    STG: 'http://raspberrypi.local:9091',
    PROD: 'http://raspberrypi.local:9090',
};
const env = window._env_.REACT_APP_ENV;
// const env = process.env.REACT_APP_ENV;
const endPoints = getApiEndPoints(environmentList[env]);

export const environment = {
    ...endPoints,
};
