import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import SensorLineChart from "../../components/SensorChart/SensorLineChart";
import SensorInfoItem from "../../components/SensorInfo/SensorInfoItem";
import { generateOutput, fetchData } from "../../data/sensorStats";

export default function Sensor3({apiUrl, apiKey, today}) {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    async function fetchDataFromAPI() {
      try {
        const data = await fetchData(apiUrl, apiKey, today);
        const sensorOutput = generateOutput(data);
        setSensorData(sensorOutput.sensortemp[2]);
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchDataFromAPI();

    const intervalId = setInterval(fetchDataFromAPI, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[97%] w-[97%] grid-cols-sensormobile gap-4 overflow-y-scroll rounded-xl bg-[#f0f4f8] scrollbar-thin scrollbar-thumb-[#3ebd93] scrollbar-thumb-rounded-full md:grid-cols-sensortablet xl:grid-cols-sensorpc">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex w-[95%] flex-col">
          <div className="flex justify-between">
            <h1 className="mb-10 mt-4 pl-4 text-3xl font-bold">Sensor 3</h1>
            <span className="w-1/2">
              <HeaderIcon />
            </span>
          </div>
          <div className="mx-auto mb-10 w-[95%]">
            {sensorData && Object.keys(sensorData).length > 0 ? (
              <SensorInfoItem
                temperature={sensorData.temperature}
                duration={sensorData.duration}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
          <div className="flex w-[95%] flex-col items-center justify-evenly md:justify-start">
            <SensorLineChart
              apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
              apiKey="ESPOY24P92FJIH2G"
              field="field3" // Ganti dengan field yang sesuai
              today={today}
            />
            <SensorLineChart
              apiUrl="https://api.thingspeak.com/channels/2176107/feeds.json"
              apiKey="ESPOY24P92FJIH2G"
              field="field3" // Ganti dengan field yang sesuai
              today="2023-06-08"
            />
          </div>
        </div>
      </div>
    </div>
  );
}