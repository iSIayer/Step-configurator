import React, { useState } from "react";
import "./App.css";

import { Stepper } from "./components/Stepper/Stepper";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { Payment } from "./components/Payment/Payment";
import { Confirmation } from "./components/Confirmation/Confirmation";
import { Completed } from "./components/Completed/Completed";

const App = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "User details",
    "Payment",
    "Booking confirmation",
    "Completed",
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UserDetails />;
      case 1:
        return <Payment />;
      case 2:
        return <Confirmation />;
      case 3:
        return <Completed />;
      default:
        return null;
    }
  }

  return (
    <div>
      <Stepper steps={steps} activeStep={activeStep} />
      <div style={{ padding: "20px" }}>
        {getSectionComponent()}
        {activeStep !== 0 && activeStep !== steps.length - 1 && (
          <button onClick={() => setActiveStep(activeStep - 1)}>
            Previous
          </button>
        )}
        {activeStep !== steps.length - 1 && (
          <button onClick={() => setActiveStep(activeStep + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default App;
