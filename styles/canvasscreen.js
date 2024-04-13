import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default StyleSheet.create({
  container: { flex: 1 },
  topArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FF5A5F",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  canvasArea: {
    flex: 10,
  },
  footerArea: {
    backgroundColor: "#087E8B",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  touchableImage: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "cover",
  },
  modal: {
    zIndex: 3,
    top: "70%",
    width: 50,
    height: 100,
    position: "absolute",
  },
  touchableBrush: {
    position: "absolute",
  },
  tutorial: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "#E9B872",
  },
  tutorialText: { fontSize: 20, marginBottom: 30, textAlign:"center", paddingLeft: 20, paddingRight:20 },
  tutorialTextSwipe: { position: "absolute", fontSize: 30, bottom: 20 },
  viewPager: { flex: 1 },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  thankYou: {
    backgroundColor: "white",
    padding: 10
  }
});
