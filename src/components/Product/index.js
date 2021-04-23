
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader/index';
const ProductComponent = () => {
    const {navigate} =useNavigation();
    return (
      <ComponentHeader />
    );
}

export default ProductComponent;