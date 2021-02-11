import React from "react";
import { Row, Col } from "reactstrap";
import {
  CountVisitors, 
  CountRegistered,
  VisitorByTime,
  TopCampaign,
  AvgDwellTime,
  LoyaltyRate,
  RankingBrand,
  RankingAge,
  DailyGoal,
  SpotsMap, 
  SpotsGoogleMap,
  BlogActivity
} from "../../components/dashboard";

const home = () => {
  return (
    <div>
      <Row>
        <Col sm={12} lg={6}>
          <CountVisitors />
        </Col>
        <Col sm={12} lg={6}>
          <CountRegistered />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={8}>
          <VisitorByTime />
        </Col>
        <Col sm={12} lg={4}>
          <TopCampaign />
          <AvgDwellTime />
          <LoyaltyRate />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={4}>
          <RankingBrand />
        </Col>
        <Col sm={12} lg={4}>
          <RankingAge />
        </Col>
        <Col sm={12} lg={4}>
          <DailyGoal />
        </Col>
      </Row>
      <Row>
        <SpotsGoogleMap />
      </Row>
      <Row>
        <Col sm={12} lg={8}>
          <SpotsMap />
        </Col>
        <Col sm={12} lg={4}>
          <BlogActivity />
        </Col>
      </Row>
    </div>
  );
};

export default home;
