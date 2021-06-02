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
    logoImage: {
      height:50,
      width:50,
      marginTop:10,
  },

  
   btn1 : {
    marginLeft: 10,
   },
   btn2 : {
    marginLeft:15,
  },
  btn3 : {
    marginLeft:15,
  },
  btn4 : {
    marginLeft:15,
  },
  btn5 : {
    marginLeft:15,
  },

    linkBtn : {
      borderWidth:0.3,
      paddingRight: 30,
      color:'blue',
      fontSize:25,
   },

    sectionContainer: {
      marginTop:"5%",
      backgroundColor: '#fff',
      paddingHorizontal: 12,
    },
   
    sectionImage: {
      width: 500,
      height: 130,
      borderRadius: 4,
    },
    filterContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
   
    listItemContainer: {
      flexDirection: 'row',
      height:250,
      flexWrap: 'wrap',
      maxWidth:800,
      width:50
    },
    textTitle: {
      color:'blue',
      fontSize:16,

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

    text: {
      fontSize: 14,
      color: 'red',
      marginVertical: 4,
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
    bodyContainer: {
      // marginTop:'5%',
      // padding:wp('10%'),
      backgroundColor: 'pink',
      height:'72%'
    }
    ,
    myStarStyle: {
      color: 'yellow',
      backgroundColor: 'transparent',
      textShadowColor: 'black',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 2,
    },
    myEmptyStarStyle: {
      color: 'white',
    }, slide1: {
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
  
    createSection : {
      flexDirection:'row',
      // marginTop: 5
      backgroundColor:'white'
   },
   headerContainer: {
    top:2,
    flexDirection: 'row',
    height:100
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
})