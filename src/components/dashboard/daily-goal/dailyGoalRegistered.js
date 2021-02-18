import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import sseDailyGoalRegistered from "./sseDailyGoal";
import valueService from "../../../services/bigdata-settings/values.service";

const timeZone = process.env.REACT_APP_TIME_ZONE || 'Europe/Madrid';
const urlBase = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const restApi = urlBase+'/daily_goal_registered/?resourcePath=/sensor-activity/daily-registered-count/?timezone='+timeZone;

const DailyGoalRegistered = () => {
  const [valueData, setValueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      getValueList();
    }
  }, [loading]);

  const getValueList = () => {
    valueService
      .getAll()
      .then((response) => {
        setValueData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err.message);
      });
  };

  const valuesList = valueData.map((data) => {
    return {
      code: data.valueCode,
      value: data.value,
    };
  });

  const getValue = (code = null) => {
    let valueByCode = 0;
    let valueData = valuesList.find((o) => o.code === code);
    if (valueData) {
      valueByCode = valueData.value;
    }
    return valueByCode;
  };

  const registeredValue = !loading ? getValue("daily_goal_registered") : 1;

  const optionsRegistered = {
    chart: {
      id: "gauge-chart",
    },
  };

  const data = sseDailyGoalRegistered.useEventDailyGoal(restApi);

  if (!data) {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          Registered {registeredValue}
        </div>
        <GaugeChart
          options={optionsRegistered}
          nrOfLevels={30}
          colors={["#DC3545", "#28A745"]}
          arcWidth={0.3}
          percent={Math.round((0 / registeredValue) * 100) / 100}
          textColor={"#263238"}
          needleColor={"#B3B3B3"}
          needleBaseColor={"#B3B3B3"}
          marginInPercent={0.09}
        />
      </React.Fragment>
    );  
  }
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        Registered {registeredValue}
      </div>
      <GaugeChart
        options={optionsRegistered}
        nrOfLevels={30}
        colors={["#DC3545", "#28A745"]}
        arcWidth={0.3}
        percent={Math.round((data.count / registeredValue) * 100) / 100}
        textColor={"#263238"}
        needleColor={"#B3B3B3"}
        needleBaseColor={"#B3B3B3"}
        marginInPercent={0.09}
      />
    </React.Fragment>
  );
};

export default DailyGoalRegistered;
