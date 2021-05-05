
import React from 'react';
import { ScrollView, StyleSheet, Text, View,TextInput } from 'react-native';
import styles from './styles';

const Input = ({onChangeText,style,value,lable,error,...props}) => {
    return (
        <View style={styles.inputContainer}>
        {lable ? (<Text> {lable} </Text>) : null}
        <View style= {styles.wrapper}>
        <TextInput
        style={[styles.textInput,style]}
        onChangeText={onChangeText}
        value={value}
         {...props}
        />
        </View>
        {error ? (<Text style= {styles.textError}> {error} </Text>) : null}
        </View>
        
    );
}

export default Input;