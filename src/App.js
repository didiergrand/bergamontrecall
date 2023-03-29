import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";
import atob from 'atob'; // Importez la fonction 'atob' pour décoder les chaînes en base64


const productData = {
      "bergamontRecall": [
        {"productNumber": "275545", "modelName": "Grandurance RD 7"},
        {"productNumber": "275546", "modelName": "Grandurance RD 5"},
        {"productNumber": "275549", "modelName": "Sweep 6 EQ"},
        {"productNumber": "275550", "modelName": "Sweep 5 EQ"},
        {"productNumber": "281037", "modelName": "Sweep 6 EQ"},
        {"productNumber": "281038", "modelName": "Sweep 4 EQ"},
        {"productNumber": "281075", "modelName": "Grandurance RD 7"},
        {"productNumber": "281076", "modelName": "Grandurance RD 5"},
        {"productNumber": "281077", "modelName": "Grandurance RD 3 Petrol"},
        {"productNumber": "281078", "modelName": "Grandurance RD 3 Silver"},
        {"productNumber": "286810", "modelName": "Grandurance RD Elite"},
        {"productNumber": "286811", "modelName": "Grandurance RD 7"},
        {"productNumber": "286812", "modelName": "Grandurance RD 5"},
        {"productNumber": "286813", "modelName": "Grandurance RD 5 FMN"},
        {"productNumber": "286814", "modelName": "Grandurance RD 3 Black"},
        {"productNumber": "286815", "modelName": "Grandurance RD 3 Silver"},
        {"productNumber": "277445", "modelName": "BGM Fenderset Allroad 20"},
        {"productNumber": "291700", "modelName": "BGM Fenderset Grandurance Alloy W50 22"},
        {"productNumber": "291699", "modelName": "BGM Fenderset Grandurance Carbon W50 22"}
      ]
    };
    const serialData = {
          "bergamontRecall": [
            {"serialNumber": "STR12C45213070134S1"},
            {"serialNumber": "STR12C45213070134S2"},
            {"serialNumber": "STR12C45213070134S3"},
            {"serialNumber": "STR12C45213070134S4"},
            {"serialNumber": "STR12C45213070134S5"},
            {"serialNumber": "STR12C45213070134S6"},
            {"serialNumber": "STR12C45213070134S7"},
            {"serialNumber": "STR12C45213070134S8"},
            {"serialNumber": "STR12C45213070134S9"},
            {"serialNumber": "STR12C45213070134S10"},
            {"serialNumber": "STR12C45213070134S11"},
            {"serialNumber": "STR12C45213070134S12"},
            {"serialNumber": "STR12C45213070134S13"},
          ]
        };

function App() {
  const [step, setStep] = useState(1); // commence à l'étape 2. Pour commence à l'étape 1, mettre 1
  const [hasSerialNumber, setHasSerialNumber] = useState(null);
  const [serialNumber, setSerialNumber] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [isShopClient, setIsShopClient] = useState(null);
  const [selectedModelName, setSelectedModelName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [formValues, setFormValues] = useState({
    country: "",
    recallReason: "",
    productName: "",
  });


  const endpoint = 'https://webservices.scott-sports-test.com/scottwebservices/rest/asset';
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';


  const usernameScott = process.env.REACT_APP_USERNAMESCOTT;
  const passwordScott = atob(process.env.REACT_APP_PASSWORDSCOTT64);
  let tokenScott = null;
  if (!usernameScott || !passwordScott) {
    console.error("usernameScott or passwordScott is missing. Please check your environment variables.");
  } else {
    tokenScott = btoa(`${usernameScott}:${passwordScott}`);
  }

  const usernameSap = process.env.REACT_APP_USERNAMESAP;
  const passwordSap = atob(process.env.REACT_APP_PASSWORDSAP64);
  let tokenSap = null;
  if (!usernameSap || !passwordSap) {
    console.error("usernameSap or passwordSap is missing. Please check your environment variables.");
  } else {
    tokenSap = btoa(`${usernameSap}:${passwordSap}`);
  }


  useEffect(() => {
    const handleBackButton = () => {
      if (step > 1) {
        setStep(step - 1);
        window.history.pushState(null, "", `#${step}`);
      } else {
        setStep(1);
        window.history.pushState(null, "", `#${step}`);
      }
    };

    const handlePopState = (event) => {
      event.preventDefault();
      handleBackButton();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    
  }, [step]);
  



  const checkSerialNumber = async (serialNumber) => {  
    return serialData.bergamontRecall.some((item) => item.serialNumber === serialNumber);
  };


  
  const getEquipmentMaterial = async (serialNumber) => {
    try { 
      const response = await axios.get(`${corsAnywhereUrl}http://psecsprd.r53.scott.sap:60000/SCOTT/ws/prod_reg/getequipment?serialnumber=${serialNumber}`, {
        responseType: 'blob', // Spécifier le type de réponse en tant que blob (pour les images)
        headers: {
          'Authorization': `Basic ${tokenSap}`,
        },
      });
      const material = response.data.EQUIPMENT.MATERIAL;
      return material;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  
  const getProductImage = async (event) => {
    
    if (hasSerialNumber) {
      const material = await getEquipmentMaterial(serialNumber);
      const serial = await checkSerialNumber(serialNumber);
      console.log(serial);
      if (material && serial) {
        console.log(tokenScott);
        axios.get(`${corsAnywhereUrl}${endpoint}/${material}/500`, {
          responseType: 'blob', // Spécifier le type de réponse en tant que blob (pour les images)
          headers: {
            'Authorization': `Basic ${tokenScott}`,
          },
        })
        .then(response => {
          const imageUrl = URL.createObjectURL(response.data);
          setImageUrl(imageUrl);
          setStep(3);
          window.history.pushState(null, "", `#${step}`);
        })
        .catch(error => {
          console.error(error);
        });
      } else if (!serial) {
        setErrorMessage("Numéro de série non valide.");
      } else if (!material) {
        setErrorMessage("Erreur lors de la récupération du numéro de série.");
      } 
    } else {
      console.log(tokenScott);
      axios.get(`${corsAnywhereUrl}${endpoint}/${selectedModel}/500`, {
        responseType: 'blob', // Spécifier le type de réponse en tant que blob (pour les images)
        headers: {
          'Authorization': `Basic ${tokenScott}`,
        },
      })
      .then(response => {
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
        setStep(3);
        window.history.pushState(null, "", `#${step}`);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  






  const resetSteps = () => {
    setStep(2); // reset et recommence à l'étape 2. Pour commence à l'étape 1, mettre 1
    window.history.pushState(null, "", `#${step}`);
    setHasSerialNumber(null);
    setSerialNumber("");
    setSelectedModel(null);
    
    setIsShopClient(null);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log("Form values:", formValues);
  };
  return (
    <div className="App recall-container">
      <h1>Recall Application</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {step === 1 && (
        <div>
          <p>Do you have your product's serial number?</p>
          <button
            onClick={() => {
              setHasSerialNumber(true);
              setStep(2);
              window.history.pushState(null, "", `#${step}`);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setHasSerialNumber(false);
              setStep(2);
              window.history.pushState(null, "", `#${step}`);
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
                (item) => item.productNumber === e.target.value
              );
              setSelectedModelName(selectedOption ? selectedOption.modelName : "");
            }}
            >
            <option value="">--Select a model--</option>
            {productData.bergamontRecall.map((item) => (
              <option key={item.productNumber} value={item.productNumber}>
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
          <img src={imageUrl} alt={`product ${productNumber} ${selectedModel}`} />
          <p>Is this your product?</p>
          <button onClick={() => {
            setStep(4);
            window.history.pushState(null, "", `#${step}`);
          }}
          >Yes</button>
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
            window.history.pushState(null, "", `#${step}`);
          }}
          >I purchased the product in a store</button>
          <button 
          onClick={() => {
            setIsShopClient(false);
            setStep(5);
            window.history.pushState(null, "", `#${step}`);
          }}>I am a dealer of the product</button>
        </div>
      )}

      {step === 5 && isShopClient === false && (
        <div>
          <h2>Thank you !</h2>
          <p>
            Please visit the following address to register for the dealer protection program:
            <a href="https://customerportal.scott-sports.com/login">
              customerportal login
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
                window.history.pushState(null, "", `#${step}`);
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



