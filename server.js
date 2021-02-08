const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

const EventSource = require("eventsource");

const API_STRAPI = process.env.REACT_API_STRAPI;
const API_RADIUS = process.env.REACT_API_RADIUS;
const API_STORE = process.env.REACT_API_STORE;
const port = process.env.PORT || 3001;

// proxy middleware options
const apiDataStrapi = createProxyMiddleware({
  target: "https://app.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "localhost:3001": `${API_STRAPI}`,
  },
});

// proxy middleware options
const apiDataRadius = createProxyMiddleware({
  target: "https://radius.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "localhost:3001": `${API_RADIUS}`,
  },
});

// proxy middleware options
const apiDataStore = createProxyMiddleware({
  target: "https://store.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "localhost:3001": `${API_STORE}`,
  },
});

// create the proxy (without context)
const apiProxyRadius = apiDataRadius;
const apiProxyStrapi = apiDataStrapi;
const apiProxyStore = apiDataStore;

const app = express();
const server = require("http").Server(app);

//Home
//Sensor-Activity
app.use("/sensor-activity", apiProxyStore);

// Configurations
app.use("/spots", apiProxyStrapi);
app.use("/campaigns", apiProxyStrapi);

// BigData Settings
app.use("/values", apiProxyStrapi);
app.use("/zones", apiProxyStrapi);
app.use("/sensors", apiProxyStrapi);
app.use("/devices", apiProxyStrapi);

// HotSpot Settings
app.use("/hotspots", apiProxyStrapi);
app.use("/api/nas", apiProxyRadius);
app.use("/api/limitations", apiProxyRadius);
app.use("/customers", apiProxyStrapi);

// Maintenances
app.use("/brands", apiProxyStrapi);
app.use("/business-types", apiProxyStrapi);
app.use("/countries", apiProxyStrapi);
app.use("/states", apiProxyStrapi);
app.use("/cities", apiProxyStrapi);
app.use("/zipcodes", apiProxyStrapi);

// Middleware
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// pre-flight requests
// app.options('*', cors());

app.get("/", function (req, res, next) {
  res.json({ message: `endpoints server is working using PORT: ${port}` });
});

app.get("/total-detected-count", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    let seDetectedTotal = new EventSource("http://localhost:9001/sensor-activity/total-detected-count");
    seDetectedTotal.onmessage = function(event) {
      res.write(`data: ${event.data}\n\n`);
    };
  }, 15000);
});

app.get("/today-detected-count", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    let seDetectedToday = new EventSource("http://localhost:9001/sensor-activity/today-detected-count");
    seDetectedToday.onmessage = function(event) {
      res.write(`data: ${event.data}\n\n`);
    };
  }, 15000);
});

app.get("/now-detected-count", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    let seDetectedNow = new EventSource("http://localhost:9001/sensor-activity/v2/now-detected-count");
    seDetectedNow.onmessage = function(event) {
      res.write(`data: ${event.data}\n\n`);
    };
  }, 15000);
});

app.get("/total-registered-count", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    let seRegisteredTotal = new EventSource("http://localhost:9001/sensor-activity/total-registered-count");
    seRegisteredTotal.onmessage = function(event) {
      res.write(`data: ${event.data}\n\n`);
    };
  }, 15000);
});

app.get("/today-registered-count", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    let seRegisteredToday = new EventSource("http://localhost:9001/sensor-activity/daily-registered-count");
    seRegisteredToday.onmessage = function(event) {
      res.write(`data: ${event.data}\n\n`);
    };
  }, 15000);
});

app.get("/now-registered-count", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    let seRegisteredNow = new EventSource("http://localhost:9001/sensor-activity/now-registered-count");
    seRegisteredNow.onmessage = function(event) {
      res.write(`data: ${event.data}\n\n`);
    };
  }, 15000);
});

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log(`endpoints server is working PORT: ${port}`);
});

module.exports = server;
