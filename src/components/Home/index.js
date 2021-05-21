
import React, { useEffect, useState ,useContext} from 'react';
import {Image, Text, View, FlatList,ScrollView,Button,TextInput,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import Card from '../../screens/Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GlobalContext} from '../../context/Provider';
import { LogBox } from 'react-native';
const HomeComponent = () => {
  const [listProductBest , setlistProductBest] = useState([]);
  const [listProductNew , setlistProductNew] = useState([]);
  const [listBestReview , setlistBestReview] = useState([]);
  const {authState : {count},}= useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalPage,setTotalPage] = useState(9);

  const [loadingNew, setLoadingNew] = useState(true);
  const [offsetNew, setOffsetNew] = useState(0);
  const [totalPageNew,setTotalPageNew] = useState(9);

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
       axiosInstance.get('/client/review/good').then((response)=> {
        setlistBestReview(response.data.content);
         }).catch((error) =>{
       })
  },[count])
  const {navigate} =useNavigation();
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
                      <View style={styles.inputContainer}>
                          <FontAwesome name="search" size={24} color="#969696" />
                          <TextInput style={styles.inputText} />
                      </View>
                 
              </View>

              <View  style = {styles.createSection}>
                <View style = {styles.btn1}>   
                        <Button  title= "Home" onPress= {() => {navigate('Home')}}>  </Button>
                   </View>
                   <View style = {styles.btn2}>
                        <Button  title= "Product" onPress= {() => {navigate('Products')}}>
                        </Button>
                   </View>
                    <View style = {styles.btn3}> 
                    <Button   title= "Contact" onPress= {() => {navigate('Contact')}}>
                    </Button>
                    </View> 
                    <View style = {styles.btn4} >
                    <Button  title= "Post" onPress= {() => {navigate('Post')}}>
                   </Button>
                    </View>
                    <View style = {styles.btn5}>
                    <Button  title= "Cart" onPress= {() => {navigate('Cart')}}>
                           </Button>
                    </View>
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
                       <View style={styles.listItemContainer}>
                      {listBestReview.map((review,index) => (
                        <View key= {index} style= {{flexDirection:'column'}}>

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
                                             <Text>:{review.name_Product}</Text> 
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                           <Text style={{color:'blue',fontSize:16}}>Nội dung: </Text>
                                             <Text>:{review.content}</Text> 
                                    </View>
                              </View>
                          </View>
                         
                        </View>

                        
                      ))}  
                      </View>
                      <View style= {{paddingTop:50}}></View>
                  </View>

                  
            </ScrollView> 
      </View>
    );
 
}

export default HomeComponent;