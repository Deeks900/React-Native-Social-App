import React, {useState} from 'react';
import { StyleSheet, Text,TouchableOpacity, ScrollView, View, Image } from 'react-native';
import Snackbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';
import {Container, TextArea} from 'native-base';
import { Button } from "@rneui/themed";
import { Input} from '@rneui/themed';
import { Icon } from "@rneui/themed";
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'
import * as ImagePicker from "react-native-image-picker"
import {options} from '../utils/options';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import shortid from 'shortid';


 const AddPost = ({navigation, userState})=>{
  // console.log("USERSTATE", userState);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)

    const chooseImage = async()=>{
        await ImagePicker.launchImageLibrary(options, (response)=>{
            // console.log('Response = ', response);
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
        const reference = storage().ref(response.assets[0].fileName);
        const task = reference.putFile(response.assets[0].uri);
        task.on('state_changed', (taskSnapshot)=>{
            const percentage = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes)*1000;
            console.log("i am the", percentage);
            setUploadStatus(percentage);
        })

        task.then(async()=>{
            const url = await reference.getDownloadURL();
            setImage(url);
            console.log("I am working", url);
            setImageUploading(false);
        })
    }

    const addPost = async()=>{
        try{
          if(!location || !description || !image){
            return Snackbar.show({
              text: "Please add all fields",
              textColor: "white",
              backgroundColor: "red"
            })
          }

          const uid = shortid.generate()
          await database().ref(`/posts/${uid}`).set({
            location,
            description,
            picture: image,
            by:userState.name,
            date: Date.now(),
            instaId:userState.instaUserName,
            userImage: userState.image,
            id: uid
          })
          console.log("Post add success");
          navigation.navigate('Home');
        }
        catch(error){
          console.log(error)
          Snackbar.show({
            text: "Post upload Failed",
            textColor: "white",
            backgroundColor: "red"
          })
        }
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {image && (
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="center"
            />
          )} 

            <View style={styles.formItem}>
            <Input
                placeholder="location"
                value={location}
                style={{color: '#eee'}}
                onChangeText={(text) => setLocation(text)}
              />

            {imageUploading ? (
              <ProgressBar progress={uploadStatus} style={styles.progress} />
            ) : (
                <View >
                    <Button
                    style={styles.btn}
                block
                iconLeft
                regular
                bordered
                info
                size="lg"
                onPress={chooseImage}>

                <Icon
                  name='image'
                  style={styles.icon}
                />
               
                 <Text
                  style={{
                    color: '#fdcb9e',
                  }}>
                  Choose Image
                </Text>

              </Button>
                </View>
                
            )}

<View style={{marginTop:30}}>
<TextArea 
rowSpan={5} 
placeholder="Some description..."
value={description}
style={{color: '#eee', marginTop: 30}}
onChangeText={(text) => setDescription(text)}
/>
</View>

<View style={{marginTop:30}}>
<Button regular block onPress={addPost}>
              <Text>Add Post</Text>
            </Button>
</View>

            </View>

            </ScrollView>
        </Container>
    )
}
const mapStateToProps = (state) => ({
   
        userState: state.auth.user,
     
})

AddPost.propTypes = {
    userState: propTypes.object.isRequired
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    //   justifyContent: 'flex-start',
      maxWidth:'100%',
    },
    formItem: {
      marginBottom: 20,
      marginLeft: 65,
      width: 220,
    },
    btn:{
        display:'flex',
        flexDirection:'row',
        width: 220,
    },
   
    icon: {
        fontSize: 20, color: '#fdcb9e',marginRight:10
    },
    image: {
        
      width: null,
       height: 150, 
       marginVertical: 15,
    },
    progress: {
        width: null, marginBottom: 20
    },
  });
export default connect(mapStateToProps)(AddPost)