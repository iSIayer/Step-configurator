import React, { useState, useEffect } from "react";

export const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stupidData, setStupidData] = useState([]);

  useEffect(() => {
    fetch(
      "http://68.183.30.252:3030/api/v1/projects/getOne/fSxMIaDZlYjI5jMWrByqT"
    )
      .then((response) => response.json())
      .then((res) => {
        setStupidData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  }, []);

  if (stupidData.length === 0) {
    return <p>Download data...</p>;
  }

  const data = stupidData[0].uidl[0];

  const handleNextStep = () => {
    if (activeStep < data.children.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className={`${data.className} w-full px-24 py-4`}>
      <div className={"flex justify-around items-center"}>
        {stupidData &&
          data.children.map(
            (step, index) =>
              step.type === "div" && (
                <div key={index} className={"flex flex-col"}>
                  <div
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`${index === activeStep && "active"} ${
                      step.className
                    } cursor-pointer mb-96`}
                  >
                    {step.text}
                  </div>
                  {step.children.map((elem, idx) => (
                    <div key={idx}>
                      <h2 key={idx} className={`${elem.className}`}>
                        {elem.text}
                      </h2>
                    </div>
                  ))}
                </div>
              )
          )}
      </div>

      <div className={"flex justify-between mt-96"}>
        {stupidData &&
          data.children.map((btn, index) =>
            btn.type === "button" ? (
              <button
                disabled={activeStep === 0}
                key={index}
                onClick={
                  btn.text === "Finish" ? handleNextStep : handlePrevStep
                }
                className={`${btn.className} cursor-pointer px-8 py-2 rounded-xl bg-blue-gray-500`}
              >
                {btn.text}
              </button>
            ) : null
          )}
      </div>
    </div>
  );
};
