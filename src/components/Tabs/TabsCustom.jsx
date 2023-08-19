import { useState } from "react";

export function TabsDefault({ tabsData }) {
  console.log(tabsData);
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-center border-b border-gray-200 pb-3 mb-8 w-full">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`cursor-pointer py-2  w-48 text-center ${
              activeTab === tab.id ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {tab.text}
          </div>
        ))}
      </div>
      <div className="py-4">
        {tabsData.map(
          (tab) =>
            tab.id === activeTab && (
              <div
                key={tab.id}
                className="text-gray-800 flex flex-col items-center"
              >
                {tab.children.map((child) => (
                  <div className="p-5" key={child.id}>
                    {child.text}
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}
