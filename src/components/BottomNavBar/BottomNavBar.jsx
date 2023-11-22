import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dynamicMenusData } from "../../data/dynamicMenusData";
import { AppContext } from "../../data/AppProvider";

const SubNav = ({ subNav, showSubNav }) => {
  if (!showSubNav) {
    return null; 
  }

  const splitIndex = Math.ceil(subNav.length / 2);
  const column1 = subNav.slice(0, splitIndex);
  const column2 = subNav.slice(splitIndex);

  return (
    <div className="fixed bottom-20 left-0 right-0 flex flex-col items-center bg-[#06b6d4] p-4 w-[70%] mx-auto rounded">
      <div className="flex">
        <div className="flex flex-col items-start space-y-1 pr-2">
          {column1.map((subItem) => (
            <Link
              to={subItem.route}
              key={subItem.idsubsensor}
              className="text-white text-sm"
            >
              {subItem.sensorname}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-start space-y-1 pl-2">
          {column2.map((subItem) => (
            <Link
              to={subItem.route}
              key={subItem.idsubsensor}
              className="text-white text-sm"
            >
              {subItem.sensorname}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const BottomNavigationBar = ({data}) => {
  const { activeMenu, showSensorSubNav, handleSensorClick } = useContext(AppContext);
  const menus = dynamicMenusData(data);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around bg-[#3ebd93] p-4 h-20">
      {menus.map((menu) => (
        <div key={menu.id} className="relative flex flex-col items-center">
          <Link
            to={menu.route}
            onClick={() => handleSensorClick(menu)}
            className={`flex flex-col items-center text-white ${
              activeMenu === menu.route ? "bg-[#f0b429] rounded p-3" : ""
            }`}
          >
            {menu.icon}
            <span className="text-xs">{menu.name}</span>
          </Link>
          {menu.subNav && activeMenu === menu.route && (
            <SubNav subNav={menu.subNav} showSubNav={showSensorSubNav} />
          )}
        </div>
      ))}
    </nav>
  );
};

export default BottomNavigationBar;
