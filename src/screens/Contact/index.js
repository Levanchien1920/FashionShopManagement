
import React from 'react';
import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import ComponentHeader from '../../components/ComponentHeader';
const Contact = () => {
   
    return (
        <View>
            <ComponentHeader />
           {Alert.alert(`Don't know how to open this URL:`)} 
       </View>
    );
}

export default Contact;