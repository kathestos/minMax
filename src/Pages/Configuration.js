import "./Styles.css";
import i18n from "i18next";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "hr"],
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "minMax/assets/locales/{{lng}}/translation.json",
    },
  });

function Configuration() {

    const { t } = useTranslation();
    const number = new Date();
    // https://www.youtube.com/watch?v=w04LXKlusCQ languages

  return (
    <div>
      <div>{t("retrieveexercises")}</div>
      <div>{t("retrieveexercise")}</div>
      <div>{t("addexercise")}</div>
      <h2>{t("welcome_to_react")}</h2>
      <h6>{t("dynamic_value", { number })}</h6>

      <button
        disabled={i18next.language === "en"}
        style={{ height: "30px", width: "50px" }}
        onClick={() => {
          i18next.changeLanguage("en");
        }}
      >
        en
      </button>

      <button
        disabled={i18next.language === "hr"}
        style={{ height: "30px", width: "50px" }}
        onClick={() => {
          i18next.changeLanguage("hr");
        }}
      >
        hr
      </button>
    </div>
  );
}

export default Configuration;
