import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
    Container,
    Form,
    Item,
    Button,
    Content
} from 'native-base'
import { Avatar } from "@rneui/themed";
import { Input} from '@rneui/themed';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options'

import propTypes from 'prop-types';
import { signUp } from '../action/auth';
import {connect} from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

const SignUp = ({signUp})=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instaUserName, setInstaUserName] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('data:image/jpeg;base64,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');
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    
    const chooseImage = async()=>{
        ImagePicker.showImagePicker(options, (response)=>{
            console.log('Response = ', response);
            if(response.didCancel){
                console.log('User cancelled image picker');
            }
            else if(response.error){
                console.log('Image Picker Error: ', response.error);
            }
            else if(response.customButton){
                console.log('User tapped custom button:', response.customButton);
            }
            else{
                console.log(response);
                uploadImage(response)
            }
        })
    }

    const uploadImage = async(response)=>{
        setImageUploading(true)
        const reference = storage().ref(response.fileName);
        const task = reference.putFile(response.path);
        task.on('state_changed', (taskSnapshot)=>{
            const percentage = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes)*1000;
            setUploadStatus(percentage);
        })

        task.then(async()=>{
            const url = await reference.getDownloadURL();
            setImage(url);
            setImageUploading(false);
        })
    }

    const doSignUp = async()=>{
        signUp({name, instaUserName, bio, country, email, password, image})
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={chooseImage}>
                    <Avatar
                        size={64}
                        rounded
                        source={image ? { uri: image} : {}}
                        containerStyle={{marginLeft:80, marginTop:20}}
                    />
                    </TouchableOpacity>
                </View>

                {imageUploading && (
                <ProgressBar progress={uploadStatus} style={styles.progress} />
                )}

              
                <View style={styles.formItem}>
               <Input
               placeholder="name"
               value={name}
               style={{color: '#eee'}}
               onChangeText={(text) => setName(text)} />

                <Input
                    placeholder="email"
                    value={email}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setEmail(text)}
                  />

                <Input
                    placeholder="password"
                    value={password}
                    secureTextEntry={true}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setPassword(text)}
                  />

                <Input
                    placeholder="Instagram user name"
                    value={instaUserName}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setInstaUserName(text)}
                  />

                <Input
                    placeholder="Your Short Bio"
                    value={bio}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setBio(text)}
                  />

                <Input
                    placeholder="country"
                    value={country}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setCountry(text)}
                  />

        <Button regular block onPress={doSignUp}>
                  <Text>SignUp</Text>
             </Button>
             </View>
            </ScrollView>
        </Container>
    
      );
    
    
}

const mapDispatchToProps = {
    signUp: (data)=>signUp(data)
}

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
      maxWidth: '100%'
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      marginBottom: 20,
      marginLeft: 60,
      width: 220,
    },
  });
export default connect(null, mapDispatchToProps)(SignUp)