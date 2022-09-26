import React, {useState} from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import {Container, View, Button} from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Input} from '@rneui/themed';
import { signIn } from '../action/auth';
import { connect, Connect } from 'react-redux';
import propTypes from 'prop-types';
import Welcome from '../assets/undraw_welcome_cats_thqn.png'
import { Link } from '@react-navigation/native';

const SignIn = ({signIn, navigation})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doSignIn = ()=>{
        signIn({email, password})
    }
    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{marginLeft:60}}>
                <Text style={styles.heading}>Welcome to Banasthalites Social App</Text> 

                <Image
                source={Welcome}
                style={{width: null, height: 150, marginTop: 30}}
                resizeMode="contain"
                />

                <View style={styles.formItem}>
                    <Input
                    placeholder="Your registered email"
                    value={email}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setEmail(text)}
            />

            <Input
              placeholder="Your registered password"
              value={password}
              secureTextEntry={true}
              style={{color: '#eee'}}
              onChangeText={(text) => setPassword(text)}
            />

            <Button block onPress={doSignIn}>
                <Text>SignIn</Text>
            </Button>

            <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}
            style={{marginTop: 10}}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Do not have an account,
              <Link to={{screen:'SignUp'}}><Text style={{textDecorationLine:'underline', fontWeight:'400'}}> SignUp </Text></Link>
               
            </Text>   
            </TouchableOpacity>
                </View>
            </ScrollView>
        </Container>
    )
}

const mapDispatchToProps = {
    signIn: (data)=> signIn(data)
}

SignIn.propTypes={
    signIn: propTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
      maxWidth: '100%',
    },
    heading: {
      textAlign: 'center',
      color: '#fdcb9e',
      marginHorizontal: 5,
      marginTop: 30,
    },
    formItem: {
      marginBottom: 20,
    },
  });
  
export default connect(null, mapDispatchToProps)(SignIn)