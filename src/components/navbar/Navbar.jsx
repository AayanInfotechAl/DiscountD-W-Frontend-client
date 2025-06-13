import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Badge,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  CircularProgress,
} from "@mui/material";
import "../../styles/Navbar.scss";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchAllProducts } from "../redux/slices/addToCartSlice";
import { debounce } from "lodash";
// import doorHandleIcon from "./assets/doorhandle.svg";

import {
  HomeWork,
  Close,
  DoorSliding,
  Phone,
  Search,
  ShoppingCart,
  Login,
  HowToReg,
  Menu,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  KeyboardArrowDown,
  History,
  Group,
  FavoriteBorder,
  Logout,
} from "@mui/icons-material";

import BalconyIcon from "@mui/icons-material/Balcony";
import Loader from "../../loader/Loader";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [exploreCategories, setExploreCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isProductDropDown, setIsProductDropDown] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { products, loading, error } = useSelector((state) => state.cart);
  const [showSearch, setShowSearch] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = location.pathname;
  const searchRef = useRef();

  useEffect(() => {
    if (!products?.orders || products.orders.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products?.orders]);

  const productCount = products?.orders ? products.orders.length : 0;

  const isLoggedIn =
    Cookies.get("alanAuthToken") && Cookies.get("userLoggedInId");

  const fetchExploreCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.discountdoorandwindow.com/api/categories/getAllCategories"
      );
      if (response?.data?.status === 200) {
        setExploreCategories(response?.data?.data);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "An error occurred.");
    }
  };

  const fetchDynamicSearch = debounce(async (query) => {
    if (!query) {
      navigate(previousPath);
      return;
    }
    try {
      const response = await axios.get(
        `https://www.discountdoorandwindow.com/api/search?name=${query}`
      );
      if (
        response?.data?.status === 200 &&
        (response?.data?.data?.subCategories.length > 0 ||
          response?.data?.data?.subSubCategories.length > 0 ||
          response?.data?.data?.products.length > 0)
      ) {
        navigate("/search-results", {
          state: { results: response?.data?.data, previousPath },
        });
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, 500);

  useEffect(() => {
    fetchExploreCategories();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (category) => {
    if (!category?.isSubCategory) {
      navigate(`/allsubproducts/${category?._id}`, {
        state: { categorydetails: category },
      });
    } else {
      navigate(`/categories/${category?._id}`);
    }
  };

  const handleLogout = () => {
    setLoggingOut(true);
    // Cookies.remove("alanAuthToken");
    // Cookies.remove("userLoggedInId");
    // Cookies.remove("sessionId");
    // dispatch(clearCart());
    // navigate("/");
    setTimeout(() => {
      Cookies.remove("alanAuthToken");
      Cookies.remove("userLoggedInId");
      Cookies.remove("sessionId");
      dispatch(clearCart());
      setLoggingOut(false);
      navigate("/");
      window.location.reload();
    }, 1000);
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSubMenuToggle = (e) => {
    e.stopPropagation();
    setOpenSubMenu(!openSubMenu);
  };

  const handleAccordionToggle = (e) => {
    e.stopPropagation();
    setOpenAccordion(!openAccordion);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const categoryIcons = {
  //   window: <BalconyIcon />,
  //   windows: <HomeWork />,
  //   door: <DoorSliding />,
  //   doors: <DoorSliding />,
  //   hardware: (
  //     <img
  //       src={doorHandleIcon}
  //       alt="Door Handle"
  //       style={{ width: 20, height: 20 }}
  //     />
  //   ),
  // };

  return (
    <div>
      {loggingOut && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Loader />
        </Box>
      )}
      <AppBar
        position="sticky"
        color="default"
        className="navbar-content rounded-3 "
        sx={{ width: "100%", top: 0, zIndex: 999 }}
        elevation={2}
      >
        <Toolbar
          sx={{
            borderTop: "10px solid #ff6600",
            position: "sticky",
            top: "0",
            zIndex: "999",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          {/* <Link to="/">
            <img src={logo} alt="Logo" style={{ width: "auto", height: "auto", cursor: "pointer", objectFit: "contain", }} />
          </Link> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <Menu />
              </IconButton>
            ) : (
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "auto",
                    height: "auto",
                    cursor: "pointer",
                    objectFit: "contain",
                  }}
                />
              </Link>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "auto",
                    height: "60px",
                    cursor: "pointer",
                    objectFit: "contain",
                  }}
                />
              </Link>
            )}
            {!isMobile && (
              <>
                <Link className="text-decoration-none" to="/">
                  <Button color="inherit" className="nav-title">
                    Home
                  </Button>
                </Link>
                &nbsp;&nbsp;
                <div
                  className="dropdown"
                  onMouseEnter={() => setIsProductDropDown(true)}
                  onMouseLeave={() => setIsProductDropDown(false)}
                >
                  <Button
                    color="inherit"
                    className="nav-title"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products <KeyboardArrowDown />
                  </Button>
                  <ul
                    className="dropdown-menu"
                    style={{
                      display: isProductDropDown ? "block" : "none",
                      minWidth: "200px",
                      minHeight: "150px",
                      lineHeight: "2",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#f1f1f1",
                    }}
                  >
                    {exploreCategories.length > 0 ? (
                      exploreCategories.map((category) => (
                        <li
                          key={category._id}
                          onClick={() => handleClick(category)}
                        >
                          <button className="dropdown-item pe-5 ps-3" type="button">
                            <span style={{ marginRight: "8px" }}>
                              <img
                                src={category.images[0]}
                                alt={category.name}
                                style={{
                                  width: 25,
                                  height: 25,
                                  objectFit: "cover",
                                  borderRadius: "20%",
                                }}
                              />
                            </span>
                            {category.name.trim()}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="dropdown-item">No categories available</li>
                    )}
                  </ul>
                </div>
              </>
            )}
            &nbsp;&nbsp;
            {!isMobile && (
              <>
                <div
                  className="dropdown"
                  onMouseEnter={() => setIsOpenModel(true)}
                  onMouseLeave={() => setIsOpenModel(false)}
                >
                  {isLoggedIn ? (
                    <Typography
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      sx={{ color: "#1976d2", fontWeight: "bold" }}
                      onClick={() => handleMenuOpen()}
                      className="me-2"
                    >
                      Account
                    </Typography>
                  ) : (
                    <IconButton
                      color="inherit"
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                    >
                      <AccountCircle
                        sx={{ color: "#1976d2", fontWeight: "bold" }}
                      />
                    </IconButton>
                  )}
                  <ul
                    className="dropdown-menu"
                    style={{
                      display: isOpenModel ? "block" : "none",
                      minWidth: "200px",
                      minHeight: "200px",
                      lineHeight: "2",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#f1f1f1",
                    }}
                  >
                    <li>
                      {!isLoggedIn && (
                        <div className="">
                          <Link
                            to="/login"
                            style={{ textDecoration: "none" }}
                            sx={{ "&:hover": { textDecoration: "underline" } }}
                          >
                            <Typography className="dropdown-item" type="button">
                              <Login className="me-2" /> Login
                            </Typography>
                          </Link>
                          <Link
                            to="/customer-register"
                            style={{ textDecoration: "none" }}
                            sx={{ "&:hover": { textDecoration: "underline" } }}
                          >
                            <Typography className="dropdown-item" type="button">
                              <HowToReg className="me-2" /> Register
                            </Typography>
                          </Link>
                        </div>
                      )}
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() =>
                          handleProtectedLinkClick("/order-history")
                        }
                      >
                        <History className="me-2" /> My Orders
                      </button>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() =>
                          handleProtectedLinkClick("/user-details")
                        }
                      >
                        <Group className="me-2" /> My Account
                      </button>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleProtectedLinkClick("/wish-list")}
                      >
                        <FavoriteBorder className="me-2" /> Wishlist
                      </button>
                      {isLoggedIn && (
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={handleLogout}
                        >
                          <Logout className="me-2" /> Logout
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
                &nbsp;&nbsp;
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  ref={searchRef}
                >
                  {showSearch && (
                    <TextField
                      variant="outlined"
                      placeholder="Search...."
                      size="small"
                      value={query}
                      onChange={(e) => {
                        const value = e.target.value;
                        setQuery(value);
                        if (!value) {
                          navigate(previousPath);
                        } else {
                          fetchDynamicSearch(value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          fetchDynamicSearch(query);
                        }
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray !important",
                          },
                        },
                      }}
                    />
                  )}
                  <IconButton
                    color="inherit"
                    onClick={() => setShowSearch(!showSearch)}
                    sx={{ "&:hover": { backgroundColor: "transparent" } }}
                  >
                    <Search sx={{ color: "#1976d2" }} />
                  </IconButton>
                </Box>
                &nbsp;&nbsp;
                <Link to="/cart">
                  <IconButton
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "transparent" } }}
                    className="me-2"
                  >
                    <Badge badgeContent={productCount} color="primary">
                      <ShoppingCart sx={{ color: "#1976d2" }} />
                    </Badge>
                  </IconButton>
                </Link>
                &nbsp;&nbsp;
                <Link to="/appointment">
                  <Button
                    variant="contained"
                    className="me-3"
                    sx={{
                      backgroundColor: "#1976d2",
                      fontWeight: "bold",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                  >
                    Book an Appointment
                  </Button>
                </Link>
                &nbsp;&nbsp;
                <Link to="/contact">
                  <IconButton
                    sx={{
                      backgroundColor: "#0068B3",
                      borderRadius: "50%",
                      padding: "5px",
                      "&:hover": { backgroundColor: "#0068B3" },
                    }}
                    className="me-2"
                  >
                    <Phone className="fs-6" sx={{ color: "white" }} />
                  </IconButton>
                </Link>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  {" "}
                  +1(858) 564-2564
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            py={1}
            sx={{ borderBottom: "1px solid #ddd" }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px", objectFit: "contain" }}
            />
            <IconButton onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              className="text-black"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleSubMenuToggle}>
              <ListItemText primary="Products" />
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {exploreCategories.map((category) => (
                  <ListItem
                    button
                    key={category._id}
                    className="text-black"
                    onClick={() => handleClick(category)}
                  >
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <ListItem
              button
              onClick={handleAccordionToggle}
              className="text-black"
            >
              <ListItemText primary={isLoggedIn ? "Account" : "My Account"} />
              {openAccordion ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {/* <ListItem button className="text-black" onClick={handleAccordionToggle}>
              {isLoggedIn ? (
                <ListItem button className="text-black" onClick={handleAccordionToggle} sx={{ pl: 0 }}>
                  <ListItemText primary="Account" />
                  {openAccordion ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              ) : (
                <ListItem button className="text-black" onClick={handleAccordionToggle} sx={{ pl: 0 }}>
                  <ListItemText primary="My Account" />
                  {openAccordion ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              )}
            </ListItem> */}

            <Collapse in={openAccordion} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {!isLoggedIn && (
                  <ListItem
                    button
                    component={Link}
                    to="/login"
                    className="text-black"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Login" />
                  </ListItem>
                )}
                {!isLoggedIn && (
                  <ListItem
                    button
                    component={Link}
                    to="/customer-register"
                    className="text-black"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                )}
                <ListItem
                  button
                  className="text-black"
                  onClick={() => handleProtectedLinkClick("/order-history")}
                >
                  <ListItemText primary="My Orders" />
                </ListItem>
                <ListItem
                  button
                  className="text-black"
                  onClick={() => handleProtectedLinkClick("/user-details")}
                >
                  <ListItemText primary="My Account" />
                </ListItem>
                <ListItem
                  button
                  className="text-black"
                  onClick={() => handleProtectedLinkClick("/wish-list")}
                >
                  <ListItemText primary="Wishlist" />
                </ListItem>
                {isLoggedIn && (
                  <ListItem
                    button
                    className="text-black"
                    onClick={handleLogout}
                  >
                    <ListItemText primary="Logout" />
                  </ListItem>
                )}
              </List>
            </Collapse>
            <ListItem
              button
              component={Link}
              to="/cart"
              className="text-black"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/appointment"
              className="text-black"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Book an Appointment" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/contact"
              className="text-black"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
