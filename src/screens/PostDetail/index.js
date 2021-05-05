
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { ScrollView, StyleSheet, TouchableOpacity,Text, View,TextInput } from 'react-native';
import styles from './styles';
import ComponentHeader from '../../components/ComponentHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
const PostDetail = () => {

    const route = useRoute();
    const [post, setpost] = useState({});
    useEffect(() => {
        const id=route.params.id;
        axiosInstance.get(`/client/post/${id}`).then((response)=> {
            setpost(response.data);
        }).catch((error) =>{
        });
    }, [])
    return (
        <View>
                <ComponentHeader />
                <View >
                <Text>id:{post.name}</Text> 
                <Text>name:{post.name}</Text> 
                <Text>content:{post.content}</Text> 
                <Text>link:{post.link}</Text> 
                 </View>

        </View>
    );
}

export default PostDetail;