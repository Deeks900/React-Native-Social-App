//Action Creators
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import Snackbar from 'react-native-snackbar'

export const signUp = (data)=>async(dispatch)=>{
    console.log(data);
    const {name, instaUserName, bio, email, password, country, image} = data;

    auth().createUserWithEmailAndPassword(email, password)
    .then((data)=>{
        console.log(data);
        console.log("User creation was success");
        database()
        .ref('/users/'+data.user.uid)
        .set({
            name,
            instaUserName,
            country,
            image,
            bio, 
            uid:data.user.uid
        })
        .then(()=>{
            console.log('Data set success');
            Snackbar.show({
                text:"account created",
                textColor: "white",
                backgroundColor: "#1b262c"
            })
        })
    })
    .catch((error)=>{
        console.log(error);
        Snackbar.show({
            text: "Signup Failed",
            textColor: "white",
            backgroundColor: "red"
        })
    })
}

export const signIn = (data)=>async(dispatch)=>{
    console.log(data);
    const {email, password} = data;

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=>{
        console.log("Sign In success");
        Snackbar.show({
            text: "Account sign In",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
    })
    .catch((error)=>{
        console.log(error);
        Snackbar.show({
            text: "Sign In failed",
            textColor: "white",
            backgroundColor: "red"
        })
    })
}

export const signOut = ()=>async(dispatch)=>{
    auth()
    .signOut()
    .then(()=>{
        Snackbar.show({
            text: "SignOut Success",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
    })
    .catch((error)=>{
        console.log(error);
        Snackbar.show({
            text: "SignOut Failed",
            textColor: "white",
            backgroundColor: "red"
        })
    })
}