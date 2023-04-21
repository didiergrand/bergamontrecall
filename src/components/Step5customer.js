import { getTranslation } from "../utils/i18n";


const Step5customer = ({ handleBackButton }) => {
  return (
    <div className="recall_step5">
      <p>
        {getTranslation(
          "contactyourplace",
          "Please contact your place of purchase as a first step or find a Bergamont dealer’s contact information. Any Bergamont dealer will handle your recall at his store free of cost."
        )}
      </p>
      <a href="/dealers/locator" className="btn btn-primary" target="_blank">
        {getTranslation("findyourdealer", "Find your dealer")}
      </a>
      <br />
      <p>
        {getTranslation(
          "pleasefill",
          "If you have any questions, please fill out our contact form."
        )}{" "}<br />
        <a href="#email" data-toggle="modal" data-target="#contactModal">
          {getTranslation("contactform", "Contact form")}
        </a>
      <div>
      </div>
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-sm" role="document">
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
               Email : <a href="mailto:recall@bergamont.de" target="_blank">recall@bergamont.de</a>
            </div>
          </div>
        </div>
      </div>
      </p>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step5customer;
