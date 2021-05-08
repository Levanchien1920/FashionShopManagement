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

    createSection : {
      flexDirection:'row',
   },

    bodyContainer: {
      marginTop:'25%',
      // padding:wp('10%'),
      backgroundColor: 'gray',
    },
    linkBtn : {
      borderWidth:0.3,
      paddingRight: 30,
      color:'blue',
      fontSize:25,
   },

    sectionContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
    },
   
    sectionImage: {
      width: 500,
      height: 130,
      borderRadius: 4,
    },
    //
    filterContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    filterActiveButtonContainer: {
      backgroundColor: '#242424',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      marginRight: 10,
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
    //
    seeMoreContainer: {
      marginTop: 10,
      padding: 12,
      borderTopWidth: 0.6,
      borderTopColor: '#ededed',
      alignItems: 'center',
    },
    seeMoreText: {
      color: '#0e45b4',
    },
     
})