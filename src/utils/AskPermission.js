import { PermissionsAndroid, ToastAndroid } from "react-native";

export const requestPermission = async()=>{
    try{
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        console.log("Hello", granted);
        if(granted[' PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE'] === 'denied' || granted['PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORGAE'] === 'denied'){
            ToastAndroid.show('We cannot proceed without permissions', ToastAndroid.LONG);
            requestPermission();
        }
    }
    catch(error){
        console.log("Hi", error);
    }
}