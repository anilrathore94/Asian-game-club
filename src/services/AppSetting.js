import * as opsService from './Ops'
import * as dataConstants from '../constants/Data.constant'
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiCall = async (url, request) => {
    try {
        let token = await AsyncStorage.getItem('token')
        let result = await opsService.postData(dataConstants.base.api + url, request, token);
        return result;
    } catch (e) {
        return { status: false, data: {}, message: e.message }
    }
},
    apiImageUpload = async (url, request) => {
        try {
            const contentType = "multipart/form-data"
            let token = await AsyncStorage.getItem('token')
            let result = await opsService.postDataContent(dataConstants.base.api + url, request, token, contentType);
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.message }
        }
    },
    get_url = async (url) => {
        try {
            let result = await opsService.getData(dataConstants.base.api + url);
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.message };
        }
    }
  
export {
    apiCall,
    apiImageUpload,
    get_url

}