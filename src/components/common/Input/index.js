
import React from 'react';
import { ScrollView, StyleSheet, Text, View,TextInput } from 'react-native';
import styles from './styles';


const Input = ({onChangeText,style,value,lable,icon,iconPosition,error,...props}) => {

    return (
        <View style= {styles.inputContainer}>
        {lable && <Text> {lable} </Text>}

        <View style= {styles.wrapper}>

        <View> {icon && icon}</View>

        <TextInput
        style={[styles.textInput,style]}
        onChangeText={onChangeText}
        value={value}
         {...props}
        />

        </View>

        {error && <Text style ={{colors:"red"}}> {error} </Text>}
       
        </View>
        
    );
}

export default Input;