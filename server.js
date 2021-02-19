const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const EventSource = require("eventsource");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

const STRAPI = process.env.REACT_APP_STRAPI;
const RADIUS = process.env.REACT_APP_RADIUS;
const DATASTORE = process.env.REACT_APP_DATASTORE;
// const timeZone = process.env.REACT_APP_TIME_ZONE;
const PORT = process.env.PORT || 3081;

// Middleware
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

// var allowlist = ['http://localhost:3081', 'http://localhost:9001']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// proxy middleware options
const proxyStrapi = createProxyMiddleware({
  target: "https://app.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    "localhost:3081": `${STRAPI}`,
  },
});

// proxy middleware options
const proxyRadius = createProxyMiddleware({
  target: "https://radius.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    "localhost:3081": `${RADIUS}`,
  },
});

// proxy middleware options
const proxyDataStore = createProxyMiddleware({
  target: "https://store.cluster.smartpoke.es", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  router: {
    "localhost:3081": `${DATASTORE}`,
  },
});

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
  let resourcePath = DATASTORE+path;

  let sse = new EventSource(resourcePath);
  sse.onmessage = function(event) {
    res.sendStreamData(event);
  };    
}

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
// app.use(cors(corsOptionsDelegate));
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// pre-flight requests
app.options('*', cors());

app.get('/', function (req,res) {
  res.set('Access-Control-Allow-Origin', '*');
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SmartPoke Platform." });
});

// Home
// Top Tiles Counters
// app.get('/total-detected-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/today-detected-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/now-detected-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/total-registered-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/today-registered-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/now-registered-count', sseMiddleware, getStreamData, function (req, res){ });
// app.get('/v3/sensor-activity/', cors(corsOptionsDelegate), function (req, res, next) { });
app.use('/v3/sensor-activity/', proxyDataStore);


// Visitors By Time
app.get('/now-detected', sseMiddleware, getStreamData, function (req, res) { });

// Daily Goal
app.get('/daily_goal_device', sseMiddleware, getStreamData, function (req, res) { });
app.get('/daily_goal_registered', sseMiddleware, getStreamData, function (req, res) { });

// Spots GoogleMap
app.get('/today-detected', sseMiddleware, getStreamData, function (req, res) { });

// Spots Map
app.get('/today-countries', sseMiddleware, getStreamData, function (req, res) { });

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

const server = require("http").Server(app);

// set port, listen for requests
server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
