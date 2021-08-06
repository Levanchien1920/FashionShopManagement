import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axiosInstance from "../../helper/axiosInstance";
import Card from "../../screens/Card";
import { LogBox } from "react-native";
import Icon1 from "../../components/common/Icon";
import Swiper from "react-native-swiper";
import { GlobalContext } from "../../context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductComponent = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [listProduct, setlistProduct] = useState([]);
  const [listCategory, setlistCategory] = useState([]);
  const [listBrand, setlistBrand] = useState([]);
  const [filter, setfilter] = useState({
    check: 0,
    id: 0,
    search: "",
  });
  const [cartCount, setCartCount] = useState("0");
  const {
    authState: { check },
  } = useContext(GlobalContext);
  useEffect(() => {
    AsyncStorage.getItem("number").then((value) => {
      setCartCount(value);
    });
  }, [check]);

  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(9);

  const [loadingCat, setLoadingCat] = useState(true);
  const [offsetCat, setOffsetCat] = useState(0);
  const [totalPageCat, setTotalPageCat] = useState(9);

  const [loadingBra, setLoadingBra] = useState(true);
  const [offsetBra, setOffsetBra] = useState(0);
  const [totalPageBra, setTotalPageBra] = useState(9);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    setLoading(true);
    axiosInstance
      .get(`/client/product?page=${offset}`)
      .then((response) => {
        setLoading(false);
        setlistProduct(response.data.content);
        setTotalPage(response.data.totalPage);
      })
      .catch((error) => {});
  }, [offset]);

  useEffect(() => {
    setLoadingCat(true);
    axiosInstance
      .get(`/client/category?page=${offsetCat}`)
      .then((response) => {
        setLoadingCat(false);
        setlistCategory(response.data.content);
        setTotalPageCat(response.data.totalPage);
      })
      .catch((error) => {});
  }, [offsetCat]);

  useEffect(() => {
    setLoadingBra(true);
    axiosInstance
      .get(`/client/brand?page=${offsetBra}`)
      .then((response) => {
        setLoadingBra(false);
        setlistBrand(response.data.content);
        setTotalPageBra(response.data.totalPage);
      })
      .catch((error) => {});
  }, [offsetBra]);

  useEffect(() => {
    if (filter.check === 1) {
      setLoading(true);
      axiosInstance
        .get(`/client/category/relateProduct/${filter.id}?page=${offset}`)
        .then((response) => {
          setlistProduct(response.data.content);
          setLoading(false);
        })
        .catch((error) => {});
    }
    if (filter.check === 2) {
      setLoading(true);
      axiosInstance
        .get(`/client/brand/relateProduct/${filter.id}?page=${offset}`)
        .then((response) => {
          setlistProduct(response.data.content);
          setLoading(false);
        })
        .catch((error) => {});
    }
    if (filter.check === 3) {
      setLoading(true);
      axiosInstance
        .get(`client/product?search=${searchInput}?page=${offset}`)
        .then((response) => {
          setlistProduct(response.data.content);
          setLoading(false);
          setTotalPage(response.data.totalPage);
        })
        .catch((error) => {});
    }
  }, [filter, offset]);
  useEffect(() => {
    axiosInstance
      .get("/client/category")
      .then((response) => {
        setlistCategory(response.data.content);
      })
      .catch((error) => {});
    axiosInstance
      .get("/client/brand")
      .then((response) => {
        setlistBrand(response.data.content);
      })
      .catch((error) => {});
  }, []);

  const { navigate } = useNavigation();

  function SortName(c) {
    switch (c) {
      case 3: {
        listProduct.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      }
      case 4: {
        listProduct.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      }
      case 5: {
        listProduct.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      }
      case 6: {
        listProduct.sort((a, b) => (a.price < b.price ? 1 : -1));
        break;
      }
    }
    setfilter({
      ...filter,
      check: c,
    });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: "yellow" }}>
        <View style={styles.listItemContainer}>
          <View style={{ marginLeft: 10, marginTop: 5 }}>
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
          {offset > 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOffset(offset - 1);
              }}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Previous</Text>
              {loading ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          {totalPage === 1 ? null : totalPage - 1 > offset ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOffset(offset + 1);
              }}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load more</Text>
              {loading ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const renderFooterCategory = () => {
    return (
      <View style={styles.footer}>
        <View>
          {offsetCat > 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOffsetCat(offsetCat - 1);
              }}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Previous</Text>
              {loadingCat ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          {totalPageCat === 1 ? null : totalPageCat - 1 > offsetCat ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOffsetCat(offsetCat + 1);
              }}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load more</Text>
              {loadingCat ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const renderFooterBrand = () => {
    return (
      <View style={styles.footer}>
        <View>
          {offsetBra > 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOffsetBra(offsetBra - 1);
              }}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Previous</Text>
              {loadingBra ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          {totalPageBra === 1 ? null : totalPageBra - 1 > offsetBra ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOffsetBra(offsetBra + 1);
              }}
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load more</Text>
              {loadingBra ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const tempData = [];
  listCategory.forEach((data) => {
    tempData.push({ label: `${data.name}`, value: `${data.id}` });
  });

  const tempDataBrand = [];
  listBrand.forEach((data) => {
    tempDataBrand.push({ label: `${data.name}`, value: `${data.id}` });
  });

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View>
        <View style={styles.headerContainer}>
          <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
            <View style={styles.slide1}>
              <Image
                source={require("../../assets/images/b1.jpg")}
                style={{ height: 100 }}
              />
            </View>
            <View style={styles.slide2}>
              <Image
                source={require("../../assets/images/b2.jpg")}
                style={{ height: 100 }}
              />
            </View>
            <View style={styles.slide3}>
              <Image
                source={require("../../assets/images/b3.jpg")}
                style={{ height: 100 }}
              />
            </View>
          </Swiper>
        </View>
      </View>

      <ScrollView style={styles.bodyContainer}>
        <View>
          <View
            style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10 }}
          >
            <View style={{ width: "70%" }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "blue",
                  borderWidth: 1,
                }}
                onChangeText={(text) => setSearchInput(text)}
                placeholder="Search"
              />
            </View>

            <View style={{ left: "15%" }}>
              <TouchableOpacity
                onPress={() => {
                  setOffset(0);
                  setfilter({
                    ...filter,
                    check: 3,
                    search: searchInput,
                  });
                }}
              >
                <Icon1
                  type="fontisto"
                  style={{ padding: 10 }}
                  size={30}
                  color="blue"
                  name="search"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ top: 20, flexDirection: "row" }}>
            <View>
              <Icon1
                type="materialCommunity"
                style={{ padding: 10 }}
                size={30}
                color="black"
                name="sort"
              />
            </View>
            <View style={{ width: 200 }}>
              <RNPickerSelect
                pickerProps={{ style: { height: 50, color: "green" } }}
                placeholder={{
                  value: 3,
                  label: "Name(A-Z)",
                }}
                items={[
                  { label: "Price (Low to High)", value: 5 },
                  { label: "Price (High to low)", value: 6 },
                ]}
                onValueChange={(value) => {
                  SortName(Number(value));
                }}
              />
            </View>
          </View>

          <View style={{ top: 20, flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ height: 50, marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>Category: </Text>
              </View>

              <View>
                <RNPickerSelect
                  pickerProps={{
                    style: { width: 100, height: 50, color: "green" },
                  }}
                  placeholder={{
                    label: "",
                  }}
                  items={tempData}
                  onValueChange={(value) => {
                    setfilter({ check: 1, id: value });
                  }}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ height: 50, marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>Brand: </Text>
              </View>

              <View>
                <RNPickerSelect
                  pickerProps={{
                    style: { width: 100, height: 50, color: "green" },
                  }}
                  placeholder={{
                    label: "",
                  }}
                  items={tempDataBrand}
                  onValueChange={(value) => {
                    setfilter({ check: 2, id: value });
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <ScrollView style={{ marginTop: 30 }}>
          <View
            style={{
              width: "100%",
              borderRightWidth: 1,
              borderRightColor: "yellow",
              borderLeftColor: "yellow",
              borderLeftWidth: 1,
            }}
          >
            <View>
              <View>
                <Text style={styles.textIndex}>Product</Text>
              </View>

              <FlatList
                data={listProduct}
                keyExtractor={(item, index) => index.toString()}
                enableEmptySections={true}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
              />
            </View>
            <View>
              <View>
                <Text style={styles.textIndex}>Category</Text>
              </View>
              <SafeAreaView>
                <FlatList
                  data={listCategory}
                  keyExtractor={(item, index) => index.toString()}
                  enableEmptySections={true}
                  renderItem={renderItem}
                  ListFooterComponent={renderFooterCategory}
                />
              </SafeAreaView>
            </View>

            <View>
              <View>
                <Text style={styles.textIndex}>Brand</Text>
              </View>

              <SafeAreaView>
                <FlatList
                  data={listBrand}
                  keyExtractor={(item, index) => index.toString()}
                  enableEmptySections={true}
                  renderItem={renderItem}
                  ListFooterComponent={renderFooterBrand}
                />
              </SafeAreaView>
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingTop: 50 }}></View>
      </ScrollView>

      <View style={styles.createSection}>
        <View style={styles.btn1}>
          <TouchableOpacity
            onPress={() => {
              navigate("Home");
            }}
          >
            <Icon1
              type="fa5"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="home"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn2}>
          <TouchableOpacity
            onPress={() => {
              navigate("Product");
            }}
          >
            <Icon1
              type="ionicon"
              style={{ padding: 10 }}
              size={30}
              color="blue"
              name="shirt"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn3}>
          <TouchableOpacity
            onPress={() => {
              navigate("Contact");
            }}
          >
            <Icon1
              type="material"
              style={{ padding: 10 }}
              size={35}
              color="green"
              name="contact-phone"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn4}>
          <TouchableOpacity
            onPress={() => {
              navigate("Post");
            }}
          >
            <Icon1
              type="ant"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="notification"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn5}>
          <TouchableOpacity
            onPress={() => {
              navigate("Cart");
            }}
          >
            <Icon1
              type="fa5"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="shopping-cart"
              containerStyle={{ marginHorizontal: 15, position: "relative" }}
            />

            {cartCount > 0 ? (
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  width: 16,
                  height: 16,
                  borderRadius: 15 / 2,
                  right: 10,
                  top: +10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: 8,
                  }}
                >
                  {cartCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductComponent;
