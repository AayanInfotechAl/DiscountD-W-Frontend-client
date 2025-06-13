import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import axios from "axios";
import Loader from "../../loader/Loader";

export const TermsConditions = () => {
  const [loading, setLoading] = useState(true);
  const [termsConditionContent, setTermsConditionContent] = useState(null);
  const fetchTermsConsitions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.discountdoorandwindow.com/api/StaticContent/content/Conditions"
      );
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setTermsConditionContent(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsConsitions();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col">
            <Box mb={3}>
              {termsConditionContent && termsConditionContent.content ? (
                <>
                  <Box mb={4}>
                    <Typography variant="h3" className="fw-bold" gutterBottom>
                      {termsConditionContent?.section}
                    </Typography>
                    <Divider />
                  </Box>
                  <Box mb={3}>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: termsConditionContent?.content,
                      }}
                    />
                  </Box>
                </>
              ) : (
                <Typography variant="h5" color="textSecondary" align="center">
                  Coming soon...!
                </Typography>
              )}
            </Box>
          </div>
        </div>
      )}
    </Container>
  );
};
