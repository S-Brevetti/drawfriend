import { ReactElement } from "react";
import { Modal, Text } from "react-native-paper";
import ButtonImage from "./ButtonImage";
import style from "../../styles/canvasscreen";

type Props = {
  callback: any;
  visible: boolean;
  onRequestClose: any
};
export default function OptionsModal(props: Props): ReactElement {
  const size = (a: number, b: number) => () => {
    props.callback(a, b);
  };

  function close() {
    props.onRequestClose();
  }

  return (
    <Modal style={style.modal} visible={props.visible} onDismiss={close}>
      <ButtonImage color="black" name="brush" callback={size(2, 3)} size={20} />
      <ButtonImage color="black" name="brush" callback={size(6, 8)} size={30} />
      <ButtonImage
        color="black"
        name="brush"
        callback={size(10, 12)}
        size={40}
      />
    </Modal>
  );
}
