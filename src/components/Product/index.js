
import React, { useState ,useEffect, useContext} from 'react';
import { Text, View,TextInput, TouchableOpacity,ScrollView ,Button, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";
import axiosInstance from '../../helper/axiosInstance';
import Card from '../../screens/Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ProductComponent = () => {
  const [searchInput,setSearchInput] = React.useState('');
  const [listProduct,setlistProduct] = useState([]);
  const [listCategory,setlistCategory] = useState([]);
  const [listBrand,setlistBrand] = useState([]);
  const [filter,setfilter] = useState({
      check  : 0, 
      id  : 0,
      search : "",
  });

  
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalPage,setTotalPage] = useState(9);

  const [loadingCat, setLoadingCat] = useState(true);
  const [offsetCat, setOffsetCat] = useState(0);
  const [totalPageCat,setTotalPageCat] = useState(9);

  const [loadingBra, setLoadingBra] = useState(true);
  const [offsetBra, setOffsetBra] = useState(0);
  const [totalPageBra,setTotalPageBra] = useState(9);

  useEffect(() =>{
  console.log('getData');
    setLoading(true);
      axiosInstance.get(`/client/product?page=${offset}`).then((response)=> {
        setLoading(false)
        setlistProduct(response.data.content);
        setTotalPage(response.data.totalPage);
    }).catch((error) =>{
    });
   } , [offset]);

   useEffect(() =>{
    console.log('getData');
      setLoadingCat(true);
        axiosInstance.get(`/client/category?page=${offsetCat}`).then((response)=> {
          setLoadingCat(false)
          setlistCategory(response.data.content);
          setTotalPageCat(response.data.totalPage);
      }).catch((error) =>{
      });
     } , [offsetCat]);


     useEffect(() =>{
        setLoadingBra(true);
          axiosInstance.get(`/client/brand?page=${offsetBra}`).then((response)=> {
            setLoadingBra(false)
            setlistBrand(response.data.content);
            setTotalPageBra(response.data.totalPage);
        }).catch((error) =>{
        });
       } , [offsetBra]);
   


  useEffect(() => {
    
    if (filter.check === 1){
      axiosInstance.get(`/client/category/relateProduct/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
    if (filter.check === 2){
      axiosInstance.get(`/client/brand/relateProduct/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }

        if (filter.check === 3) {
          axiosInstance.get(`client/product?search=${searchInput}`).then((response)=> {
              setlistProduct(response.data.content);
              console.log(response.data.content)
          }).catch((error) =>{
          });
        }
}, [filter]);
useEffect(() => {
  axiosInstance.get('/client/category').then((response)=> {
      setlistCategory(response.data.content);
  }).catch((error) =>{
  });
  axiosInstance.get('/client/brand').then((response)=> {
      setlistBrand(response.data.content);
  }).catch((error) =>{
  });
}, []);

function search(c) {
  setfilter({
      ...filter, check : c , search : searchInput
  });
}

const {navigate} =useNavigation();

function SortName (c) {
switch (c) {
  case 3: {
    listProduct.sort((a, b) => (a.name > b.name) ? 1 : -1);
    break;
  }
  case 4: {
    listProduct.sort((a, b) => (a.name < b.name) ? 1 : -1);
    break;
  }
  case 5: {
    listProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
    break;
  }
  case 6: {
    listProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
    break;
  }
}
      setfilter({
          ...filter, check : c
      });
 }

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
      </TouchableOpacity> ):null}

        </View>
        <View>

        {(totalPage>offset) ? ( <TouchableOpacity
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



const renderFooterCategory = () => {
  return (
    <View style={styles.footer}>

        <View>
        {(offsetCat>0) ? (<TouchableOpacity
        activeOpacity={0.9}
        onPress={()=> {
          setOffsetCat(offsetCat-1)
        }}
   
        style={styles.loadMoreBtn}>
        <Text style={styles.btnText}>Previous</Text>
        {loadingCat ? (
          <ActivityIndicator
            color="white"
            style={{marginLeft: 8}} />
        ) : null}
      </TouchableOpacity> ):null}

        </View>
        <View>

        {(totalPageCat>offsetCat) ? ( <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=> {
                setOffsetCat(offsetCat+1);
              }}
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Load more</Text>
              {loadingCat ? (
                <ActivityIndicator
                  color="white"
                  style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity> ):null}
        </View>
    </View>
  );
};

const renderFooterBrand = () => {
  return (
    <View style={styles.footer}>

        <View>
        {(offsetBra>0) ? (<TouchableOpacity
        activeOpacity={0.9}
        onPress={()=> {
          setOffsetBra(offsetBra-1)
        }}
   
        style={styles.loadMoreBtn}>
        <Text style={styles.btnText}>Previous</Text>
        {loadingBra ? (
          <ActivityIndicator
            color="white"
            style={{marginLeft: 8}} />
        ) : null}
      </TouchableOpacity> ):null}

        </View>
        <View>

        {(totalPageBra>offsetBra) ? ( <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=> {
                setOffsetBra(offsetBra+1);
              }}
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Load more</Text>
              {loadingBra ? (
                <ActivityIndicator
                  color="white"
                  style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity> ):null}
        </View>
    </View>
  );
};


 return (

 <View style= {{height:'100%',width:'100%'}}>
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

              <View style= {{flexDirection:'row'}}>
                      <View style= {{width:"70%"}}>
                      <TextInput
                          style={{ 
                              height: 40, 
                              borderColor: 'yellow', 
                              borderWidth: 1,
                          }}
                          onChangeText={text => setSearchInput(text)}
                          placeholder="Search"
                          />
                      </View>
                          
                      <View style={{left:'15%'}}>
                              <Button title="Search"  onPress= {()=> {
                                setfilter({
                                  ...filter, check : 3 , search : searchInput
                              });
                              }}>

                              </Button>
                      </View>

             </View>
       
          <View style={{top:20,height:50,width:"70%"}}>
            
            <RNPickerSelect pickerProps={{ style: { height: 50, color:"green" } }}
             placeholder={{
              value: 3,
              label:""
            }}
              items={[
               { label: "Name (A-Z)", value: 3 },
               { label: "Name (Z-A)", value: 4 },
               { label: "Price (Low to High)", value: 5 },
               { label: "Price (High to low)", value: 6 },
                     ]} 
                onValueChange={(value) =>  { 
                         SortName(Number(value));
                }
               }
            />
        </View>


   </View>
        
    <ScrollView horizontal={true} style= {{marginTop:30}} >
        <View style={{width:250}}>
                    <View style={{marginRight:20}}>
                    <Text style={styles.textIndex}>All product</Text>
                    </View>
                    <FlatList
                      data={listProduct}
                      keyExtractor={(item, index) => index.toString()}
                      enableEmptySections={true}
                      renderItem={renderItem}
                      ListFooterComponent={renderFooter}
                    />



                      <View style={{marginRight:20}}>
                      <Text style={styles.textIndex}>Category relative</Text>
                      </View>

                      <FlatList
                      data={listCategory}
                      keyExtractor={(item, index) => index.toString()}
                      enableEmptySections={true}
                      renderItem={renderItem}
                      ListFooterComponent={renderFooterCategory}
                    />

                      <View style={{marginRight:20}}>
                      <Text style={styles.textIndex}>Brand relative</Text>
                      </View>
                      
                      <FlatList
                      data={listBrand}
                      keyExtractor={(item, index) => index.toString()}
                      enableEmptySections={true}
                      renderItem={renderItem}
                      ListFooterComponent={renderFooterBrand}
                    />



      </View>

       <View style={{width:75}}>
              <View>
                      <Text style={{color:'red',fontSize:18}}>Category</Text>
                      {listCategory.map((category,index) => (
                        <View key={index}>
                          <TouchableOpacity  onPress={() => (setfilter({check : 1 ,id: category.id }))}>
                          <View style={{marginTop:20}}>
                            <Text style= {{borderBottomWidth:1,fontSize:15}}>{category.name}</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                            ))} 
              </View>
                <View style={{top:20}}>
                      <Text style={{color:'red',fontSize:18}}>Brand</Text>
                      {listBrand.map((brand,index) => (
                        <View key={index}>
                              <TouchableOpacity  onPress={() => (setfilter({check : 2 ,id: brand.id }))}>
                                  <View style={{marginTop:20}}>
                                  <Text style= {{borderBottomWidth:1,fontSize:15}} >{brand.name}</Text>
                                  </View>
                              </TouchableOpacity>
                        </View>
                            ))} 
                  </View>
            </View>
      </ScrollView>
      <View style= {{paddingTop:50}}></View>
   </ScrollView>
</View>
    );
}

export default ProductComponent;