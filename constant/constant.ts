import {
  HiHome,
  HiMap,
  HiInformationCircle,
  HiBuildingOffice2,
  HiArrowRightOnRectangle,
  HiUserPlus,
  HiChartBar,
} from "react-icons/hi2";

import { FaStore } from "react-icons/fa6";

export const LOGO_PATH = "/Images/Logo/geosme-logo-light.png";

export const navLinks = [
  {
    id: 1,
    url: "/",
    label: "Home",
  },
  {
    id: 2,
    url: "/sme",
    label: "SMEs",
  },
  {
    id: 3,
    url: "/map",
    label: "Map",
  },
  {
    id: 4,
    url: "/insights",
    label: "Insights",
    dropdownItems: [
      {
        id: "4.1",
        label: "Business Density",
        url: "/insights/business-density",
      },
      {
        id: "4.2",
        label: "Market Trends",
        url: "/insights/market-trends",
      },
      {
        id: "4.3",
        label: "Municipality Comparison",
        url: "/insights/municipality-comparison",
      },
      {
        id: "4.4",
        label: "Competitor Analysis",
        url: "/insights/competitor-analysis",
      },
    ],
  },
  {
    id: 5,
    url: "/about",
    label: "About",
  },
];

export const mobileNavLinks = [
  {
    id: 1,
    url: "/",
    label: "Home",
    icon: HiHome,
  },
  {
    id: 2,
    url: "/sme",
    label: "SMEs",
    icon: FaStore,
  },
  {
    id: 3,
    url: "/map",
    label: "Map",
    icon: HiMap,
  },
  {
    id: 4,
    url: "/explore",
    label: "Explore SME",
    icon: HiChartBar,
  },
  {
    id: 5,
    url: "/fintech-insights",
    label: "View Fintech SME",
    icon: HiChartBar,
  },
  {
    id: 6,
    url: "/about",
    label: "About",
    icon: HiInformationCircle,
  },
  {
    id: 7,
    url: "/business-portal",
    label: "Business Portal",
    icon: HiBuildingOffice2,
  },
  {
    id: 8,
    url: "/auth/main/login",
    label: "Login",
    icon: HiArrowRightOnRectangle,
  },
  {
    id: 9,
    url: "/auth/main/signup",
    label: "Sign Up",
    icon: HiUserPlus,
  },
];
