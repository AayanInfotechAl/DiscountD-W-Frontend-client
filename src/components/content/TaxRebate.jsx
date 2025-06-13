import React from "react";
import content from "../../json/doors.json";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const TaxRebate = () => {
  const { tax_rebate } = content;

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom className="fw-bold">
            {tax_rebate.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {tax_rebate.description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Details on the 2011 Home Improvement Tax Rebate:
          </Typography>
          <Box
            component="ul"
            sx={{ paddingLeft: "20px", listStyleType: "disc", lineHeight:"10px" }}
          >
            <ListItemText
              primary={`• Tax rebate: ${tax_rebate.details.tax_rebate_info.rebate}`}
              sx={{ marginBottom: "10px" }}
            />
            <ListItemText
              primary={`• Expiration: ${tax_rebate.details.tax_rebate_info.expiration}`}
              sx={{ marginBottom: "10px" }}
            />
            <ListItemText
              primary={`• Eligibility: ${tax_rebate.details.tax_rebate_info.eligibility}`}
              sx={{ marginBottom: "10px" }}
            />
            <ListItemText
              primary={`• Limitations: ${tax_rebate.details.tax_rebate_info.limitations}`}
              sx={{ marginBottom: "10px" }}
            />
            <ListItemText
              primary={`• Tax form: ${tax_rebate.details.tax_rebate_info.tax_form}`}
              sx={{ marginBottom: "10px" }}
            />
            <ListItemText
              primary={`• Receipt: ${tax_rebate.details.tax_rebate_info.receipt}`}
              sx={{ marginBottom: "10px" }}
            />
            <ListItemText
              primary={`• U-Factor: ${tax_rebate.details.tax_rebate_info.u_factor}`}
            />
          </Box>

          <Typography variant="subtitle2" mt={2}>
            Source: {tax_rebate.details.source}
          </Typography>
          <List>
            {tax_rebate.details.links.map((link, index) => (
              <ListItem key={index} sx={{ lineHeight: "10px" }}>
                <Link href={link} target="_blank" rel="noopener" className="text-decoration-none text-black">
                  {link}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default TaxRebate;
