import { getTranslation } from "../utils/i18n";


const Step5dealer = ({ handleBackButton }) => {
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
        href="https://customerportal.scott-sports.com/login"
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
