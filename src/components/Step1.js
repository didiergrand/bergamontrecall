import { getTranslation } from "../utils/i18n";
// import image
import QRCODEimage from "../images/QRCODE-SERIALNUMBER_BGM_Fender.png";

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
        <a href="#" data-toggle="modal" data-target="#myModal">
          {getTranslation(
            "serialLocation",
            "Where is my frame number located?"
          )}
        </a>
      </div>
      <div
        class="modal fade"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img src={QRCODEimage} alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step1;
