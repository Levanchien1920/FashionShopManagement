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

  logoImage: {
    height: 50,
    width: 50,
    marginTop: 10,
  },

  listItemContainer: {
    flexDirection: "row",
    height: 250,
    flexWrap: "wrap",
    maxWidth: 800,
    width: 50,
  },
  textTitle: {
    color: "blue",
    fontSize: 16,
  },

  bodyContainer: {
    backgroundColor: "pink",
    height: "72%",
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
});
