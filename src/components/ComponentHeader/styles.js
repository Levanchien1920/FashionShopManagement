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
        paddingLeft: 10,
        flexDirection:'row',
     },
     linkBtn : {
        paddingRight: 30,
        color:'blue',
        fontSize:16,
     },

     infoText : {
        fontSize:17
     },

   screenContainer: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      backgroundColor: 'pink',
      position:'relative',
      display:'flex',
      alignItems:'center'
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