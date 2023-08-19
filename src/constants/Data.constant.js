import AsyncStorage from "@react-native-async-storage/async-storage"


const mainUrl = 'http://asiangameclub.com/'

const base ={
    api: mainUrl +'frontapi/',
    imageBaseUrl: mainUrl+'home_image/',
    token:  AsyncStorage.getItem('token'),
}
const baseImages = {
    // logo: require('../asstes/images/logo.jpeg'),
}

export {
    mainUrl,
    base ,
    baseImages
    
}  
