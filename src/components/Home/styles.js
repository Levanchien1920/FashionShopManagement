import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  bodyContainer: {
    padding: wp("5%"),
    backgroundColor: "pink",
    height: "72%",
  },
  listItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 30,
    maxWidth: 800,
    width: "100%",
  },

  textIndex: {
    fontSize: 16,
    color: "red",
    backgroundColor: "white",
    textAlign: "center",
  },

  logoImage: {
    height: 50,
    width: 50,
    marginTop: 10,
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

  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
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
