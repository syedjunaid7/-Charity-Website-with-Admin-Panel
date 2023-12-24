import { IoIosArrowDown } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaBookBookmark } from "react-icons/fa6";
import { RiTreeFill } from "react-icons/ri";
import { FaComputer } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import { BiCctv } from "react-icons/bi";

// images
import banner from "../assets/images/banner.jpeg";
import banner2 from "../assets/images/banner2.jpeg";
import banner3 from "../assets/images/banner2.jpeg";

export const navData = [
  {
    nav: "Home",
    link: "/",
  },
  {
    nav: "About Ek Kambal",
    link: "/about",
  },
  {
    nav: "News & Event",
    link: "/news",
  },
  {
    nav: "Contact",
    link: "/contact",
  },
];
export const eventsData = [
  {
    img: banner,
    title: "Blanket Donation Drive",
    date: "Date: Ongoing",
    content:
      "Join us in our ongoing blanket donation drive to provide warmth and hope to the homeless and needy during the harsh winter months. Your contribution can make an immediate difference in shielding vulnerable individuals from the biting cold.",
  },
  {
    img: banner2,
    title: "#Ek Kambal Pyar Bhara",
    date: "Date: Throughout the Winter Season",
    content:
      "Participate in our initiative aiming to spread love, care, and comfort through blanket donations. Help prevent fatalities due to the harsh winter conditions in India by expressing your care through blankets.",
  },
  {
    img: banner3,
    title: "BCF's Support Campaign",
    date: "Date: Year-round",
    content:
      "Be a part of BCF's year-round campaign to extend support, sustenance, and opportunities to those in need. Join us in our mission to alleviate poverty, provide education, healthcare, and essential resources for a brighter future.",
  },
  {
    img: banner,
    title: "Warmth and Hope Drive",
    date: "Date: Ongoing",
    content:
      "Our warmth and hope initiative aims to bring solace and warmth to those who need it the most. Donate a blanket today and help us spread kindness and generosity, offering relief during harsh winter nights.",
  },
];
export const featureCardData = [
  {
    icon: FaCalendarAlt,
    title: "Time Table",
    link: null,
  },
  {
    icon: FaBookOpen,
    title: "Syllabus",
    link: null,
  },
  {
    icon: IoDocument,
    title: "Doc. Diclosure",
    link: null,
  },
  {
    icon: FaBookOpen,
    title: "Latest Circular",
    link: null,
  },
  {
    icon: FaSchoolFlag,
    title: "Admission Criteria",
    link: null,
  },
  {
    icon: FaBookBookmark,
    title: "Book List",
    link: null,
  },
];

export const facilitesData = [
  {
    icon: RiTreeFill,
    matter: "A School Campus is Pollution-free.",
  },
  {
    icon: FaComputer,
    matter: "Well Equipped Science Lab, Computer Lab, and Library.",
  },
  {
    icon: PiStudentBold,
    matter: "Separate Block for Girl's and Boy's.",
  },
  {
    icon: FaHandHoldingMedical,
    matter: "Medical checkup first aid facilities.",
  },
  {
    icon: FaChildReaching,
    matter: "Activities Oriented Learning by doing concept for Kids.",
  },
  {
    icon: BiCctv,
    matter: "Special care for students (C.C.T.V) Camera, Wi-fi Campus.",
  },
];
