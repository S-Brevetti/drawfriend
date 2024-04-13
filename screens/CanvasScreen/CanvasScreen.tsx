import { ReactElement, useRef, useState } from "react";
import { View, Dimensions, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

//components
import ButtonImage from "../../components/ui/ButtonImage";
import OptionsModal from "../../components/ui/OptionsModal";
import style from "../../styles/canvasscreen";
import MenuModal from "../../components/ui/MenuModal";
import Tutorial from "../../components/ui/Tutorial";

export default function CanvasScreen(): ReactElement {
  const [brushMenuVisible, setBrushMenuVisible] = useState<boolean>(false);
  const [colorPaletteVisible, setColorPaletteVisible] =
    useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [bg, setBg] = useState<string | undefined>("");
  const [tutorialVisible, setTutorialVisible] = useState<boolean>(true);
  const ref: any = useRef<SignatureViewRef>(null);
  let color: string = "black";

  function snapPicture(): void {
    console.log("sono in snap");
    takePhoto();
  }

  async function takePhoto(): Promise<void> {
    let base64: string | undefined = "";
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let photo = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.5,
    });
    photo.cancelled ? (base64 = "") : (base64 = photo.base64);
    setBg(base64);
  }

  async function openGallery(): Promise<void> {
    let base64: string | undefined = "";
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
      base64: true,
    });
    photo.cancelled ? (base64 = "") : (base64 = photo.base64);
    setBg(base64);
    setMenuVisible(false);
  }

  const handleConfirm = () => {
    ref.current.readSignature();
    alert("Ok!");
    setMenuVisible(false);
  };

  async function handleOk(signature: string): Promise<void> {
    console.log("questa è la signature", signature);
    await MediaLibrary.requestPermissionsAsync();
    let fileName: string = Math.floor(Math.random() * 1000).toString();
    const CONVERTEDIMAGE = convertBase64ToPng(
      signature,
      `drawfriend-${fileName}`
    );
    await MediaLibrary.createAssetAsync(CONVERTEDIMAGE);
    setMenuVisible(false);
  }

  const convertBase64ToPng = (file: string, fileName: any): string => {
    const path = FileSystem.cacheDirectory + `${fileName}.png`;
    FileSystem.writeAsStringAsync(
      path,
      file.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(console.log)
      .catch(console.error);
    return path;
  };

  function handleClear(): void {
    ref.current?.clearSignature();
  }

  function handleUndo(): void {
    ref.current?.undo();
  }

  function handleRedo(): void {
    ref.current?.redo();
  }

  function handlePenSizeChange(a: number, b: number): void {
    console.log("array" + a + b);
    ref.current.draw();
    ref.current.changePenSize(a, b);
    setBrushMenuVisible(false);
  }
  function handleEraser(): void {
    ref.current.erase();
  }

  function handleColor(HSVcolor: any): void {
    let HEXcolor = fromHsv(HSVcolor);
    color = HEXcolor;

    ref.current.changePenColor(HEXcolor);
  }

  function openBrushMenu(): void {
    setBrushMenuVisible(true);
  }
  function showPalette(): void {
    setColorPaletteVisible(true);
  }

  function colorSelected(): void {
    setColorPaletteVisible(false);
  }

  function showMenu(): void {
    setMenuVisible(true);
  }

  function hideTutorial(): void {
    setTutorialVisible(false);
  }

  function hideMenu(): void {
    setMenuVisible(false)
    setBrushMenuVisible(false)
  }

  return (
    <View style={style.container}>
      {tutorialVisible === true && <Tutorial callback={hideTutorial} />}
      <View style={style.topArea}>
        <ButtonImage
          color="black"
          name="arrow-long-left"
          callback={handleUndo}
          size={40}
        />
        <ButtonImage
          color="black"
          name="cup"
          callback={handleClear}
          size={40}
        />
        <ButtonImage
          color="black"
          name="arrow-long-right"
          callback={handleRedo}
          size={40}
        />
      </View>
      <View style={style.canvasArea}>
        <SignatureScreen
          ref={ref}
          webStyle={`.m-signature-pad--footer{display: none; margin: 0px;}
          .m-signature-pad {box-shadow: none}
          .m-signature-pad--body {border: none, box-shadow:none}
          body,html {width:100%; height: 100%;}
           `}
          penColor={color}
          bgHeight={Dimensions.get("window").height}
          bgWidth={Dimensions.get("window").width}
          dataURL={bg !== "" ? "data:image/jpeg;base64," + bg : ""}
          onOK={handleOk}
          backgroundColor="#fff"
        />
      </View>
      {brushMenuVisible === true && (
        <OptionsModal
          visible={brushMenuVisible}
          callback={handlePenSizeChange}
          onRequestClose={hideMenu}
        />
      )}
      <Modal
        style={{ height: "50%", backgroundColor: "#E9B872" }}
        visible={colorPaletteVisible}
        onRequestClose={() => {
          setColorPaletteVisible(false);
        }}
      >
        <TriangleColorPicker
          style={{
            flex: 3,
            width: "100%",
            height: 500,
            backgroundColor: "#E9B872",
          }}
          defaultColor="black"
          onColorChange={handleColor}
          onColorSelected={colorSelected}
        />
      </Modal>
      {menuVisible === true && (
        <MenuModal
          visible={menuVisible}
          callbackCamera={snapPicture}
          callbackSave={handleConfirm}
          callbackGallery={openGallery}
          onRequestClose={hideMenu}
        />
      )}
      <View style={style.footerArea}>
        <ButtonImage
          color={color}
          name="brush"
          callback={openBrushMenu}
          size={40}
        />
        <ButtonImage
          color={color}
          name="palette"
          callback={showPalette}
          size={40}
        />
        <ButtonImage
          color="black"
          name="eraser"
          callback={handleEraser}
          size={40}
        />
        <ButtonImage color="black" name="menu" callback={showMenu} size={40} />
      </View>
    </View>
  );
}
