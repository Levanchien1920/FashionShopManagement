
import React, { useEffect, useState ,useContext} from 'react';
import {Image, Text, View, FlatList,ScrollView,Button,TextInput,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
import styles from './styles';
import {useIsFocused, useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import Card from '../../screens/Card';
import {GlobalContext} from '../../context/Provider';
import { LogBox } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from '../../components/common/Icon';
import Swiper from 'react-native-swiper'
const HomeComponent = () => {
  const [listProductBest , setlistProductBest] = useState([]);
  const [listProductNew , setlistProductNew] = useState([]);
  const [listBestReview , setlistBestReview] = useState([]);
  const {authState : {count},}= useContext(GlobalContext);
  const {navigate} =useNavigation();

  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalPage,setTotalPage] = useState(9);

  const [loadingNew, setLoadingNew] = useState(true);
  const [offsetNew, setOffsetNew] = useState(0);
  const [totalPageNew,setTotalPageNew] = useState(9);

 const isFocused = useIsFocused();


  useEffect(() =>{
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      setLoading(true);
        axiosInstance.get(`/client/product/best?page=${offset}`).then((response)=> {
          setLoading(false)
          setlistProductBest(response.data.content);
          setTotalPage(response.data.totalPage);
      }).catch((error) =>{
      });
     } , [offset]);
  
     useEffect(() =>{
        setLoadingNew(true);
          axiosInstance.get(`/client/product/new?page=${offsetNew}`).then((response)=> {
            setLoadingNew(false)
            setlistProductNew(response.data.content);
            setTotalPageNew(response.data.totalPage);
        }).catch((error) =>{
        });
       } , [offsetNew]);

  useEffect(() => {
    console.log({isFocused});
      if(!isFocused) return
       axiosInstance.get('/client/review/good').then((response)=> {
        setlistBestReview(response.data.content);
         }).catch((error) =>{
       })
  },[isFocused])

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
          <View>
          {(offset>0) ? (<TouchableOpacity
          activeOpacity={0.9}
          onPress={()=> {
            setOffset(offset-1)
          }}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Previous</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>):null}
          </View>
          <View>
          {
            (totalPage===1) ? 
            (
              null
            ):
            (totalPage-1>offset) ? ( <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=> {
                  setOffset(offset+1);
                }}
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Load more</Text>
                {loading ? (
                  <ActivityIndicator
                    color="white"
                    style={{marginLeft: 8}} />
                ) : null}
              </TouchableOpacity> ):null}
  
          </View>
        
        
      </View>
    );
  };

  const renderFooterNew = () => {
    return (
      <View style={styles.footer}>
  
          <View>
          {(offsetNew>0) ? (<TouchableOpacity
          activeOpacity={0.9}
          onPress={()=> {
            setOffsetNew(offsetNew-1)
          }}
     
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Previous</Text>
          {loadingNew ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity> ):null}
  
          </View>
          <View>
  
          {
            (totalPageNew===1) ? 
            (
              null
            ):
            (totalPageNew-1>offsetNew) ? ( <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=> {
                  setOffsetNew(offsetNew+1);
                }}
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>Load more</Text>
                {loadingNew ? (
                  <ActivityIndicator
                    color="white"
                    style={{marginLeft: 8}} />
                ) : null}
              </TouchableOpacity> ):null}
  
          </View>
        
        
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={{borderBottomWidth:1,borderBottomColor:"yellow"}}>
           <View style={styles.listItemContainer}>
               <View style={{marginLeft:10,marginTop:5}}>
               <Card product={item}></Card>
     </View>
     </View>
      </View>
    );
  };

    return (
        <View >
              <View>
              <View style={styles.headerContainer}>
                  


                      
                      <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
                              <View style={styles.slide1}>
                              <Image  
                                 source={require('../../assets/images/b1.jpg')}
                                    style={{height: 100}}/>
                              </View>
                              <View style={styles.slide2}>
                              <Image  
                                 source={require('../../assets/images/b2.jpg')}
                                    style={{height: 100}}/>
                              </View>
                              <View style={styles.slide3}>
                              <Image  
                                 source={require('../../assets/images/b3.jpg')}
                                    style={{height: 100}}/>
                              </View>
                      </Swiper>
                 
              </View>

             
              </View>
         
               <ScrollView style={styles.bodyContainer}>
                        <View>
                          <Text style={styles.textIndex}>Best Selling</Text>
                        <SafeAreaView>
                        <FlatList
                          data={listProductBest}
                          keyExtractor={(item, index) => index.toString()}
                          enableEmptySections={true}
                          renderItem={renderItem}
                          ListFooterComponent={renderFooter}
                        />
                        </SafeAreaView>

                       </View>

                       <View >
                             <Text style={styles.textIndex}>New product</Text>
                             <SafeAreaView>
                            <FlatList
                            data={listProductNew}
                            keyExtractor={(item, index) => index.toString()}
                            enableEmptySections={true}
                            renderItem={renderItem}
                            ListFooterComponent={renderFooterNew}
                          />
                            </SafeAreaView>
                      </View>

                   <View style = {{flexDirection:'column'}}>
                      <Text style={styles.textIndex}>Review</Text>
                       <View style={styles.listItemContainer1}>
                      {listBestReview.map((review,index) => (
                        <View key= {index} style= {{flexDirection:'column',borderBottomColor:"yellow",borderBottomWidth:1,width:'100%'}}>

                          <View style= {{flexDirection:'row'}}>
                            
                              <View style= {{flexDirection:'column'}}>
                                    <Image
                                          source={require('../../assets/images/avt.jpg')}
                                          style={styles.logoImage}
                                      />
                                  <Text style={{color:'blue',fontSize:16}}>{review.name_User}</Text> 
                              </View>
                              
                              <View style= {{flexDirection:'column',margin:10}}>
                                    <View style={{flexDirection:'row'}}>
                                           <Text style={{color:'blue',fontSize:16}}>Tên sản phẩm: </Text>
                                             <Text  style={{color:'black',fontSize:14,width:250}}>{review.name_Product}</Text> 
                                    </View>

                                    <View style={{marginRight:250}}>
              
                                       <Stars
                                        default={review.number_Of_Star}
                                        spacing={8}
                                        count={5}
                                        starSize={50} 
                                        disabled={true}
                                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                                        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                                        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                                    />
                                   </View>
                                    <View style={{flexDirection:'row'}}>
                                           <Text style={{color:'blue',fontSize:16}}>Nội dung: </Text>
                                             <Text  style={{color:'black',fontSize:14,width:150}}>{review.content}</Text> 
                                    </View>
                              </View>
                          </View>
                         
                        </View>

                        
                      ))}  
                      </View>
                      <View style= {{paddingTop:50}}></View>
                  </View>

                  

            </ScrollView> 

            
            <View  style = {styles.createSection}>
                <View style = {styles.btn1}>   
                            <TouchableOpacity
                              onPress= {() => {navigate('Home')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="home" />
                            
                              </TouchableOpacity>
                              
                   </View>
                   <View style = {styles.btn2}>
                        <TouchableOpacity
                              onPress= {() => {navigate('Product')}}>
                              <Icon1 type="ionicon" style={{padding: 10}} size={30} color="green" name="shirt" />
                            
                         </TouchableOpacity>

              

                   </View>
                    <View style = {styles.btn3}> 
                         <TouchableOpacity
                              onPress= {() => {navigate('Contact')}}>
                              <Icon1 type="material" style={{padding: 10}} size={35} color="green" name="contact-phone" />
                            
                              </TouchableOpacity>
                   
                    </View> 
                    <View style = {styles.btn4} >
                  

                   <TouchableOpacity
                              onPress= {() => {navigate('Post')}}>
                              <Icon1 type="ant" style={{padding: 10}} size={30} color="green" name="notification" />
                            
                              </TouchableOpacity>
                    </View>
                    <View style = {styles.btn5}>

                           <TouchableOpacity
                              onPress= {() => {navigate('Cart')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="shopping-cart" />
                              </TouchableOpacity>
                    </View>
                  </View>
            </View>
     
    );
 
}

export default HomeComponent;