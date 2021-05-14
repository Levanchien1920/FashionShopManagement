import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

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
      marginLeft: 20,
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

   
   createSection : {
    flexDirection:'row',
    marginTop: 5
 },
      btn1 : {
        marginLeft: 20,

      },
      btn2 : {
        marginLeft:10,
      },
      btn3 : {
        marginLeft:10,
      },
      btn4 : {
        marginLeft:10,
      },
      btn5 : {
        marginLeft:10,
      },
    
    bodyContainer: {
      marginTop:'5%',
      padding:wp('5%'),
      backgroundColor: 'pink',
    },
    linkBtn : {
      borderWidth:0.3,
      paddingRight: 30,
      color:'blue',
      fontSize:25,
   },
   text: {
    fontSize: 16,
    color: 'red',
    marginVertical: 4,
    textAlign:'center'
  },
 

    sectionContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
    },
   

    listItemContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth:800,
      width:'100%'
    },
    
    itemContainer: {
      width: 100,
      marginRight: 12,
      marginTop: 10,
    },
    itemImage: {
      width: 100,
      height: 120,
    },
   
    textIndex: {
      fontSize: 16,
      color: 'red',
      backgroundColor: 'white',
      textAlign:'center',
    },
  
    seeMoreContainer: {
      marginTop: 10,
      padding: 12,
      borderTopWidth: 0.6,
      borderTopColor: '#ededed',
      alignItems: 'center',
    },
   
    linkBtn : {
      borderWidth:0.3,
      paddingRight: 30,
      color:'blue',
      fontSize:25,
   },
     
})