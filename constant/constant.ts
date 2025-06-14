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
        id: "explore",
        label: "Explore SME",
        url: "/explore",
      },
      {
        id: "fintech",
        label: "View Fintech SME",
        url: "/fintech-insights",
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
    url: "/auth/login",
    label: "Login",
    icon: HiArrowRightOnRectangle,
  },
  {
    id: 9,
    url: "/auth/signup",
    label: "Sign Up",
    icon: HiUserPlus,
  },
];
