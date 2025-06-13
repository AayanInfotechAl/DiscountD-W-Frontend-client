import React from "react";
import content from "../../json/doors.json";
import {
    Box,
    Container,
    Grid,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import caulk from "../../assets/caulk.png";
const Caulk = () => {
    const { caulk_guides } = content;

    return (
        <div>
            <Container sx={{ mt: { xs: 2, md: 4 } }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    className="fw-bold"
                    sx={{
                        fontSize: { xs: "1.8rem", md: "2.125rem" },
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    {caulk_guides.title}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            display="flex"
                            justifyContent={{ xs: "center", md: "flex-start" }}
                        >
                            <img src={caulk} alt="Caulking Guide" className="w-100" />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            textAlign: { xs: "center", md: "left" },
                            paddingX: { xs: 2, md: 0 },
                        }}
                    >
                        <Typography variant="body1" paragraph>
                            {caulk_guides.introduction}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="body1">
                                {caulk_guides.recommendation}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        {caulk_guides.sealant_types.map((sealant, index) => (
                            <Box className="d-flex justify-content-betwen align-items-center px-4">
                                <Box key={index} sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {sealant.type}
                                    </Typography>
                                    <List sx={{ paddingLeft: 2, listStyleType: "disc" }}>
                                        {sealant.description.map((point, i) => (
                                            <ListItem key={i} sx={{ display: "list-item", paddingLeft: 0 }}>
                                                {point}
                                            </ListItem>
                                        ))}
                                    </List>
                                    <List sx={{ paddingLeft: 2, listStyleType: "disc" }}>
                                        <ListItem sx={{ display: "list-item", paddingLeft: 0 }}>
                                            If you would like information on <span className="text-decoration-underline">how to apply this Caulk</span>, then goto the Do-It-Yourself Section
                                        </ListItem>
                                        <ListItem sx={{ display: "list-item", paddingLeft: 0 }}>
                                            Information Source: <a href=" http://www.onlinetips.org/outdoor-caulks" className="text-black"> http://www.onlinetips.org/outdoor-caulks</a>
                                        </ListItem>
                                    </List>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: { xs: "center", md: "flex-start" },
                                    }}
                                >
                                    <img src={sealant?.image} alt={`${sealant?.type} image`} />
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Caulk;
