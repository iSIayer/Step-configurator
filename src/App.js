import { useState, useEffect } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  UserIcon,
  PhoneArrowUpRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { Payment } from "./components/Payment/Payment";
import { Transactions } from "./components/Confirmation/Transactions";
import { Completed } from "./components/Completed/Completed";

export function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [stupidData, setStupidData] = useState(null);

  useEffect(() => {
    fetch(
      "http://68.183.30.252:3030/api/v1/projects/getOne/fSxMIaDZlYjI5jMWrByqT"
    )
      .then((response) => response.json())
      .then((res) => {
        setStupidData(res.data[0].uidl[0].children);
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  }, []);

  if (!stupidData) {
    return <h1>Loading...</h1>;
  }

  const stepsContent = [
    <UserDetails stupidData={stupidData} />,
    <Payment stupidData={stupidData} />,
    <Transactions />,
    <Completed />,
  ];

  const handleNext = () =>
    setActiveStep((cur) => Math.min(cur + 1, stepsContent.length - 1));
  const handlePrev = () => setActiveStep((cur) => Math.max(cur - 1, 0));

  const appData = stupidData;
  console.log(appData);

  return (
    appData && (
      <div className="w-full px-24 py-4">
        <Stepper activeStep={activeStep}>
          <Step onClick={() => setActiveStep(0)}>
            <UserIcon className="h-5 w-5" />
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <CurrencyDollarIcon className="h-5 w-5" />
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <PhoneArrowUpRightIcon className="h-5 w-5" />
          </Step>
          <Step onClick={() => setActiveStep(3)}>
            <ShieldCheckIcon className="h-5 w-5" />
          </Step>
        </Stepper>
        <div className="mt-32">
          <Typography variant="h2" color="blue-gray">
            {stepsContent[activeStep]}
          </Typography>
        </div>
        <div className="mt-20 flex justify-between">
          <Button onClick={handlePrev} disabled={activeStep === 0}>
            {/* {uidata.children[0].text} */}
            Next
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === stepsContent.length - 1}
          >
            {/* {uidata.children[5].text} */}
            Finish
          </Button>
        </div>
      </div>
    )
  );
}
