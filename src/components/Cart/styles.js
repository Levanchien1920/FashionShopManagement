import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    title : {
        fontSize:21,
        textAlign:'center',
        paddingTop:20,
        fontWeight:'500',
    },
    subTitle : {
        fontSize:17,
        textAlign:'center',
        paddingVertical:20,
        fontWeight:'500',
    },
    form : {
       paddingTop:20,
    },
    createSection : {
        flexDirection:'row',

     },
     linkBtn : {
        paddingLeft:30,
        color:'blue',
        fontSize:16

        
     },

     infoText : {
        fontSize:17
     },

   //   




   screenContainer: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      paddingBottom: 4,
      backgroundColor: '#1e88e5',
    },
    inputContainer: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      flex: 1,
      marginLeft: 10,
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 2,
    },
    inputText: {
       flex:1,
      color: '#969696',
      fontSize: 14,
      marginLeft: 8,
      fontWeight: '500',
    },
    cartContainer: {
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    //
    bodyContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
     
})