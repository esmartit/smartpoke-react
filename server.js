const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const EventSource = require("eventsource");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

const strapi = process.env.REACT_APP_STRAPI;
const radius = process.env.REACT_APP_RADIUS;
const dataStore = process.env.REACT_APP_DATASTORE;
// const timeZone = process.env.REACT_APP_TIME_ZONE;
const port = process.env.PORT || 3001;

// Middleware
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// proxy middleware options
const apiStrapi = createProxyMiddleware({
  target: "https://app.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "localhost:3001": `${strapi}`,
  },
});

// proxy middleware options
const apiRadius = createProxyMiddleware({
  target: "https://radius.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "localhost:3001": `${radius}`,
  },
});

// proxy middleware options
// const apiDataStore = createProxyMiddleware({
//   target: "https://store.cluster.smartpoke.es", // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     "localhost:3001": `${dataStore}`,
//   },
// });

// create the proxy (without context)
function sseMiddleware(req, res, next) {
  // setup headers for the response in order to get the persistent HTTP connection
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    "Access-Control-Allow-Origin": "*",
  });
  res.flushHeaders();

  // compose the message
  function sendStreamData (e) {
    res.write(`data: ${e.data}\n\n`);
  }
  // we are attaching sendEventStreamData to res, so we can use it later
  Object.assign(res, {
    sendStreamData
  });
  next();
}

function getStreamData(req, res) {
  let path = req.query.resourcePath;
  let resourcePath = dataStore+path;

  let sse = new EventSource(resourcePath);
  sse.onmessage = function(event) {
    res.sendStreamData(event);
  };    
}

const app = express();
const server = require("http").Server(app);

const proxyStrapi = apiStrapi;
const proxyRadius = apiRadius;
// const proxyDataStore = apiDataStore;

// Home
// Top Tiles Counters
app.get('/total-detected-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/today-detected-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/now-detected-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/total-registered-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/today-registered-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/now-registered-count', sseMiddleware, getStreamData, function (req, res){ });

// Visitors By Time
// app.get('/now-detected', sseMiddleware, getStreamData, function (req, res){ });

// Daily Goal
// app.get('/daily_goal_device', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/daily_goal_registered', sseMiddleware, getStreamData, function (req, res){ });

// Spots GoogleMap
// app.get('/today-detected', sseMiddleware, getStreamData, function (req, res){ });

// Spots Map
// app.get('/today-countries', sseMiddleware, getStreamData, function (req, res){ });

// Configurations
app.use("/spots", proxyStrapi);
app.use("/campaigns", proxyStrapi);

// BigData Settings
app.use("/values", proxyStrapi);
app.use("/zones", proxyStrapi);
app.use("/sensors", proxyStrapi);
app.use("/devices", proxyStrapi);

// HotSpot Settings
app.use("/api/nas", proxyRadius);
app.use("/hotspots", proxyStrapi);
app.use("/api/limitations", proxyRadius);
app.use("/customers", proxyStrapi);

// Maintenances
app.use("/brands", proxyStrapi);
app.use("/business-types", proxyStrapi);
app.use("/countries", proxyStrapi);
app.use("/states", proxyStrapi);
app.use("/cities", proxyStrapi);
app.use("/zipcodes", proxyStrapi);

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

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log(`endpoints server is working PORT: ${port}`);
});

module.exports = server;
