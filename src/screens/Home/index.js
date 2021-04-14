
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../components/common/Container';
import HomeComponent from '../../components/Home';

const Home = () => {
    const {setOptions,toggleDrawer}=useNavigation();
    
  React.useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
         <Text style= {{padding:10}}>TK</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
    return (
        <HomeComponent />
    );
}

export default Home;