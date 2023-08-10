export const Stepper = ({ steps, activeStep }) => {
  function getStepClass(step) {
    let cls = "step";
    if (activeStep === step) {
      cls += " step-active";
    } else if (activeStep > step) {
      cls += " step-done";
    } else {
      cls += " step-inactive";
    }
    return cls;
  }

  return (
    <div className="steps-container">
      {steps.map((label, index) => (
        <div className={getStepClass(index)} key={index}>
          <div>
            <div className="circle">{index + 1}</div>
          </div>
          <div className="label">{label}</div>
          {index < steps.length - 1 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};
