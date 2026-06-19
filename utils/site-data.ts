

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
export const siteConfig = {
  name: "Cyberpeers",
  description: "Cyberpeers is aiming to deliver bespoke solutions by building applications for web and mobile with Digital Marketing.",
  address: "9 Town Quay, Barking IG11 7BZ, United Kingdom",
  phone: "+44 020 8090 4806",
  email: "contact@cyberpeers.co.uk",
  
  navItems: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" }, // Changed to match your folder /about-us
    { label: "Services", href: "/services" },
    { label: "Career", href: "/career" },    // Changed to match your folder /careers
  ],
  
links: {
    facebook: "https://www.facebook.com/cyberrpeers",
    linkedin: "https://www.linkedin.com/company/cyberpeers/",
    pinterest: "https://uk.pinterest.com/cyberrpeers/?actingBusinessId=1117174388723187679",
  },

  socials: [
    { icon: faFacebook, href: "https://www.facebook.com/cyberrpeers" },
    { icon: faLinkedin, href: "https://www.linkedin.com/company/cyberpeers/" },
    { icon: faPinterest, href: "https://uk.pinterest.com/cyberrpeers/" },
  ],
  
  footerNav: [
    {
      title: "Quick Links",
      items: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact Us", href: "/contact" },
        { label: "Career", href: "/career" },
      ],
    },
    {
      title: "Top Services",
      items: [
        { label: "Web Designing", href: "/services" },
        { label: "Web Development", href: "/services" },
        { label: "Branding", href: "/services" },
        { label: "Digital Marketing", href: "/services" },
      ],
    },
  ],
};