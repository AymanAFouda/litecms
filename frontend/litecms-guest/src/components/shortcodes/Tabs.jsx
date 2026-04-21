import { useEffect } from "react";

const tabs = ["All Content", "Articles", "Galleries", "Videos"]

function Tabs({ selectedTab, setSelectedTab }) {

  //change tab item on click
  const handleChangTab = (event, index) => {
    setSelectedTab(tabs[index])
  };

  return (
    <div className="relative border-b-[2px] border-primary">
      <ul className="mb-0 flex list-none items-center pl-0">  
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`font-secondary m-0 cursor-pointer px-2 sm:px-8 py-3 font-bold dark:text-darkmode-light ${
              selectedTab === tab? "active-tab !bg-primary text-white" : "text-dark"
            }`}
            onClick={(e) => handleChangTab(e, index)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;