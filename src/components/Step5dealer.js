import { getTranslation } from "../utils/i18n";


const Step5dealer = ({ handleBackButton }) => {

  // get url
  const url = window.location.href;
  // get lang from url
  const urlLang = url.split("/")[4];
  console.log(urlLang);
  let lang = "de";
  // set lang
  if(urlLang === "de" || urlLang === "fr" || urlLang === "it" || urlLang === "en" || urlLang === "es" || urlLang === "cs") {
    lang = urlLang;
  }
  

  return (
    <div className="recall_step5">
      <p>
        {getTranslation(
          "dealerprotection",
          "Please visit the following address to register for the dealer protection program"
        )}
      </p>
      <a
        className="btn btn-primary"
        href={`https://customerportal.scott-sports.com/login?language=${lang}`}
        >
        {getTranslation("customerportal", "Customer Portal Login")}
      </a>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step5dealer;
