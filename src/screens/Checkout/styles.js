import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingTop: 50,
    backgroundColor: "pink",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  bodyContainer: {
    backgroundColor: "pink",
    height: "72%",
  },

  textList: {
    color: "blue",
    fontSize: 16,
  },

  text: {
    fontSize: 14,
    color: "red",
    marginVertical: 4,
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
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
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
});
