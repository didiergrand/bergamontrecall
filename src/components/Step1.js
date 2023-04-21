import { getTranslation } from "../utils/i18n";

const Step1 = ({ setHasSerialNumber, setStep, step }) => {
  return (
    <div className="recall_step1">
      <p>
        {getTranslation(
          "titleStep1",
          "Do you have the serial number of your Bergamont Grandurance RD or Sweep EQ Bike?"
        )}
      </p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setHasSerialNumber(true);
          setStep(2);
          window.history.pushState(null, "", `#${step}`);
        }}
      >
        {getTranslation("yes", "Yes")}
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          setHasSerialNumber(false);
          setStep(2);
          window.history.pushState(null, "", `#${step}`);
        }}
      >
        {getTranslation("no", "No")}
      </button>
      <br />
      <div>
        <button className="btn btn-link" data-toggle="modal" data-target="#serialLocationModal">
          {getTranslation(
            "serialLocation",
            "Where is my frame number located?"
          )}
        </button>
      </div>
      <div
        className="modal fade"
        id="serialLocationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img src="https://assets.bergamont.com/pages/recall/recall-serial-number.png" alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step1;
