import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    wrapper : {
       height: 50,
       borderColor:'#4cc9f0',
       borderWidth: 1,
       borderRadius:2, 
       marginTop:5
    },
    textInput: {
        flex:1,
        width:'100%',
    },

    inputContainer: {
        paddingVertical:20,
    },
    textError : {
        color : 'red',
    }
})