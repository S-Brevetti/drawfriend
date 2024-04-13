import { ReactElement } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import style from "../../styles/canvasscreen";
import { Entypo } from "@expo/vector-icons";
import { translations } from "../../utils/localization";

type Props = {
  callback: any;
};

export default function Tutorial(props: Props): ReactElement {
  return (
    <View style={style.tutorial}>
      <PagerView
        style={style.viewPager}
        initialPage={0}
        showPageIndicator={true}
      >
        <View style={style.page} key="1">
          <Text style={style.tutorialText}>{translations.t("tutorial1")}</Text>
          <Text style={style.tutorialText}>{translations.t("tutorial2")}</Text>
          <Text style={style.tutorialTextSwipe}>
            Swipe <Entypo name="arrow-right" size={30} />
          </Text>
        </View>
        <View style={style.page} key="2">
          <Entypo name="brush" size={40} />
          <Text style={style.tutorialText}>{translations.t("brush")}</Text>
          <Entypo name="palette" size={40} />
          <Text style={style.tutorialText}>{translations.t("color")}</Text>
          <Entypo name="eraser" size={40} />
          <Text style={style.tutorialText}>{translations.t("eraser")}</Text>
          <Entypo name="arrow-long-left" size={40} />
          <Text style={style.tutorialText}>{translations.t("undo")}</Text>
          <Entypo name="arrow-long-right" size={40} />
          <Text style={style.tutorialText}>{translations.t("redo")}</Text>
        </View>
        <View style={style.page} key="3">
          <Entypo name="cup" size={40} />
          <Text style={style.tutorialText}>{translations.t("clear")}</Text>
          <Entypo name="menu" size={40} />
          <Text style={style.tutorialText}>{translations.t("menu")}</Text>
          <Entypo name="camera" size={40} />
          <Text style={style.tutorialText}>{translations.t("snap")}</Text>
          <Entypo name="save" size={40} />
          <Text style={style.tutorialText}>{translations.t("save")}</Text>
          <Entypo name="documents" size={40} />
          <Text style={style.tutorialText}>{translations.t("gallery")}</Text>
          <TouchableOpacity onPress={props.callback} style={style.thankYou}>
            <Text>{translations.t("thanks")}</Text>
          </TouchableOpacity>
        </View>
      </PagerView>
    </View>
  );
}
