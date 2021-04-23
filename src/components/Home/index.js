
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,StatusBar,ScrollView } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeSection from './HomeSection';
import ComponentHeader from '../ComponentHeader';

const HomeComponent = () => {
    const {navigate} =useNavigation();
    return (
        <View>
         <ComponentHeader />
       <View style={styles.bodyContainer}>
        <ScrollView>
          <HomeSection />

        </ScrollView>
      </View>
      
        </View>



    );
}



export default HomeComponent;