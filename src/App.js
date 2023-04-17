import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./css/App.css";
import atob from 'atob'; // Importez la fonction 'atob' pour décoder les chaînes en base64
import serialNumbers from './data/serialNumbers.json';
import Step1 from "./components/Step1";
import Step2wSerial from "./components/Step2wSerial";
import Step2woSerial from "./components/Step2woSerial";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5dealer from "./components/Step5dealer";
import Step5customer from "./components/Step5customer";

const serialData = serialNumbers;

function App() {
  const [step, setStep] = useState(1); // commence à l'étape 2. Pour commence à l'étape 1, mettre 1
  const [hasSerialNumber, setHasSerialNumber] = useState();
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [isShopClient, setIsShopClient] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  

  const endpoint = 'https://webservices.scott-sports-test.com/scottwebservices/rest/asset';


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

  const handleBackButton = () => { 
    setErrorMessage(null);
    if (step > 1) {
      setStep(step - 1);
      window.history.pushState(null, "", `#${step}`);
    } else {
      setStep(1);
      window.history.pushState(null, "", `#${step}`);
    }
  };
  const resetErrorMessage = () => {
    console.log("resetErrorMessage");
    setErrorMessage(null);
  };
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    
  }, [step]);

  const checkSerialNumber = async (serialNumber) => {  
    console.log(serialNumber);
    return serialData.bergamontRecall.some((item) => item.serialNumber === serialNumber);
  };
  const getEquipmentMaterial = async (serialNumber) => {
    try { 
      const response = await axios.get(`https://pwd.scott-sports.com/SCOTT/ws/prod_reg/getequipment?serialnumber=${serialNumber}`, {
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
        axios.get(`${endpoint}/${material}/500`, {
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
      axios.get(`${endpoint}/${selectedModel}/500`, {
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
    setStep(1); // reset et recommence à l'étape 2. Pour commence à l'étape 1, mettre 1
    window.history.pushState(null, "", `#${step}`);
    setHasSerialNumber(null);
    setSerialNumber("");
    setSelectedModel(null);
    resetErrorMessage();
    setIsShopClient(null);
  };

  return (
    <div className="container recall-container">
      <div className="row">
      <div className="col-xs-12">
      <h1>Recall Application</h1>
      <div className="recall_steps">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {step === 1 && (
          <Step1 setHasSerialNumber={setHasSerialNumber} setStep={setStep} step={step}/>
        )}
        {step === 2 && hasSerialNumber && (
          <Step2wSerial serialNumber={serialNumber} setSerialNumber={setSerialNumber} getProductImage={getProductImage} handleBackButton={handleBackButton} resetErrorMessage={resetErrorMessage}   />
        )}
        {step === 2 && !hasSerialNumber && (
          <Step2woSerial selectedModel={selectedModel} setSelectedModel={setSelectedModel} getProductImage={getProductImage} handleBackButton={handleBackButton} />
        )}
        {step === 3 && (
        <Step3 imageUrl={imageUrl} selectedModel={selectedModel} step={step} setStep={setStep} resetSteps={resetSteps} handleBackButton={handleBackButton}  />
        )}
        {step === 4 && (
          <Step4 setIsShopClient={setIsShopClient} step={step} setStep={setStep} handleBackButton={handleBackButton} />
        )}
        {step === 5 && isShopClient === false && (
          <Step5dealer handleBackButton={handleBackButton} />
        )}
        {step === 5 && isShopClient === true && (
          <Step5customer handleBackButton={handleBackButton} />
        )}
    </div>
    </div>
    </div>
    </div>
  );
}
export default App;



