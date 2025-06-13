import React, { useEffect, useState } from "react";
import "../../styles/Footer.scss";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchAddress } from "../redux/slices/addressSlice";
import { useDispatch, useSelector } from "react-redux";

export const Footer = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const isLoggedIn =
    Cookies.get("alanAuthToken") && Cookies.get("userLoggedInId");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleAbout = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  const handleProtectedLinkClick = (link) => {
    if (!isLoggedIn) {
      navigate("/login");
      if (link === "/login") {
        navigate("/login");
      }
    } else {
      navigate(link);
    }
  };

  const linkGroup = {
    links: [
      { name: "Home", path: "/" },
      {
        name: "About Us",
        path: "#",
        subLinks: [
          { name: "About Us", path: "/about" },
          { name: "Fed Supplier", path: "/fed-supplier" },
        ],
      },
      { name: "Financing Calculator", path: "/financing-calculator" },
    ],
    customer_services: [
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faq" },
      { name: "Diyinstall Guides", path: "/diyinstall-guides" },
    ],
    more_options: [
      { name: "My Orders", path: "/order-history" },
      { name: "Login/Register", path: "/login" },
      { name: "Track Order", path: "/order-track" },
      { name: "Shopping Cart", path: "/cart" },
      { name: "Right For Me", path: "/rightfor-me" },
    ],
    help: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms & Conditions", path: "/terms-condition" },
    ],
  };

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const { data } = useSelector((state) => state.address);
  const address = data?.data?.[0];

  return (
    <footer className="main-footer">
      <div className="auto-container">
        <div className="widgets-section">
          <div className="row">
            <div className="big-column col-xl-3 col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="footer-column col-xl-12 col-lg-6 col-md-6 col-sm-12">
                  <div className="footer-widget about-widget top-footer-mobile">
                    <div className="footer-logo">
                      <figure className="image">
                        <a href="#">
                          <img src={logo} alt="" />
                        </a>
                      </figure>
                    </div>
                    <div className="widget-content">
                      <h2 className="widget-title">Get in Touch With us</h2>
                      <ul className="contact-list">
                        <li>
                          <span className="fa fa-map-marker"></span>{" "}
                          {address?.street} {address?.suite}
                          <br />
                          {address?.city}, {address?.state} {address?.zip}
                        </li>
                        <li>
                          <span className="fa fa-phone"></span> {address?.phone}
                          <br />
                        </li>
                      </ul>
                      <ul className="social-links">
                        <li className="title"></li>
                        <li>
                          <a
                            href="https://www.facebook.com/discountDoor/"
                            target="_blank"
                          >
                            <i className="fab fa-facebook-official"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/user/DiscountDW"
                            target="_blank"
                          >
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/DiscountDoorandWindow/"
                            target="_blank"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://x.com/home" target="_blank">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com/search?q=discount+door+and+window&rlz=1C1YTUH_en-GBIN1105IN1105&oq=discount+door+and+window&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMgYIBRBFGDwyBggGEEUYPTIGCAcQRRg80gEHNTY5ajBqOagCALACAQ&sourceid=chrome&ie=UTF-8"
                            target="_blank"
                          >
                            <i className="fab fa-google-plus"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="big-column col-xl-9 col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-12 col-6">
                  <div className="footer-widget links-widget">
                    <h2 className="widget-title">Useful Links</h2>
                    <div className="widget-content">
                      <ul className="list">
                        {linkGroup?.links?.map((linkItem, idx) => (
                          <li key={idx} className="menu-item">
                            {linkItem.subLinks ? (
                              <>
                                <p
                                  className="text-white"
                                  onClick={toggleAbout}
                                  style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                  }}
                                >
                                  {linkItem.name}
                                </p>

                                {isAboutOpen && (
                                  <ul className="submenu">
                                    {linkItem.subLinks.map(
                                      (subLink, subIdx) => (
                                        <li
                                          key={subIdx}
                                          className="submenu-item fw-bold"
                                        >
                                          <Link
                                            style={{
                                              color: "inherit",
                                              textDecoration: "none",
                                            }}
                                            to={subLink.path}
                                          >
                                            {subLink.name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </>
                            ) : (
                              <Link
                                to={linkItem.path}
                                className="fw-bold w-100"
                              >
                                <p className="text-white">{linkItem.name}</p>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-12 col-6">
                  <div className="footer-widget links-widget">
                    <h2 className="widget-title">Customer Services</h2>
                    <div className="widget-content">
                      {linkGroup?.customer_services?.map((linkItem, idx) => (
                        <ul className="list" key={idx}>
                          <Link
                            to={linkItem.path}
                            className="text-decoration-none"
                          >
                            <li>
                              <p className="text-white">{linkItem.name}</p>
                            </li>
                          </Link>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-12 col-6">
                  <div className="footer-widget contact-widget">
                    <h2 className="widget-title">Other Links</h2>
                    <div className="widget-content">
                      {linkGroup?.more_options?.map((linkItem, idx) => (
                        <ul className="list" key={idx}>
                          {linkItem.name === "My Orders" ? (
                            <li
                              onClick={() =>
                                handleProtectedLinkClick(linkItem.path)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <p className="text-white">{linkItem.name}</p>
                            </li>
                          ) : (
                            <Link
                              to={linkItem.path}
                              className="text-decoration-none"
                            >
                              <li>
                                <p className="text-white">{linkItem.name}</p>
                              </li>
                            </Link>
                          )}
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="footer-column col-xl-3 col-lg-6 col-md-6 col-sm-12 col-6">
                  <div className="footer-widget contact-widget">
                    <h2 className="widget-title">Help</h2>
                    <div className="widget-content">
                      {linkGroup?.help?.map((linkItem, idx) => (
                        <ul className="list" key={idx}>
                          <Link
                            to={linkItem.path}
                            className="text-decoration-none"
                          >
                            <li>
                              <p className="text-white">{linkItem.name}</p>
                            </li>
                          </Link>
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-6">
              <div className="copyright-text text-start">
                Copyrights 2025 | All Rights are Reserved <a href="#"></a>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="copyright-text text-end"
                style={{ position: "relative", zIndex: 99999 }}
              >
                Designed & Developed by{" "}
                <a
                  href="https://aayaninfotech.com/"
                  className="text-white"
                  target="_blank"
                >
                  Aayan Infotech
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
