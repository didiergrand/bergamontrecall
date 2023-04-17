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
        )}{" "}
        <a href="/company/contact" target="_blank">
          {getTranslation("contactform", "Contact form")}
        </a>
      </p>
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step5customer;
