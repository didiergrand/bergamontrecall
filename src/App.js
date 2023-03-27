import React, { useState } from "react";
import axios from 'axios';
import "./App.css";

const productData = {
      "bergamontRecall": [
        {"serialNumber": "275545", "modelName": "Grandurance RD 7"},
        {"serialNumber": "275546", "modelName": "Grandurance RD 5"},
        {"serialNumber": "275549", "modelName": "Sweep 6 EQ"},
        {"serialNumber": "275550", "modelName": "Sweep 5 EQ"},
        {"serialNumber": "281037", "modelName": "Sweep 6 EQ"},
        {"serialNumber": "281038", "modelName": "Sweep 4 EQ"},
        {"serialNumber": "281075", "modelName": "Grandurance RD 7"},
        {"serialNumber": "281076", "modelName": "Grandurance RD 5"},
        {"serialNumber": "281077", "modelName": "Grandurance RD 3 Petrol"},
        {"serialNumber": "281078", "modelName": "Grandurance RD 3 Silver"},
        {"serialNumber": "286810", "modelName": "Grandurance RD Elite"},
        {"serialNumber": "286811", "modelName": "Grandurance RD 7"},
        {"serialNumber": "286812", "modelName": "Grandurance RD 5"},
        {"serialNumber": "286813", "modelName": "Grandurance RD 5 FMN"},
        {"serialNumber": "286814", "modelName": "Grandurance RD 3 Black"},
        {"serialNumber": "286815", "modelName": "Grandurance RD 3 Silver"},
        {"serialNumber": "277445", "modelName": "BGM Fenderset Allroad 20"},
        {"serialNumber": "291700", "modelName": "BGM Fenderset Grandurance Alloy W50 22"},
        {"serialNumber": "291699", "modelName": "BGM Fenderset Grandurance Carbon W50 22"}
      ]
    };

function App() {
  const [step, setStep] = useState(2); // commence à l'étape 2. Pour commence à l'étape 1, mettre 1
  const [hasSerialNumber, setHasSerialNumber] = useState(null);
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [isProductCorrect, setIsProductCorrect] = useState(null);
  const [isShopClient, setIsShopClient] = useState(null);
  const [selectedModelName, setSelectedModelName] = useState("");
  const [formValues, setFormValues] = useState({
    country: "",
    recallReason: "",
    productName: "",
  });


  const [imageUrl, setImageUrl] = useState('');
  const endpoint = 'https://cms.scott-sports-test.com/scottwebservices/rest/asset';


  const getProductImage = (event) => {
    axios.get(`${endpoint}/${selectedModel}/500`, {
      responseType: 'blob', // Spécifier le type de réponse en tant que blob (pour les images)
      auth: {
        username: "awswebservice_test",
        password: "Nrx8?rjX$e$f-22K02"
      }
    })
    .then(response => {
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
      setStep(3);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const resetSteps = () => {
    setStep(2); // reset et recommence à l'étape 2. Pour commence à l'étape 1, mettre 1
    setHasSerialNumber(null);
    setSerialNumber("");
    setSelectedModel(null);
    setIsProductCorrect(null);
    setIsShopClient(null);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log("Form values:", formValues);
  };

  return (
    <div className="App recall-container">
      <h1>Recall Application</h1>
      {step === 1 && (
        <div>
          <p>Do you have your product's serial number?</p>
          <button
            onClick={() => {
              setHasSerialNumber(true);
              setStep(2);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setHasSerialNumber(false);
              setStep(2);
            }}
          >
            No
          </button>
        </div>
      )}

      {step === 2 && hasSerialNumber && (
        <div>
          <p>Please enter your product's serial number:</p>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          <button onClick={getProductImage}>Submit</button>
        </div>
      )}

      {step === 2 && !hasSerialNumber && (
        <div>
          <p>Please select your product's model:</p>
          <select 
            onChange={(e) => {
              setSelectedModel(e.target.value);
              const selectedOption = productData.bergamontRecall.find(
                (item) => item.serialNumber === e.target.value
              );
              setSelectedModelName(selectedOption ? selectedOption.modelName : "");
            }}
            >
            <option value="">--Select a model--</option>
            {productData.bergamontRecall.map((item) => (
              <option key={item.serialNumber} value={item.serialNumber}>
                {item.modelName}
              </option>
            ))}
          </select>
          <button 
            onClick={() => {
              getProductImage();
              setFormValues({ ...formValues, productName: selectedModelName });
            }}
          >Submit</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>Here is the image of your product:</p>
          <img src={imageUrl} alt={`product ${serialNumber} ${selectedModel}`} />
          <p>Is this your product?</p>
          <button onClick={() => setStep(4)}>Yes</button>
          <button onClick={() => resetSteps()}>No</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <p>What best describes you?</p>      
          <button 
          onClick={() => {
            setIsShopClient(true);
            setStep(5);
          }}
          >I purchased the product in a store</button>
          <button 
          onClick={() => {
            setIsShopClient(false);
            setStep(5);
          }}>I am a dealer of the product</button>
        </div>
      )}

      {step === 5 && isShopClient === false && (
        <div>
          <h2>Thank you !</h2>
          <p>
            Please visit the following address to register for the dealer protection program:
            <a href="https://customerportal.scott-sports.com/login">
              https://customerportal.scott-sports.com/login
            </a>
          </p>
        </div>
      )}

      {step === 5 && isShopClient === true && (
        <div>
          <p>
            Please find your dealer at the following address and contact them to handle your recall.
          </p>
          <a className="btn" href="https://www.scott-sports.com/global/en/dealers/locator">Find your dealer</a>
          <p>If you still have questions, you can contact us by filling out this <a 
              onClick={() => {
                setStep(6);
              }}>contact form</a></p>
        </div>
      )}

{step === 6 && (



<form onSubmit={handleSubmitForm}>
<label>
        Your country:
        <input
          type="text"
          value={formValues.country}
        />
      </label>
      <br />
      <label>
        Recall reason:
        <input
          type="text"
          value={formValues.recallReason}
        />
      </label>
      <br />
      <label>
        Product name:
        <input
          type="text"
          value={formValues.productName}
          readOnly
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )}
</div>
  );
}
export default App;



