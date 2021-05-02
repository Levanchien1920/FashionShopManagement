
import React from 'react';
import { ScrollView, StyleSheet, Text, View,TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';
import colors from '../../../assets/theme/colors';

const CustomButton = ({secondary,primary,danger,title,disable,loading,onPress}) => {
    const getBgColor = () => {
        if(disable) {
            return colors.gray;
        }
        if(primary) {
            return colors.primary;
        }
        if(danger) {
            return colors.danger;
        }
        if(secondary) {
            return colors.secondary;
        }
    }
    return (
        <TouchableOpacity onPress= {onPress} disabled= {disable} style= {[styles.wrapper,{backgroundColor:getBgColor()}]} >
          <View style= {[styles.loaderSection]}>
           <Text> {title && (<Text style ={{colors:disable?"yellow":"white", paddingLeft:loading?5:0}}> {title} </Text>)}</Text>  

          </View>
          
             
           
        </TouchableOpacity>
        
    );
}

export default CustomButton;