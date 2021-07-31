import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

  screenContainer: {
    flex: 1,
    width:'100%',
    height:hp('40%')
  },
  
  createSection : {
    width:"100%",
    display:"flex",
    flexDirection:'row',
    justifyContent:"space-between",
    backgroundColor:'white'
 },
 headerContainer: {
  top:2,
  flexDirection: 'row',
  height:100
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

   
  
    
    bodyContainer: {
     
      padding:wp('5%'),
      backgroundColor: 'pink',
      paddingLeft:10
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
    textAlign:'center',
    borderBottomWidth:1,
    borderWidth:1,
  },
 

    sectionContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
    },
   

    listItemContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth:800,
      // width:100,
      width:'100%',
     
      alignItems:'center',
      marginLeft:60,
     
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
   /////
   container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
     
})