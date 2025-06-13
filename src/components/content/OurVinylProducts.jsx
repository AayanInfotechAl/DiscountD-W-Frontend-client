import React from "react";
import content from "../../json/doors.json";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import logogreenapprovedproducts1 from "../../assets/logo_greenapprovedproducts1.png";
import taxenergycredit1 from "../../assets/tax_energy_credit1.png";
import energystar801 from "../../assets/energy_star801.png";
import lowe1 from "../../assets/lowe1.png";

const OurVinylProducts = () => {
  const { our_vinyl_products } = content;

  const vinylCards = [
    {
      image: logogreenapprovedproducts1,
      title: "Green Approved",
      description:
        "Green Approved by the NAHB. Our vinyl windows are Green Approved by the NAHB Research Center. This means you can be assured that our Vinyl doors and windows comply with specific green practice criteria in the National Green Building Standard. www.GreenApprovedProducts.com",
    },
    {
      image: taxenergycredit1,
      title: "Home Improvement Tax Rebate",
      description:
        "All our Vinyl windows are Stimulus qualified, which makes you eligible to receive a tax rebate.",
    },
    {
      image: energystar801,
      title: "Energy Star",
      description:
        "All our vinyl windows meet energy star guidelines for thermal efficiency.",
    },
  ];

  return (
    <Container sx={{ mt: { xs: 2, md: 4 }, mb: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        className="fw-bold"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.125rem" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {our_vinyl_products.title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            {our_vinyl_products.introduction.text}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" paragraph>
            {our_vinyl_products.introduction.definition}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {our_vinyl_products.ourvinylproducts.map((product, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 && (
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={lowe1} alt={product.step} />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ color: "#FC5F03", fontWeight: "bold" }}
              >
                {product.step}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
            </Grid>
            {index % 2 !== 0 && (
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={lowe1} alt={product.step} />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>

      <div className="row g-4">
        {vinylCards?.map((item, index) => (
          <div className="col-12 col-md-4" key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#D9D9D9",
                padding: 3,
                height: 300, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={item?.image}
                  alt={item?.title}
                  style={{ height: 50, marginBottom: "16px" }}
                />
                <Typography variant="h6" gutterBottom>
                  {item?.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {item?.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default OurVinylProducts;
