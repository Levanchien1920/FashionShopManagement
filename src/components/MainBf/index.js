
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
const MainBfComponent = () => {
    const {navigate} =useNavigation();
    return (
        <Container>
        <Text>Main bf</Text>

        <View  style = {styles.createSection}>
            <TouchableOpacity onPress= {() => {navigate('Register')}}>
                <Text  style = {styles.linkBtn}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress= {() => {navigate('Login')}}>
                <Text  style = {styles.linkBtn}>Login</Text>
            </TouchableOpacity>
        </View>
        
       
        
        </Container>
    );
}

export default MainBfComponent;