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
import { Link } from "react-router-dom";
import question_installer from "../../assets/question_installer.png";

const QuestionInstaller = () => {
  const { questions_installer } = content;

  return (
    <Container sx={{ mt: { xs: 2, md: 4 }, mb:3 }}>
      <Typography
        variant="h4"
        gutterBottom
        className="fw-bold"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.125rem" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {questions_installer.title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <img src={question_installer} alt="Installer" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ paddingLeft: 2, listStyleType: "disc" }}>
            {questions_installer.questions.map((item, index) => (
              <>
                <Box>
                  <Typography variant="body1" component="span">
                    {index + 1} {item.question}
                  </Typography>
                </Box>
                <Box className="px-2">
                  <Typography variant="body1" component="span">
                    {item.answer}
                  </Typography>
                </Box>
              </>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionInstaller;
