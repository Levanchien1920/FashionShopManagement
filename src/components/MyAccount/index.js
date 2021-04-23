
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComponentHeader from '../ComponentHeader';
const MyAccountComponent = () => {
    const {navigate} =useNavigation();
    return (
       <ComponentHeader />
    );
}

export default MyAccountComponent;