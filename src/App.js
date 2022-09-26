import React, {useEffect} from 'react';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {connect, useDispatch} from 'react-redux';

import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import CustomHeader from './layout/CustomHeader';

import { SET_USER, IS_AUTHENTICATED } from './action/action.types';
import database from '@react-native-firebase/database';
import EmptyContainer from './components/EmptyContainer';
import {requestPermission} from './utils/AskPermission'

const Stack = createNativeStackNavigator();

const App = ({authState})=>{
  const dispatch = useDispatch();

  const onAuthStateChanged = (user)=>{
    if(user){
      dispatch({
        type: 'IS_AUTHENTICATED',
        payload: true
      })
      // console.log("Hey I am setting the user", user._user.uid);
      database()
      .ref(`/users/${user._user.uid}`)
      .on('value', (snapshot)=>{
        // console.log('USER DETAILS', snapshot.val());
        dispatch({
          type: 'SET_USER',
          payload: snapshot.val(),
        })
      })
    }
    else{
      dispatch({
        type: 'IS_AUTHENTICATED',
        payload: false
      })
    }
  }

  useEffect(()=>{
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, []);

 if(authState.loading){
  return <EmptyContainer />
 }

  return(
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: (props)=> <CustomHeader {...props}/>
      }}>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="AddPost" component={AddPost}/>
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

const mapStateToProps = (state)=>{
  return {authState: state.auth};
}

export default connect(mapStateToProps)(App);
