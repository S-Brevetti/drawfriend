import { ReactElement } from "react";
import { Modal, Text } from "react-native-paper";
import ButtonImage from "./ButtonImage";
import style from "../../styles/canvasscreen";

type Props = {
  callbackCamera: any;
  callbackSave: any;
  callbackGallery: any;
  visible: boolean;
  onRequestClose: any
};
export default function MenuModal(props: Props): ReactElement {
  function callbackCameraFunction () {
    props.callbackCamera();
  };
  function callbackSaveFunction () {
    props.callbackSave();
  };
  function callbackGalleryFunction () {
    props.callbackGallery();
  };

  function close(){
    props.onRequestClose()
  }

  return (
    <Modal style={style.modal} visible={props.visible} onDismiss={close}>
      <ButtonImage color="black" name="camera" callback={callbackCameraFunction} size={40} />
      <ButtonImage color="black" name="save" callback={callbackSaveFunction} size={40} />
      <ButtonImage color="black" name="documents" callback={callbackGalleryFunction} size={40} />
    </Modal>
  );
}