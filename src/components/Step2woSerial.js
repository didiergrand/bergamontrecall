import { useState } from "react";
import modelYears from "../data/years.json";
import sapCodes from "../data/sapCodes.json";
import { getTranslation } from "../utils/i18n";

const Step2woSerial = ({
  selectedModel,
  setSelectedModel,
  getProductImage,
  handleBackButton
}) => {
  const productData = sapCodes;
  const years = modelYears.years;
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedModelName, setSelectedModelName] = useState("");
  const [formValues, setFormValues] = useState({
    country: "",
    recallReason: "",
    productName: "",
  });

  return (
    <div className="recall_step2wo">
      <div className="form-inline">
        <div className="alert alert-info">
          {getTranslation(
            "notlisted",
            "Bergamont Grandurance RD and Sweep EQ bike models that are not listed are not affected by the recall."
          )}
        </div>
        <label>
          {getTranslation("selectmodelyear", "Please select the model year:")}
        </label>
        <select
          className="form-control"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">
            --{getTranslation("selectayear", "Select a year")}--
          </option>
          {years.map((year) => (
            <option key={year.MY} value={year.MY}>
              {year.year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="form-inline">
          <label>
            {getTranslation(
              "productsmodel",
              "Please select your product's model:"
            )}
          </label>
          <select
            className="form-control"
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              const selectedOption = productData.bergamontRecall.find(
                (item) =>
                  item.SAPCode === e.target.value && item.MY === selectedYear
              );
              setSelectedModelName(selectedOption ? selectedOption.Model : "");
            }}
          >
            <option value="">
              --{getTranslation("selectamodel", "Select a model")}--
            </option>
            {productData.bergamontRecall
              .filter((item) => item.MY === selectedYear)
              .map((item) => (
                <option key={item.SAPCode} value={item.SAPCode}>
                  {item.Model}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedModel && (
        <button
          className="btn btn-primary"
          onClick={() => {
            getProductImage();
            setFormValues({
              ...formValues,
              productName: selectedModelName,
            });
          }}
        >
          {getTranslation("submit", "Submit")}
        </button>
      )}
      <br />
      <br />
      <a href="#back" onClick={() => handleBackButton()}>{getTranslation("back", "Back")}</a>
    </div>
  );
};
export default Step2woSerial;
