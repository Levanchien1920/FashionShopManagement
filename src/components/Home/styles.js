import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
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


    /////222222222222222222222222222222222222222
    sectionContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
    },
    sectionTitle: {
      fontWeight: '700',
      fontSize: 16,
      color: '#2f2f2f',
      marginVertical: 12,
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
    filterInactiveButtonContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      borderColor: '#5a5a5a',
      borderWidth: 1,
      marginRight: 10,
    },
    filterActiveText: {
      color: '#fff',
    },
    filterInactiveText: {
      color: '#5a5a5a',
    },
    //
    listItemContainer: {
      flexDirection: 'row',
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
    itemName: {
      fontSize: 14,
      color: '#484848',
      marginVertical: 4,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '500',
      color: '#2a2a2a',
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