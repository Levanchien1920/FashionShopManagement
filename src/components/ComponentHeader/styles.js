import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    title : {
        fontSize:21,
        textAlign:'center',
        paddingTop:20,
        fontWeight:'500',
    },
 
    createSection : {
        flexDirection:'row',
     },
     linkBtn : {
        borderWidth:0.3,
        paddingRight: 30,
        color:'blue',
        fontSize:25,
     },

     infoText : {
        fontSize:17
     },

   screenContainer: {
      flex: 1,
      width:'100%',
      height:hp('40%')
    },
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      backgroundColor: 'pink',
      position:'relative',
      display:'flex',
      alignItems:'center',

    },
    inputContainer: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      width:'85%',
      position: 'absolute',
      marginLeft: 10,
      top:10,
      paddingHorizontal: 12,
      borderRadius: 2,
      display:'flex',
      alignItems:'center'
    },
    inputText: {
      color: '#969696',
      fontSize: 14,
      marginLeft: 8,
      fontWeight: '500',
      height:30
    },
    cartContainer: {
      position: 'absolute',
      right:10,
    },
    //
    bodyContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
     
})