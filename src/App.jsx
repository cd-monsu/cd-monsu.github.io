import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { sensorUtils } from "./data/sensorUtils";
import DynamicSensorPage from "./pages/DynamicSensorPage/DynamicSensorPage";
import { apiConfigurations2 } from "./data/apiConfigurations";
import SignUp from "./components/Auth/SignUp.jsx";
import Login from "./components/Auth/Login.jsx"
import Protected from "./components/Auth/Protected.jsx"
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import NewProfile from "./pages/Profile/NewProfile.jsx";
registerLocale("id", id);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAPI = apiConfigurations2();

    sensorUtils(getAPI)
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          {data
            ? Object.keys(data).map((sensor) => (
                <Route
                  path={`/temperature-monitoring-app/${data[
                    sensor
                  ].name.replace(/\s+/g, "-")}`}
                  key={sensor}
                  element={
                    <DynamicSensorPage data={data} name={data[sensor].name} />
                  }
                />
              ))
            : ""}
          <Route exact path="/temperature-monitoring-app/" element={<Home />} />
          <Route path="/temperature-monitoring-app/about" element={<About />} />
          <Route
            path="/temperature-monitoring-app/signup"
            element={<SignUp />}
          />
          <Route path="/temperature-monitoring-app/login" element={<Login />} />
          <Route
            path="/temperature-monitoring-app/auth"
            element={<Protected />}
          />
          <Route
            path="/temperature-monitoring-app/dashboard"
            element={<Dashboard data={data} />}
          />
          <Route
            path="/temperature-monitoring-app/profile"
            element={<NewProfile data={data}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
