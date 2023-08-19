import { useState, useEffect, Fragment } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TabsDefault } from "./components/Tabs/TabsCustom";
// import { icons } from "./components/HeroIcons/HeroIcons";

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
    return (
      <div className="flex justify-center flex-col items-center mt-96">
        <Spinner className="h-16 w-16 text-gray-900/50" />
        <h1>Loading data ...</h1>
      </div>
    );
  }

  const data = stupidData[0].uidl[0];

  const tabsData = stupidData[0].uidl[0].children[1].children[0].map(
    (el) => el.children
  )[0];

  const steps = data.children.filter((element) => element.type === "step");
  // const status = data.children.map((elem) => elem.condition);
  // console.log(status);

  const warningToast = () => {
    activeStep === steps.length - 1 &&
      toast.warn("Completed!Please click Reset", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClick = (action) => {
    warningToast();
    switch (action) {
      case "Back":
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        break;
      case "Next":
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full px-24 py-4">
      <div className={`${data.className} mb-16 flex`}>
        <Typography className={"mx-auto"} color={"green"} variant="h1">
          {data.text}
        </Typography>
      </div>
      <Stepper activeStep={activeStep}>
        {stupidData &&
          steps.map((step, index) => (
            <Step key={index}>
              <BuildingLibraryIcon className="h-5 w-5" />

              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography variant="h6" color={"deep-purple"}>
                  {step.text}
                </Typography>
              </div>
            </Step>
          ))}
      </Stepper>
      {
        <div className="mt-32 flex justify-between">
          {steps[activeStep] ? (
            steps[activeStep].children.map((paragraph, idx) => (
              <div className="mt-32 flex mx-auto" key={idx}>
                {steps[activeStep].text === "Transactions" ? (
                  <TabsDefault tabsData={tabsData} />
                ) : (
                  paragraph.text
                )}
              </div>
            ))
          ) : (
            <div className="mt-32 mx-auto flex">
              <Typography variant="h1" color="red" textGradient>
                Configurator is Comleted!
              </Typography>
            </div>
          )}
        </div>
      }
      {activeStep === steps.length ? (
        <div className="mt-32 flex justify-between">
          <Fragment></Fragment>
          <Button className="ml-auto" onClick={handleReset}>
            Reset
          </Button>
        </div>
      ) : (
        <div className="mt-32 flex justify-between">
          {stupidData &&
            data.children.map(
              (btn, index) =>
                btn.type === "button" && (
                  <Button
                    key={index}
                    disabled={activeStep === 0 && btn.status === "true"}
                    onClick={() => handleClick(btn.text)}
                  >
                    {activeStep === steps.length - 1 && btn.text === "Next"
                      ? "Finish"
                      : btn.text}
                  </Button>
                )
            )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
