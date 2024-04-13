import { ReactElement } from "react";
import { TriangleColorPicker } from "react-native-color-picker";

type Props = {
  callback: any;
};

export default function ColorPalette(props: Props): ReactElement {
  function handleCallback(color: any): void {
    console.log(color);
    props.callback(color);
  }

  return (
    <TriangleColorPicker
      hideControls={true}
      defaultColor={"#000"}
      onColorChange={handleCallback}
    />
  );
}
