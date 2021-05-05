import {StyleSheet} from 'react-native';


export default StyleSheet.create({

  container : {
    height:100,
    backgroundColor : "#fff",
    alignItems      : "center",
    justifyContent  : "center",
  
},
space : {
  paddingHorizontal: 20,
 marginTop:300,
 marginLeft:300,
  backgroundColor : "#fff",
 
  
},

leftScreen : {
  width: 2000,
  height:200,
  backgroundColor : "#fff",
},
    form : {
       paddingTop:20,
    },
    createSection : {
        flexDirection:'row',
     },
  
   screenContainer: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      paddingBottom: 4,
      backgroundColor: '#1e88e5',
    },
   
    bodyContainer: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
    },
    
    sectionContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 12,
      width: '100%',
    },

    filterContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },

    scrollViewContainer: {
      width: '20%',
      display: 'flex',
      flexDirection:'row'
    },
   
  
    listItemContainer: {
      flexDirection: 'column',
      flexWrap:'wrap',
      width: '100%',
      margin:10
      
    },
    itemContainer: {
      width: 100,
      marginRight: 12,
      marginTop: 10,
    },
 
  
    seeMoreContainer: {
      marginTop: 10,
      padding: 12,
      borderTopWidth: 0.6,
      borderTopColor: '#ededed',
      alignItems: 'center',
    },
 
     
})