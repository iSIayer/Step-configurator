import { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  UserIcon,
  PhoneArrowUpRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { Payment } from "./components/Payment/Payment";
import { Confirmation } from "./components/Confirmation/Confirmation";
import { Completed } from "./components/Completed/Completed";

export function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full px-24 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              <UserDetails />
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Details about yout account.
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CurrencyDollarIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              <Payment />
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Details about yout account.
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <PhoneArrowUpRightIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              <Confirmation />
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Details about yout account.
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(3)}>
          <ShieldCheckIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 3 ? "blue-gray" : "gray"}
            >
              <Completed />
            </Typography>
            <Typography
              color={activeStep === 3 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Details about yout account.
            </Typography>
          </div>
        </Step>
      </Stepper>
      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
