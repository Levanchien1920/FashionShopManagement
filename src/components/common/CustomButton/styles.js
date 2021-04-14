import {StyleSheet} from 'react-native';
import Color from '../../../assets/theme/color';

export default StyleSheet.create({
    wrapper : {
      height: 42,
      paddingHorizontal:5,
      marginVertical:5,
      borderRadius:4,
      alignItems:"center",
      justifyContent:"space-evenly"

    },
    loaderSection: {
        flexDirection:'row',
    },

    inputContainer: {
        paddingVertical:20,
    }
})