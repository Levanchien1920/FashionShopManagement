import React, {useContext, useEffect, useState} from 'react';
import { Alert,Text, View,TextInput,ScrollView ,Image, Button,TouchableOpacity,TouchableHighlight,FlatList,SafeAreaView,ActivityIndicator} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../context/Provider';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from '../../components/common/Icon';
import Swiper from 'react-native-swiper'
const ProductDetailComponent = () => {
    const route = useRoute();
    const [id, setId] = useState("");
    const [number, onChangeNumber] = React.useState(1);
    const [star, setStar] = useState(1);
    const [color , setcolor] =useState([]);
    const [listProduct , setlistProduct] = useState([]);
    const [Product , setProduct] = useState([]);
    const {authState : {isLoggedIn},}= useContext(GlobalContext);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
        size : ""
    });
    const [cartCount,setCartCount] = useState("0");
   

      const {
        authDispatch,
        authState: {check},
      } = useContext(GlobalContext);
      useEffect(() =>{
   
        AsyncStorage.getItem('number')
        .then((value) => {
        setCartCount(value)
     
    }
    )
   
    
   } , [check]);

    const [OutputReview, setOutputReview] = useState({
        id_user : 1,
        id_product : 1,
        content : "",
        number_of_star : 2
    })
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")
    const [quantity, setquantity] = useState(1);
    const {navigate} =useNavigation();
    const [addTC,setAddTC] =useState(false)
    const [test,setTest] =useState(false)
    const [success,setSuccess] =useState(false)
    const [isBuyNow,setIsBuyNow] =useState(false)
    const [countReview,SetCountReview] =useState(0)
    const [loadingRev, setLoadingRev] = useState(true);
    const [offsetRev, setOffsetRev] = useState(0);
    const [totalPageRev,setTotalPageRev] = useState(9);
    const [listReview , setlistReview] = useState([]);
    useEffect(() => {
            const id=route.params.id;
          setLoadingRev(true);
           axiosInstance.get(`/client/review/${id}?page=${offsetRev}`).then((response)=> {
            setlistReview(response.data.content);
            setLoadingRev(false);
            setTotalPageRev(response.data.totalPage);
    
             }).catch((error) =>{
           })
      },[listReview,offsetRev])


   

    useEffect(()=>{
        if(isBuyNow) {
            Alert.alert(`Buy now is failed,Please log in !`)
        }
        setIsBuyNow(false)
    },[isBuyNow])

    useEffect(()=>{
        if(test) {
            Alert.alert(`Review is failed,Please log in or fill out my review`)
        }
        setTest(false)
    },[test])

    useEffect(()=>{
        if(addTC) {
            Alert.alert(`Add to cart success!`)
        }
        setAddTC(false)
    },[addTC])

    
    useEffect(()=>{
        if(success) {
            Alert.alert(`Review success`)
        }
        setSuccess(false)
    },[success])

    const [login,setLogin] =useState(false)
    useEffect(()=>{
        if(login) {
            Alert.alert(`Review is failed,Please log in`)
        }
        setLogin(false)
    },[login])

      useEffect(()=>{
        setquantity(number)
         }
      ,[number])

    useEffect(()=>{
        if(!isLoggedIn) return 
          AsyncStorage.getItem('id', (err, result) => {
            setId(result);
         });
      },[isLoggedIn])

    useEffect(() => {
        if (filter.check === 1){
                axiosInstance.get(`/client/category/${filter.id}`).then((response)=> {
                    setlistProduct(response.data.content);
                }).catch((error) =>{
                });
            }
        if (filter.check === 2){
            axiosInstance.get(`/client/brand/${filter.id}`).then((response)=> {
                    setlistProduct(response.data.content);
                }).catch((error) =>{
                });
            }
        if (filter.check === 0){
                colorinsize(filter.size);
            }
    }, [filter]);

    useEffect(() => {
        const id=route.params.id;
        axiosInstance.get(`/client/product/${id}`).then((response)=> {
            setProduct(response.data);
            setcolorSizeM(response.data.m);
            setcolorSizeL(response.data.l);
            setcolorSizeXL(response.data.xl);
            setcolorSizeXXL(response.data.xxl);

        }).catch((error) =>{
        });
      
    }, []);

    const colorinsize = (size) => {
        switch(size) {
            case "m":
                let colorofsizem = colorSizeM.split(" ");
                colorofsizem.pop();
                setcolor(colorofsizem);
              break;
            case "l":
                let colorofsizel = colorSizeL.split(" ");
                colorofsizel.pop();
                setcolor(colorofsizel);
              break;
            case "xl":
                let colorofsizexl = colorSizeXL.split(" ");
                colorofsizexl.pop();
                setcolor(colorofsizexl);
                break;
            case "xxl":
                let colorofsizexxl = colorSizeXXL.split(" ");
                colorofsizexxl.pop();
                setcolor(colorofsizexxl);
              break;
            default:
                console.log("no");
        }
    }

    function submitReview() {
        if(!isLoggedIn) {
            setLogin(true)
        }else {
            if(OutputReview.content==="") {
                setTest(true)
            }else {
               
                axiosInstance.post(`/client/review`, OutputReview).then((response)=> {
                    setSuccess(true);
                  
                    // authDispatch({
                    //     type: 'Review',
                    //   });
                }).catch((error) =>{
                    setTest(true)
                });
            } 
        }
        
    }

    const renderFooterRev = () => {
        return (
          <View style={styles.footer}>
      
              <View>
              {(offsetRev>0) ? (<TouchableOpacity
              activeOpacity={0.9}
              onPress={()=> {
                setOffsetRev(offsetRev-1)
              }}
         
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Previous</Text>
              {loadingRev ? (
                <ActivityIndicator
                  color="white"
                  style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity> ):null}
      
              </View>
              <View>
      
              {
                (totalPageRev===1) ? 
                (
                  null
                ):
                (totalPageRev-1>offsetRev) ? ( <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=> {
                      setOffsetRev(offsetRev+1);
                    }}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load more</Text>
                    {loadingRev ? (
                      <ActivityIndicator
                        color="white"
                        style={{marginLeft: 8}} />
                    ) : null}
                  </TouchableOpacity> ):null}
      
              </View>
            
            
          </View>
        );
      };


      const renderItemRev = ({item}) => {
        return (
          <View style={{borderBottomWidth:1,borderBottomColor:"yellow"}}>
              
                   <View style= {{flexDirection:'column',borderBottomColor:"yellow",borderBottomWidth:1,width:'100%'}}>
    
    <View style= {{flexDirection:'row'}}>
      
        <View style= {{flexDirection:'column'}}>
              <Image
                    source={require('../../assets/images/avt.jpg')}
                    style={styles.logoImage}
                />
            <Text style={{color:'blue',fontSize:16}}>{item.name_User}</Text> 
        </View>
        
        <View style= {{flexDirection:'column',margin:10}}>
              <View style={{flexDirection:'row'}}>
                     <Text style={{color:'blue',fontSize:16}}>Tên sản phẩm: </Text>
                       <Text  style={{color:'black',fontSize:14,width:250}}>{item.name_Product}</Text> 
              </View>
    
              <View style={{marginRight:250}}>
    
                 <Stars
                  default={item.number_Of_Star}
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
                       <Text  style={{color:'black',fontSize:14,width:150}}>{item.content}</Text> 
              </View>

              <View style={{flexDirection:'row'}}>
                     <Text style={{color:'blue',fontSize:16}}>Thời gian: </Text>
                       <Text  style={{color:'black',fontSize:14,width:150}}>{item.timeReview}</Text> 
              </View>
        </View>
    </View>
    
    </View>
               </View>
      
        );
      };
    return (
 <View>
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
            <View style= {{flexDirection:'row',height:250, marginTop:"5%", borderBottomWidth: 1,borderColor:'yellow'}}  >
                <View style= {{top:5,left:5,width:170,height:250}}>  
                <View>
                <Image  source={{ uri: Product.link }}
                            style={{width: 150, height: 150}} />
                </View>
                   

            <View style= {{flexDirection:'row',marginLeft:20,paddingTop:10}}>
                    <View>
                     <TouchableOpacity
                             onPress= {() => {
                                setAddTC(true)

                                AsyncStorage.getItem('number')
                                .then((value) => {
                                    AsyncStorage.setItem('number',(parseInt(value)+parseInt(quantity))+"");
                                    if(check) {
                                        authDispatch({
                                            type: 'false',
                                          });
                                    }else {
                                        authDispatch({
                                            type: 'true',
                                          });
                                    }
                            })
                                  AsyncStorage.getItem('cart').then((res)=> {
                                if(res!=null) {
                                const cart=JSON.parse(res);
                                let id = Product.id.toString();
                                cart[id] = (cart[id] ? cart[id]: 0);
                                let qty = cart[id] + parseInt(quantity);
                                cart[id] = qty;
                                AsyncStorage.setItem('cart', JSON.stringify(cart));
                                }
                                if(res==null) {
                                    const cart={};
                                    let id = Product.id.toString();
                                    cart[id] = (cart[id] ? cart[id]: 0);
                                    let qty = cart[id] + parseInt(quantity);
                                    cart[id] = qty;
                                    AsyncStorage.setItem('cart', JSON.stringify(cart));
                                    }
                                }
                            )}} >
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="cart-plus" />
                              </TouchableOpacity>
                              </View>


                        <View style={{paddingTop:10,width:40,height:40,left:10}}>

                                <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="red"
                                onPress= {() => {
                                    if(isLoggedIn===false) {
                                        setIsBuyNow(true);
                                    }else {
                                     navigate('BuyNow', {
                                         id: Product.id ,
                                     })
                                    }
                                    }}>
                                    <Image   source={require('../../assets/images/buynow1.jpg')}
                                        style={{width: 40, height: 40}}/>
                                </TouchableHighlight>
                                
                                </View>

                                </View>

                </View>
                <View style={styles.listItemContainer}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Name:   </Text>
                                    <Text>{Product.name}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Price:   </Text>
                                    <Text>{Product.price}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Brand:   </Text>
                                    <Text>{Product.brandName}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Gender:   </Text>
                                    <Text>{Product.genderName}</Text>
                            </View>

                            <View style={{ flexDirection: 'row'}}>
                              
                                 <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Color:   </Text>
                                        {(colorSizeM!=="")?(<Text>{colorSizeM}</Text>):null}
                                        {(colorSizeL!=="")?(<Text>{colorSizeL}</Text>):null}
                                        {(colorSizeXL!=="")?(<Text>{colorSizeXL}</Text>):null}
                                        {(colorSizeXXL!=="")?(<Text>{colorSizeXXL}</Text>):null}
                                </View>
                           
                             </View>

                            <View style={{ flexDirection: 'row',left:20,paddingTop:10}} >
                                    <View style= {{width:40,height:40}}>
                                        <Button color='orange'  title="+" onPress= {() => {  onChangeNumber(number+1) 
                                        }}>    
                                        </Button>
                                    </View>
                                   <View style= {{width:40,height:40}}>
                                        <TextInput
                                                style={{ textAlign:'center',}}
                                                keyboardType={"numeric"}
                                                value={number.toString()}
                                                onChangeText= {text => {onChangeNumber(text)}}
                                            />
                                   </View>
                                   <View style= {{width:40,height:40}}> 
                                        <Button  color='orange'  title="-" onPress= {() => { if(number>1) {
                                                onChangeNumber(number-1)
                                             }
                                                 } }>
                                            </Button>
                                   </View>
                            </View>


             

                                
                        </View>
                    </View>
            </View>

            <View>

                    <View>
                            <Text style={{textAlign:'center',fontSize:16,color:'blue'}}>Description</Text>
                            <Text style={{ textAlign:'center',top:5,borderBottomWidth:1,borderBottomColor:"yellow"}}>{Product.des}</Text>
                    </View>

                    <View style={{margin:10}}>
                    <Text style={{textAlign:'center',fontSize:16,color:'blue'}}>Review product</Text>
                    <SafeAreaView>
                            <FlatList
                            data={listReview}
                            keyExtractor={(item, index) => index.toString()}
                            enableEmptySections={true}
                            renderItem={renderItemRev}
                            ListFooterComponent={renderFooterRev}
                          />
                            </SafeAreaView>

                    </View>

                <View style={{top:10}}>
                <Text style={{ textAlign:'center',fontSize:16,color:'blue'}}>My review</Text>
            <View style={{marginTop:10}}>
            <Stars
                        default={2.5}
                        update= {(val) => {
                            setStar(val)
                       }}
                        spacing={8}
                        count={5}
                        // half={true}
                        starSize={50} 
                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                    />

            </View>
              
                
                <View style={{margin:10}}>
                <TextInput
                style={{ 
                    height: 40, 
                    borderColor: 'gray', 
                    borderWidth: 1,
                }}
                multiline={true}
                numberOfLines={10}
                onChangeText={e => {
                    setOutputReview({...OutputReview ,content : e, id_user : id , id_product : Product.id,number_of_star:star}
                       )
                 
                }
            } 
                value={OutputReview.content}
                placeholder="Insert your review!"
                />

                </View>

               <View style={{marginLeft:50,marginRight:50}}>
               <Button  title="Submit"  onPress={submitReview}></Button>
               </View>

                </View>

                <View style= {{paddingTop:50}}></View> 

                </View>
                <View style= {{paddingTop:50}}></View> 
           
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
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="shopping-cart" 
                               containerStyle={{marginHorizontal: 15, position: 'relative',}} />
                                 {cartCount > 0 ? (
                  <View
                    style={{
                     
                      position: 'absolute',
                      backgroundColor: 'red',
                      width: 16,
                      height: 16,
                      borderRadius: 15 / 2,
                      right: 10,
                      top: +10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#FFFFFF",
                        fontSize: 8,
                      }}>
                      {cartCount}
                    </Text>
                  </View>
                ) : null}
                              </TouchableOpacity>
                    </View>
                  </View>
        
        
</View>
        
    );
}

export default ProductDetailComponent;