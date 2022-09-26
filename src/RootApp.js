import React from "react";
import store from './store';
import {Provider} from 'react-redux';
import { NativeBaseProvider} from "native-base";
import App from './App'

const RootApp = ()=>{
    return(
        <NativeBaseProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </NativeBaseProvider>
        
    )
}

export default RootApp;