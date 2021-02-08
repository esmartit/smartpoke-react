import React from "react";

import { Progress, Card, CardBody } from "reactstrap";

const TopCampaign = () => {
    return (
      <Card>
        <CardBody>
          <div className="d-md-flex align-items-center">
            <h4 className="card-title">Top Campaigns</h4>
          </div>

          <div className="d-flex no-block align-items-center mb-2">
            <span>Campaign 1</span>
            <div className="ml-auto">
              <span className="text-success"> 90% </span>
            </div>
          </div>
          <Progress className="mb-3" animated color="success" value={90} />

          <div className="d-flex no-block align-items-center mb-2">
            <span>Campaign 2</span>
            <div className="ml-auto">
              <span className="text-info"> 73% </span>
            </div>
          </div>
          <Progress className="mb-3" animated color="info" value={73} />

          <div className="d-flex no-block align-items-center mb-2">
            <span>Campaign 3</span>
            <div className="ml-auto">
              <span className="text-warning"> 63% </span>
            </div>
          </div>
          <Progress className="mb-3" animated color="warning" value={63} />

          <div className="d-flex no-block align-items-center mb-2">
            <span>Campaign 4</span>
            <div className="ml-auto">
              <span className="text-danger"> 18% </span>
            </div>
          </div>
          <Progress className="mb-3" animated color="danger" value={18} />
        </CardBody>
      </Card>
    );
};

export default TopCampaign
