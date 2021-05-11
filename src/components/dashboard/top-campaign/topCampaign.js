import React, { useState, useEffect } from "react";
import { Progress, Card, CardBody } from "reactstrap";
import campaignService from "../../../services/configurations/campaigns.service";

const TopCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [first, setFirst] = useState(true);
  const title = [];
  const percent = [];

  const getCampaignList = () => {
    campaignService
      .getAll()
      .then((response) => {
        setCampaigns(response.data);
        setFirst(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (first) {
      getCampaignList();
    } else {
      let i = setInterval(() => {
        getCampaignList();
      }, 15000);
      return () => clearInterval(i);
    }
  }, [first]);

  function orderCampaigns(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  campaigns.sort(orderCampaigns("percent", "desc"));
  for (let i = 0; i < campaigns.length; i++) {
    title[i] = campaigns[i].name;
    percent[i] = campaigns[i].percent;
  }

  return (
    <Card>
      <CardBody>
        <div className="d-md-flex align-items-center">
          <h4 className="card-title">Top Campaigns</h4>
        </div>

        <div className="d-flex no-block align-items-center mb-2">
          <span>{title[0]}</span>
          <div className="ml-auto">
            <span className="text-success"> {percent[0]}% </span>
          </div>
        </div>
        <Progress className="mb-3" animated color="success" value={percent[0]} />

        <div className="d-flex no-block align-items-center mb-2">
          <span>{title[1]}</span>
          <div className="ml-auto">
            <span className="text-info"> {percent[1]}% </span>
          </div>
        </div>
        <Progress className="mb-3" animated color="info" value={percent[1]} />

        <div className="d-flex no-block align-items-center mb-2">
          <span>{title[2]}</span>
          <div className="ml-auto">
            <span className="text-warning"> {percent[2]}% </span>
          </div>
        </div>
        <Progress className="mb-3" animated color="warning" value={percent[2]} />

        <div className="d-flex no-block align-items-center mb-2">
          <span>{title[3]}</span>
          <div className="ml-auto">
            <span className="text-danger"> {percent[3]}% </span>
          </div>
        </div>
        <Progress className="mb-3" animated color="danger" value={percent[3]} />
      </CardBody>
    </Card>
  );
};

export default TopCampaign;
