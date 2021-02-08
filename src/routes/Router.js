import { lazy } from "react";

//Lazy loading and code splitting
//dashboards
const Home = lazy(() => import("../views/dashboards/home"));
const OnSite = lazy(() => import("../views/dashboards/onsite"));
const BigData = lazy(() => import("../views/dashboards/bigdata"));
const Presence = lazy(() => import("../views/dashboards/presence"));
const Analytics = lazy(() => import("../views/dashboards/analytics"));
const HotSpot = lazy(() => import("../views/dashboards/hotspot"));
const SmartPoke = lazy(() => import("../views/dashboards/smartpoke"));

//configurations
const Spot = lazy(() => import("../views/configurations/spots"));
const Campaign = lazy(() => import("../views/configurations/campaigns"));

//communications
const campaignDetailed = lazy(() => import("../views/communications/campaignDetailed"));
const campaignEffectiveness = lazy(() => import("../views/communications/campaignEffectiveness"));

//bigdata-settings
const Value = lazy(() => import("../views/bigdata-settings/values"));
const Zone = lazy(() => import("../views/bigdata-settings/zones"));
const Sensor = lazy(() => import("../views/bigdata-settings/sensors"));
const Device = lazy(() => import("../views/bigdata-settings/devices"));

//bigdata-reports
const bigdataDetailed = lazy(() => import("../views/bigdata-reports/bigdataDetailed"));
const detailedByTime = lazy(() => import("../views/bigdata-reports/detailedByTime"));

//hotspot-settings
const Nas = lazy(() => import("../views/hotspot-settings/nas"));
const HotSpots = lazy(() => import("../views/hotspot-settings/hotspots"));
const Limitation = lazy(() => import("../views/hotspot-settings/limitations"));
const Customer = lazy(() => import("../views/hotspot-settings/customers"));
const exportCustomer = lazy(() => import("../views/hotspot-settings/exportCustomers"));

//bigdata-reports
const hotspotDetailed = lazy(() => import("../views/hotspot-reports/hotspotDetailed"));
const hotspotCompartive = lazy(() => import("../views/hotspot-reports/hotspotComparative"));

//maintenances
const Brand = lazy(() => import("../views/maintenances/brands"));
const businessType = lazy(() => import("../views/maintenances/businessTypes"));
const Country = lazy(() => import("../views/maintenances/locations/countries"));
const State = lazy(() => import("../views/maintenances/locations/states"));
const City = lazy(() => import("../views/maintenances/locations/cities"));
const zipCode = lazy(() => import("../views/maintenances/locations/zipCodes"));

var ThemeRoutes = [
  {
    path: "/dashboards/home",
    name: "Home",
    icon: "home",
    component: Home,
  },
  {
    navlabel: true,
    name: "Dashboards",
    icon: "",
  },
  {
    path: "/dashboards/onsite",
    name: "OnSite",
    icon: "compass",
    component: OnSite,
  }, 
  {
    path: "/dashboards/bigdata",
    name: "BigData",
    icon: "database",
    component: BigData,
  },
  {
    path: "/dashboards/presence",
    name: "Presence",
    icon: "download",
    component: Presence,
  },
  {
    path: "/dashboards/analytics",
    name: "Analytics",
    icon: "activity",
    component: Analytics,
  },
  {
    path: "/dashboards/hotspot",
    name: "HotSpot",
    icon: "wifi",
    component: HotSpot,
  },
  {
    path: "/dashboards/smartpoke",
    name: "SmartPoke",
    icon: "message-circle",
    component: SmartPoke,
  },
  {
    navlabel: true,
    name: "Configurations",
    icon: "",
  },
  {
    path: "/configurations/spots",
    name: "Spots",
    icon: "map-pin",
    component: Spot,
  },
  {
    path: "/configurations/campaigns",
    name: "Campaigns",
    icon: "message-square",
    component: Campaign,
  },
  {
    navlabel: true,
    name: "Communications",
    icon: "",
  },
  {
    path: "/configurations/campaignDetailed",
    name: "Campaign Detailed",
    icon: "layers",
    component: campaignDetailed,
  },
  {
    path: "/configurations/campaignEffectiveness",
    name: "Campaign Effectiveness",
    icon: "check-circle",
    component: campaignEffectiveness,
  },
  {
    navlabel: true,
    name: "BigData Menu",
    icon: "",
  },
  {
    collapse: true,
    path: "/bigdata-settings",
    name: "BigData Settings",
    state: "bdsettingpages",
    icon: "settings",
    badges: "side-badge badge badge-info",
    badgeno: "4",
    child: [
      {
        path: "/bigdata-settings/values",
        name: "Values",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Value,
      },
      {
        path: "/bigdata-settings/zones",
        name: "Zones",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Zone,
      },
      {
        path: "/bigdata-settings/sensors",
        name: "Sensors",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Sensor,
      },
      {
        path: "/bigdata-settings/devices",
        name: "Devices",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Device,
      },
    ],
  },
  {
    collapse: true,
    path: "/bigdata-reports",
    name: "BigData Reports",
    state: "bdreportpages",
    icon: "list",
    badges: "side-badge badge badge-info",
    badgeno: "2",
    child: [
      {
        path: "/bigdata-reports/bigdataDetailed",
        name: "Detailed",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: bigdataDetailed,
      },
      {
        path: "/bigdata-reports/detailedByTime",
        name: "Detailed by Time",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: detailedByTime,
      },
    ],
  },
  {
    navlabel: true,
    name: "HotSpot Menu",
    icon: "",
  },
  {
    collapse: true,
    path: "/hotspot-settings",
    name: "HotSpot Settings",
    state: "hssettingpages",
    icon: "settings",
    badges: "side-badge badge badge-info",
    badgeno: "5",
    child: [
      {
        path: "/hotspot-settings/nas",
        name: "Nas",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Nas,
      },
      {
        path: "/hotspot-settings/hotspots",
        name: "HotSpots",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: HotSpots,
      },
      {
        path: "/hotspot-settings/limitations",
        name: "Limitations",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Limitation,
      },
      {
        path: "/hotspot-settings/customers",
        name: "Customers",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Customer,
      },
      {
        path: "/hotspot-settings/exportCustomers",
        name: "Export Customers",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: exportCustomer,
      },
    ],
  },
  {
    collapse: true,
    path: "/hotspot-reports",
    name: "HotSpot Reports",
    state: "hsreportpages",
    icon: "list",
    badges: "side-badge badge badge-info",
    badgeno: "2",
    child: [
      {
        path: "/hotspot-reports/hotspotDetailed",
        name: "Detailed",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: hotspotDetailed,
      },
      {
        path: "/hotspot-reports/hotspotComparative",
        name: "Comparative",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: hotspotCompartive,
      },
    ],
  },
  {
    navlabel: true,
    name: "Maintenances",
    icon: "",
  },
  {
    path: "/maintenances/brands/brands",
    name: "Brands",
    icon: "check-circle",
    component: Brand,
  },
  {
    path: "/maintenances/business-types/businessTypes",
    name: "Business Types",
    icon: "briefcase",
    component: businessType,
  }, 
  {
    collapse: true,
    path: "/maintenances/locations",
    name: "Location",
    state: "locationpages",
    icon: "map",
    badges: "side-badge badge badge-info",
    badgeno: "4",
    child: [
      {
        path: "/maintenances/locations/countries",
        name: "Countries",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Country,
      },
      {
        path: "/maintenances/locations/states",
        name: "States",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: State,
      },
      {
        path: "/maintenances/locations/cities",
        name: "Cities",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: City,
      },
      {
        path: "/maintenances/locations/zipCodes",
        name: "Zip Codes",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: zipCode,
      },
    ],
  },
  {
    path: "/home",
    pathTo: "/dashboards/home",
    name: "Dashboards",
    redirect: true,
  },
];

export default ThemeRoutes;
