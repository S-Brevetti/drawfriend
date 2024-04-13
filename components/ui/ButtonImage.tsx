import { ReactElement } from "react";
import { TouchableOpacity, Image } from "react-native";
import style from "../../styles/canvasscreen";
import { Entypo } from "@expo/vector-icons";

type Props = {
  callback: any;
  name: any;
  size: number;
  color: string
};

export default function ButtonImage(props: Props): ReactElement {
  function handleCallback(): void {
    props.callback();
  }
  return (
    <TouchableOpacity style={style.touchableImage} onPress={handleCallback}>
      <Entypo name={props.name} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
}
