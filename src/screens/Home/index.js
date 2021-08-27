
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { TouchableOpacity} from 'react-native';
import HomeComponent from '../../components/Home';
import Icon from '../../components/common/Icon';
const Home = () => {
    const {setOptions,toggleDrawer}=useNavigation();
    
  React.useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
         <Icon type="material" style={{padding: 10}} size={25} name="menu" />
        </TouchableOpacity>
      ),
    });
  }, []);
    return (
        <HomeComponent />
    );
}

export default Home;