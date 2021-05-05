
import React from 'react';
import { ScrollView, StyleSheet, Text, View,TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';

const CustomButton = ({secondary,primary,danger,title,disable,loading,onPress}) => {
    const getBgColor = () => {
        if(disable) {
            return '#adb5bd';
        }
        if(primary) {
            return '#4361ee';
        }
        if(danger) {
            return '#f72585';
        }
        if(secondary) {
            return '#3f37c9';
        }
    }
    return (
        <TouchableOpacity onPress= {onPress} disabled= {disable} style= {[styles.wrapper,{backgroundColor:getBgColor()}]} >
          <View style= {[styles.loaderSection]}>
           <Text> {title && (<Text> {title} </Text>)}</Text>  

          </View>
          
             
           
        </TouchableOpacity>
        
    );
}

export default CustomButton;