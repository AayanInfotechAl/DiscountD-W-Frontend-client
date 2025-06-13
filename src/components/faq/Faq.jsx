import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import banner from "../../assets/doors.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import img1 from "../../assets/greenhousewindowfig2.jpg";

import { useLocation } from "react-router-dom";

export const Faq = () => {
  const location = useLocation();

  // Dynamic data for FAQ sections
  const faqSections = [
    {
      sectionTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "What are the advantages of Vinyl?",
          answer:
            "Vinyl windows are durable and low-maintenance. They never require painting and are not affected by moisture. They are energy efficient and are often used to replace aluminum windows. There are many great features of the new generation of Vinyl.",
        },
        {
          question: "Warranty included with products?",
          answer:
            "Yes, all our products come with a manufacturer’s warranty that covers various defects and issues.",
        },
        {
          question: "How do I get free shipping?",
          answer:
            "Free shipping is available on select products when your order exceeds a certain value. Check our shipping policy for more details.",
        },
        {
          question: "Fiberglass door versus a Wood door?",
          answer:
            "Fiberglass doors are more durable and energy-efficient than wood doors. They also require less maintenance and are resistant to warping and rotting.",
        },
      ],
    },
    {
      sectionTitle: "Glossary",
      faqs: [
        {
          question: "Window Grille",
          answer:
            "Window Grilles are small bars that divide the glass area. They often form a grid pattern on the window.",
        },
        {
          question: "Weather Strip",
          answer:
            "A part of a window or door, used to seal the cracks around moving sash or panels against the passage of air or water, when the door or window is in the closed position. Weather strip can be made of metal, vinyl, wool pile or other materials.",
        },
        {
          question: "Tempered Glass",
          answer:
            "Tempered glass is glass that has been processed by controlled thermal or chemical treatments to increase its strength compared with normal glass. Tempered glass is made by processes which create balanced internal stresses which give the glass strength. It will usually shatter into small fragments instead of sharp shards when broken, making it less likely to cause severe injury and deep lacerations. Because of its safety and strength, tempered glass is an option on our vinyl windows.",
        },

        {
          question: "Sill",
          answer: "The Sill is the bottom of the frame.",
        },
        {
          question: "Sidelight",
          answer: "A sidelight is a vertical window that flanks a door. Sidelights are narrow, usually stationary and found immediately adjacent doorways. While most commonly found as supporting elements emphasizing the importance of a primary entrance, sidelights may be employed at any interior or exterior door where a visual emphasis is desired, or where additional light or visibility is needed.",
        },
        {
          question: "Shim",
          answer: "A shim is a thin and often tapered or wedged piece of material, used to fill small gaps or spaces between objects. They are used to adjust the position of a door or window.",
        },
        {
          question: "Sash",
          answer: "A frame that holds the glass assembly.",
        },
        {
          question: "Rough Opening",
          answer: "The rough opening is the size from stud to stud for framing purposes.",
        },
        {
          question: "Rosette",
          answer: "An escutcheon, usually round, that a knob or lever sits on.",
          image: "https://discountdw.com/files/images/rosette_80.jpg"
        },
        {
          question: "Retrofit",
          answer: "To replace existing equipment already in service using parts developed or made available after the time of original manufacture.",
        },
        {
          question: "Rabbet",
          answer: "The recess or offset formed in the frame to receive door.",
        },
        {
          question: "Plain Bearing",
          answer: "A plain bearing is a device to allow constrained relative motion between two or more parts, such as linear sliding movement for a window or door.",
        },
        {
          question: "Low-E glass",
          answer: "Short for “low-emissivity,” it is a high-tech coating on the glass that is designed to block much of the heat and ultra-violet light from the sun, while permitting a large percentage of visible light, so it will reduce solar heat gain and fading without making your home uncomfortably dark. It is a microscopically thin, virtually invisible metallic oxide layer deposited on a window glazing surface. Low-E can reduce heating and cooling bills while dramatically improving overall comfort.",
          image: "https://discountdw.com/files/images/low_e_glass_less.jpg"
        },
        {
          question: "Kerf",
          answer: "A thin slot cut into a part with a molder or saw blade. Weatherstrip is inserted into kerfs cut into door jambs",
        },
        {
          question: "Jamb",
          answer: "Jamb is the vertical member of the window frame. It's measurement is determined by the thickness of the wall the door frame will be inserted into including sheetrock and any siding, or sheathing on the outside. 4- 9/16 is the most common Jamb size which fits a 4- 1/2 wide wall.",
        },
        {
          question: "Hung",
          answer: "A type of window with one or more vertically moving sashes that employs balances. Also refers to a type of door with hinges on one jamb. A hung door is a swinging door as opposed to a sliding door.",
        },
        {
          question: "HP-SC",
          answer: "A feature of our Vinyl windows that makes them extra energy efficient. One lite of soft coat solar cooling optimized Low-E and argon gas fill for high performance that is optimized for warmer climates.",
        },
        {
          question: "FAQ",
          answer: "FAQ stands for Frequently Asked Questions.",
        },
        {
          question: "Entry Door",
          answer: "A door, usually swinging or hung, that leads to the outside of a structure.",
          
        },
        {
          question: "Dual wall integral flush fin",
          answer: "This larger stronger frame is for covering up an existing aluminum frame. Caulking pockets on the back of the flush fin allow for a better bond. Most Vinyl windows available on the market have nail fin frame that are for new construction. Our windows are particularly for retrofit and window replacement, which makes the dual wall integral flush fin the best option.",
          image: "https://discountdw.com/files/images/duel_flush_fin200.jpg"
        },
        {
          question: "Double Hung",
          answer: "A type of window with two vertically moving sashes, with each sash employing balances. Balances is a device in a hung window that allows the sash to be adjusted to any position between fully open and fully closed. Originally, balances were weights attached to the top corners of the sash and draped over a pulley on either jamb. The weights and the friction of the pulleys balanced the weight of the sash. Balances normally are placed in pairs for each sash, one at each jamb.",
        },
        {
          question: "Direct Glaze",
          answer: "The glass is glazed directly into the frame and is stationary. This means the window has no sash.",
        },
        {
          question: "Deadbolt C/L",
          answer: "Deadbolt Center Line. It refers to the distance between the center of the two Bores in a door. One bore is for the door handle and the other is for the deadbolt lock.",
        },
        {
          question: "Caulking",
          answer: "Caulking is a term used to describe several different processes to seal joints or seams in various structures and certain types of piping.",
        },
        {
          question: "Caming",
          answer: "Caming is the ornamental material used to bond decorative glass components together.",
        },
        {
          question: "Brickmould",
          answer: "Molding around the window and door frames that abuts the exterior facing material of the building and serves as a finishing boundary.",
        },
        {
          question: "Bore",
          answer: "This refers to the hole that was physically drilled in your door to allow installation of a door handle or deadbolt lock.",
        },
        {
          question: "Astragal",
          answer: "A molding which is attached to one of a pair of swinging doors against which the other door strikes and locks against.",
        },
        {
          question: "Argon Gas",
          answer: "Argon is a safe, odorless, colorless gas, which is heavier or denser than air. When used in conjunction with Low-E glass, argon provides better insulation. That’s because heat and cold do not pass through argon gas as easily as through air. Argon is non-toxic and presents no human health or environmental concerns. We offers gas-filled insulating glass units in most of our windows and patio doors.",
        },
      ],
    },
  ];

  // Format the URL path for display
  const formatPath = (path) => {
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => {
        if (segment.toLowerCase() === "faq") {
          return "Frequently Asked Question";
        }
        return segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      })
      .join(" > ");
  };

  return (
    <div className="doors-container mb-4">
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h2" className="text-black fw-bold">
            FAQ
          </Typography>
          <Typography variant="h6" className="text-black fw-bold">
            <span>
              Home {">"} {formatPath(location.pathname)}
            </span>
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ marginTop: "40px" }}>
        <Box>
          {faqSections.map((section, sectionIndex) => (
            <Box key={sectionIndex} className="mt-4">
              {/* Section Title */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                {sectionIndex + 1}. {section.sectionTitle}
              </Typography>

              {/* FAQs for the section */}
              {section.faqs?.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    marginBottom: "15px",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0px 10px 30px rgb(229 155 106 / 50%)",
                    backgroundColor: "transparent",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#ff6600" }} />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography className="fw-bold">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq?.answer}</Typography>
                    <img src={faq?.image} alt="" />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
};
