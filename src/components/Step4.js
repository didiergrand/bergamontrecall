import { getTranslation } from "../utils/i18n";

const Step4 = ({
  setIsShopClient,
  step,
  setStep,
  handleBackButton
}) => {
  return (
    <div className="recall_step4">
      <p>{getTranslation("describesyou", "What best describes you?")}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsShopClient(true);
          setStep(5);
          window.history.pushState(null, "", `#${step}`);
        }}
      >
        {getTranslation(
          "purchasedproduct",
          "I purchased the product in a store"
        )}
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsShopClient(false);
          setStep(5);
          window.history.pushState(null, "", `#${step}`);
        }}
      >
        {getTranslation(
          "productinstore",
          "I have the recall product in my store"
        )}
      </button>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step4;
