import {StyleSheet} from 'react-native';
import Color from '../../../assets/theme/color';

export default StyleSheet.create({
    wrapper : {
       height: 50,
       borderColor:Color.success,
       borderWidth: 1,
       borderRadius:2, 
       marginTop:5
    //    alignItems:'center'

    },
    textInput: {
        flex:1,
        width:'100%',
    },

    inputContainer: {
        paddingVertical:20,
    }
})