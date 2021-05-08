
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity,Text, View,TextInput,Button } from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComponentHeader from '../../components/ComponentHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
const Contact = () => {
    const {navigate} =useNavigation();
    return (
        <View>
                    <View>
                        <View style={styles.headerContainer}>
                                <View style={styles.inputContainer}>
                                    <FontAwesome name="search" size={24} color="#969696" />
                                    <TextInput style={styles.inputText} />
                                </View>
                                <View style={styles.cartContainer}>
                                      <FontAwesome name="shopping-cart" size={24} color="#fff" />
                                </View>
                        </View>

                       <View  style = {styles.createSection}>
                                <Button title= "Home" onPress= {() => {navigate('Home')}}>
                                </Button>
                                <Button title= "Product" onPress= {() => {navigate('Products')}}></Button>
                                <Button  title= "Contact" onPress= {() => {navigate('Contact')}}></Button>
                                <Button  title= "Post" onPress= {() => {navigate('Post')}}></Button>
                                <Button title= "Cart" onPress= {() => {navigate('Cart')}}>
              
                                </Button>
                       </View>
              </View>
        </View>
 
       
    );
}

export default Contact;