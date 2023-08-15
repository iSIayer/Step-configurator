import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
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

  if (!stupidData) {
    return (
      <div className="flex justify-center flex-col items-center mt-96">
        <Spinner className="h-16 w-16 text-gray-900/50" />
        <h1>Loading data ...</h1>
      </div>
    );
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

  const data = stupidData[0].uidl[0];

  return (
    data && (
      <div className={`${data.className} w-full px-24 py-4`}>
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
            {/* {appData.children[0].text} */}
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

// import React, { useState, useEffect } from "react";

// export const App = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const [stupidData, setStupidData] = useState([]);

//   useEffect(() => {
//     fetch(
//       "http://68.183.30.252:3030/api/v1/projects/getOne/fSxMIaDZlYjI5jMWrByqT"
//     )
//       .then((response) => response.json())
//       .then((res) => {
//         setStupidData(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data from backend:", error);
//       });
//   }, []);

//   if (stupidData.length === 0) {
//     return <p>Download data...</p>;
//   }

//   const data = stupidData[0].uidl[0];

//   return (
//     <div className={`${data.className} w-full px-24 py-4`}>
//       <div className={"flex justify-around items-center"}>
//         {stupidData &&
//           data.children.map(
//             (step, index) =>
//               step.type === "div" && (
//                 <div key={index} className={"flex flex-col"}>
//                   <div
//                     key={index}
//                     onClick={() => setActiveStep(index)}
//                     className={`${index === activeStep && "active"} ${
//                       step.className
//                     } cursor-pointer mb-96`}
//                   >
//                     {step.text}
//                   </div>
//                   {step.children.map((elem, idx) => (
//                     <div key={idx}>
//                       <h2 key={idx} className={`${elem.className}`}>
//                         {elem.text}
//                       </h2>
//                     </div>
//                   ))}
//                 </div>
//               )
//           )}
//       </div>

//       <div className={"flex justify-between mt-96"}>
//         {stupidData &&
//           data.children.map((btn, index) =>
//             btn.type === "button" ? (
//               <button
//                 key={index}
//                 onClick={() =>
//                   console.log("Здесь должна быть функция смены step")
//                 }
//                 className={`${btn.className} cursor-pointer px-8 py-2 rounded-xl bg-blue-gray-500`}
//               >
//                 {btn.text}
//               </button>
//             ) : null
//           )}
//       </div>
//     </div>
//   );
// };
