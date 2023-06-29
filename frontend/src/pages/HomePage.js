import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState('Web Security'); // Initialize with 'Web Security'

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const handleLogoClick = () => {
    navigate('/form');
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        px={3}
        py={2}
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        <img
          src="https://www.thetechbag.com/images/logo.svg"
          alt="Logo"
          style={{ height: '30px', marginRight: '10px' }}
        />
      </Box>
      <Box display="flex">
        <Box p={2} width="300px" bgcolor="background.default">
          <Typography variant="h6" gutterBottom>
            Popular Software
          </Typography>
          <Divider />
          <List>
            <ListItem
              button
              selected={selectedContent === 'Web Security'}
              onClick={() => handleContentClick('Web Security')}
            >
              <ListItemText primary="Web Security" />
            </ListItem>
            <ListItem
              button
              selected={selectedContent === 'Service Desk'}
              onClick={() => handleContentClick('Service Desk')}
            >
              <ListItemText primary="Service Desk" />
            </ListItem>
            <ListItem
              button
              selected={selectedContent === 'Cloud Backup & Recovery'}
              onClick={() => handleContentClick('Cloud Backup & Recovery')}
            >
              <ListItemText primary="Cloud Backup & Recovery" />
            </ListItem>
          </List>
        </Box>
        <Box p={2} flex={1} textAlign="center" bgcolor="background.default">
          <Box
            display="inline-block"
            border="1px solid #ccc"
            p={3}
            borderRadius={4}
            cursor="pointer"
            transition="border-color 0.3s"
            onClick={handleLogoClick}
          >
            <Typography variant="h5" gutterBottom>
              {selectedContent}
            </Typography>
            <img
              src="https://techbagfrontend.s3-ap-south-1.amazonaws.com/logos/38nWgUi3oNKSDapxuLGv1r.jpeg"
              alt="Logo"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                padding: '15px',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
