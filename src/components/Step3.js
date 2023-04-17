import { getTranslation } from "../utils/i18n";


const Step3 = ({
  imageUrl,
  selectedModel,
  step,
  setStep,
  resetSteps,
  handleBackButton,
}) => {
  const SAPCode = "";
  return (
    <div className="recall_step3">
      <p>
        {getTranslation("productimage", "Here is the image of your product:")}
      </p>
      <img src={imageUrl} alt={`product ${SAPCode} ${selectedModel}`} />
      <p>{getTranslation("isproduct", "Is this your product?")}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setStep(4);
          window.history.pushState(null, "", `#${step}`);
        }}
      >
        {getTranslation("yes", "Yes")}
      </button>
      <button className="btn btn-primary" onClick={() => resetSteps()}>
        {getTranslation("no", "No")}
      </button>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step3;
