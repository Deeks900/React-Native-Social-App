import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from "@rneui/themed";
import {
    Body,
    Button,
    Title,
    Text,
} from 'native-base';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';
import { Header } from '@rneui/base';

const CustomHeader = ({signOut, authState, navigation})=>{
    return (
        <>
        <Header
        backgroundColor='#0f4c75'
        leftComponent={
        <View style={{width:160, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:22, textAlign:'center', color:'white'}}>Banasthalites Social App</Text>
        </View>
    }
        rightComponent={authState.isAuthenticated && (
            <>
            <View style={styles.btn}>
                <View style={{marginHorizontal: 10}}>
                <Button
             onPress={()=> navigation.navigate('AddPost')}
             size="47"

             >
                <Text style={{color:"#fdcb9e"}}>Add Post</Text>
             </Button>
                </View>
            

             
              <Button onPress={()=>signOut()} size="47">
              <Icon
        name='logout'
        color='red'
        
        />
                </Button> 
             
            </View>
            
            </>
        )}
        >
            
        </Header>
        </>
    )
}



const mapStateToProps = (state)=>({
    authState: state.auth
})

const mapDispatchToProps = {
    // dispatching actions returned by action creators
    signOut
}

CustomHeader.propTypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired
}

const styles = StyleSheet.create({
    btn:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)