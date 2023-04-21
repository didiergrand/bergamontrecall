import React, { useState, useEffect, useRef } from "react";
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
  const [hasSerialNumber, setHasSerialNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [isShopClient, setIsShopClient] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [materialName, setMaterialName] = useState("");
  const [materialYear, setMaterialYear] = useState("");
  const [materialSize, setMaterialSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const doItOnceAgainRef = useRef(0);

  

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
    setSuccessMessage(null);
    if (step > 1) {
      setStep(step - 1);
      window.history.pushState(null, "", `#${step}`);
    } else {
      setStep(1);
      window.history.pushState(null, "", `#${step}`);
    }
  };
  const resetErrorMessage = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
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
      const materialName = response.data.EQUIPMENT.MATERIALNAME;
      const materialYear = response.data.EQUIPMENT.MATERIALYEAR;
      const materialSize = response.data.EQUIPMENT.SIZENAME;
      return {material, materialName, materialYear, materialSize};
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const fetchImage = async (id) => {
  try {
    const response = await axios.get(`${endpoint}/${id}/500`, {
      responseType: 'blob', // Spécifier le type de réponse en tant que blob (pour les images)
      headers: {
        'Authorization': `Basic ${tokenScott}`,
      },
    });
    const imageUrl = URL.createObjectURL(response.data);
    setImageUrl(imageUrl);
    setStep(3);
    window.history.pushState(null, "", `#${step}`);
  } catch (error) {
    console.error(error);
  }
};
const getProductImage = async (event) => {
  if (hasSerialNumber) {
    const serial = await checkSerialNumber(serialNumber);
    try {
      const result = await getEquipmentMaterial(serialNumber);
      const { material, materialName, materialYear, materialSize } = result;
      setMaterialYear(materialYear);
      setMaterialSize(materialSize);
      setMaterialName(materialName);
      if (material && serial) {
        fetchImage(material);
        setErrorMessage(null); // reset error
        setSuccessMessage(null);
      } else {
        setSuccessMessage("Your product is not affected");
      }
      console.log(material + " / " + materialName + " / " + materialYear + " / " + materialSize);
    } catch (error) {
      console.error(error.message);
      console.log(doItOnceAgainRef.current);
      if (doItOnceAgainRef.current < 3) {
        console.error("Erreur détectée, nouvelle tentative...");
        setErrorMessage("We will try to retrieve the product image. Please wait.");
        doItOnceAgainRef.current += 1;
        setTimeout(() => {
          getProductImage();
        }, doItOnceAgainRef.current * 1000);
      } else {
        console.error("Error retrieving serial number");
        setErrorMessage("Error retrieving serial number");
      }
    }
  } else {
    fetchImage(selectedModel);
  }
};

  const resetSteps = () => {
    setStep(1); // reset et recommence à l'étape 2. Pour commence à l'étape 1, mettre 1
    window.history.pushState(null, "", `#${step}`);
    setHasSerialNumber(null);
    setSerialNumber("");
    setMaterialName("");
    setMaterialYear("");
    setMaterialSize("");
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
        {errorMessage && <div className="alert alert-danger"><i className="fas fa-exclamation-triangle"></i>{" "}{errorMessage}</div>}
        {successMessage && <div className="alert alert-success"><i className="fas fa-check-circle"></i>{" "}{successMessage}</div>}
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
        <Step3 serialNumber={serialNumber} imageUrl={imageUrl} selectedModel={selectedModel} step={step} setStep={setStep} resetSteps={resetSteps} handleBackButton={handleBackButton} materialName={materialName} materialSize={materialSize} materialYear={materialYear}  />
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



