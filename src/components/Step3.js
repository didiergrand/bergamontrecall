import { getTranslation } from "../utils/i18n";


const Step3 = ({
  serialNumber,
  imageUrl,
  selectedModel,
  step,
  setStep,
  resetSteps,
  handleBackButton,
  materialName,
  materialSize,
  materialYear
}) => {
  const SAPCode = "";
  return (
    <div className="recall_step3">
      <div className="alert alert-danger"><i className="fas fa-exclamation-triangle"></i>{" "}
        {getTranslation("productaffected", "Your product is affected by a recall")}
      </div>
      <div className="product-details">
        <div className="product-image">
          <img src={imageUrl} alt={`product ${SAPCode}, selectedModel ${selectedModel}, selectedModel : ${selectedModel}, serialNumber : ${serialNumber}`} />
        </div>
        <div className="product-data">
          <h4>{getTranslation("isproduct", "Is this your product?")}</h4>
          <p>{serialNumber && getTranslation("productserialnumber", "Serial number:")} {serialNumber}</p>
          <p>{selectedModel && getTranslation("productmodel", "Product model:")} {selectedModel}</p>
          <p>{materialName && getTranslation("materialname", "Product Name:")} {materialName}</p>
          <p>{materialSize && getTranslation("materialsize", "Product Size:")} {materialSize}</p>
          <div className="product-buttons">
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
          </div>
          </div>
      </div>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step3;
