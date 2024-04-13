import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "../localization/en.json";
import it from "../localization/it.json";

export const translations = new I18n({
  en: en,
  it: it,
});

translations.locale = "en";
