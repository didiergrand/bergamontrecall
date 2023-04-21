import { getTranslation } from "../utils/i18n";

const Step2wSerial = ({
  serialNumber,
  setSerialNumber,
  getProductImage,
  handleBackButton,
  resetErrorMessage,
}) => {
  return (
    <div className="recall_step2w">
      <p>
        {getTranslation(
          "productserial",
          "Please enter your product's serial number:"
        )}
      </p>
      <form className="form-inline">
        <input
          className="form-control"
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            getProductImage();
            resetErrorMessage();
          }}
        >
          {getTranslation("submit", "Submit")}
        </button>
      </form>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step2wSerial;
