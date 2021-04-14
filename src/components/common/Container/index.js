
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from './styles';


const Container = ({children}) => {
    return (
        <ScrollView>
        <View style= {styles.wrapper}>
         {children}
        </View>

        </ScrollView>
        
    );
}

export default Container;