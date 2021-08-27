import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  createSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  headerContainer: {
    top: 2,
    flexDirection: "row",
    height: 100,
  },

  bodyContainer: {
    padding: wp("5%"),
    backgroundColor: "pink",
    paddingLeft: 10,
  },
 
  listItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 800,
    width: "100%",
    alignItems: "center",
    marginLeft: 60,
  },


  textIndex: {
    fontSize: 16,
    color: "red",
    backgroundColor: "white",
    textAlign: "center",
  },

  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
 
});
