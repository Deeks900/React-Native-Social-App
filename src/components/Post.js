import React, {useEffect, useState} from 'react';
import { StyleSheet, Linking, View } from 'react-native';
import { Card } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { Button } from "@rneui/themed";
import {
    Image,
    Text,
    Left,
    Body,
    Right,
    Container
  } from 'native-base';
  import database from '@react-native-firebase/database';

const Post = ({item, userDetails})=>{
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)

    const upVotePost = ()=>{
        database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
            upvote: 1
        })
        .then(()=>{
            console.log('UPVOTED')
        })
    }

    const downVotePost = ()=>{
        database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
            downvote: 1
        })
        .then(()=>{
            console.log('DOWNVOTED')
        })
    }

    useEffect(()=>{
        console.log(item)
        if(item.vote){
            let upVote = 0
            let downVote = 0

            Object.values(item.vote).map((val)=>{
                if(val.upvote){
                    upVote += 1;
                }

                if(val.downvote){
                    downVote += 1;
                }
            })

            setUpvote(upVote);
            setDownvote(downVote);
        }
    }, [item])
    return (
       <View style={{
        backgroundColor: '#0f4c75',
        borderColor: '#0f4c75',
        marginBottom:10
      }}>
        
        
        <View style={{display:'flex', flexDirection:'row', marginHorizontal:10, marginVertical:10}}>
        <Image size="12" source={{uri: item.userImage}} alt="react-native" />
        <Card.Divider/>
        <View style={{display:'flex', flexDirection:'column', marginHorizontal:10}}>
        <Text
              style={{
                color: '#fdcb9e',
              }}>
              {item.by}
            </Text>
            <Text note>{item.location}</Text>
        </View>
        </View>
        

            <Image
          source={{uri: item.picture}}
          style={{height: 200, width: null, flex: 1}}
          alt="react-native"
        />

<Text
          numberOfLines={2}
          style={{
            color: '#fff',
            marginHorizontal:10,
            marginVertical:10,
            fontSize: 18
          }}>
          {item.description}
        </Text>

       <View style={{display:'flex', flexDirection:'row'}}>
        <View style={{marginVertical:15}}>
        <Button type="clear" onPress={upVotePost}>
            <Icon
              name='thumb-up'
              color='#fdcb9e'
              />
            <Text
              style={{
                color: '#fdcb9e',
              }}>
              {upvote}
            </Text>
          </Button>
        </View>
       
        <View style={{marginHorizontal:10, marginVertical:15}}>
        <Button type="clear" onPress={downVotePost}>
            <Icon
              name='thumb-down'
              color='#fdcb9e'
              />
            <Text
              style={{
                color: '#fdcb9e',
              }}>
              {downvote}
            </Text>
          </Button>
        </View>
          {/* Right side icons */}
          <View style={{marginHorizontal:110, marginVertical:15}}>
          <Button type="clear" onPress={() => {
              Linking.openURL(`http://instagram://user?username=${item.instaId}`);
            }}>
                <Text
              style={{
                color: '#fdcb9e',marginHorizontal:6,
              }}>
              Open in
            </Text>
            <Icon
         name='instagram'
         type='entypo'
         color='#fdcb9e' 
         />
    </Button>
          </View>

       </View>
       <Card.Divider/>




       </View>
    )
}

export default Post