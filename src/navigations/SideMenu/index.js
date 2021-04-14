
import React from 'react';
import { SafeAreaView,View,Image, Text, TouchableOpacity } from 'react-native';
import Container from '../../components/common/Container';
import styles from './styles';

const SideMenu = ({navigation}) => {
    return (
        <SafeAreaView>
        <View>
          <Container>
          <Image
            source={require('../../assets/images/avt.jpg')}
            style={styles.logoImage}
          />
          </Container>
        </View>
        <View>
            <Text>Hello Le Van Cuong</Text>
            <TouchableOpacity onPress= {() => navigation.navigate('Settings')}>
                <Text>Log in</Text>
            </TouchableOpacity>
        </View>
  
      </SafeAreaView>
    );
}

export default SideMenu;