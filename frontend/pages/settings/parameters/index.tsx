import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import {
  Grid,
  Container,
  Card,
  ListItem,
  List,
  ListItemText,
  Button,
  TextField,
  Stack,
  Box,
  Typography
} from '@mui/material';
import Footer from '@/components/Footer';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { ParameterAPI } from '@/apis/ParameterAPI';

function Parameters() {
  const [disableEditGPTKey, setDisableEditGPTKey] = useState<boolean>(true);
  const [showEditGPTKey, setShowEditGPTKey] = useState<boolean>(true);
  const [updatedGPTKey, setUpdatedGPTKey] = useState<string>('APIKEY');

  const [disableEditSlackSigningSecret, setDisableEditSlackSigningSecret] = useState<boolean>(true);
  const [showEditSlackSigningSecret, setShowEditSlackSigningSecret] = useState<boolean>(true);
  const [updatedSlackSigningSecret, setUpdatedSlackSigningSecret] = useState<string>('APIKEY');

  const handleEditGPTKey = () => {
    setDisableEditGPTKey(false);
    setShowEditGPTKey(false);
  };

  const handleCancelGPTKey = () => {
    setDisableEditGPTKey(true);
    setShowEditGPTKey(true);
  };

  const handleEditSlackSigningSecret = () => {
    setDisableEditSlackSigningSecret(false);
    setShowEditSlackSigningSecret(false);
  };

  const handleCancelSlackSigningSecret = () => {
    setDisableEditSlackSigningSecret(true);
    setShowEditSlackSigningSecret(true);
  };

  const handleSubmitGPTKey = () => {
    ParameterAPI.edit('chatgpt_key', {
      value: updatedGPTKey,
      type: 'chatgpt_key'
    });

    setDisableEditGPTKey(true);
    setShowEditGPTKey(true);
  };

  const handleSubmitSlackSigningSecret = () => {
    ParameterAPI.edit('slack-signing-secret', {
      value: updatedSlackSigningSecret,
      type: 'slack-signing-secret'
    });

    setDisableEditSlackSigningSecret(true);
    setShowEditSlackSigningSecret(true);
  };

  const handleKeyChange = (e) => {
    setUpdatedGPTKey(e.target.value);
  };

  const handleSlackSecretChange = (e) => {
    setUpdatedSlackSigningSecret(e.target.value);
  };

  useEffect(() => {
    ParameterAPI.getParameter('chatgpt_key').then((data) => {
      setUpdatedGPTKey(data.value);
    });
    ParameterAPI.getParameter('slack-signing-secret').then((data) => {
      setUpdatedSlackSigningSecret(data.value);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Parameters</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Parameters"
          subHeading="Setup your keys that will be used to run the queries"
          docs=""
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        ></Grid>
        <Grid item xs={12}>
          <Box pb={2}>
            <Typography variant="h3">API Keys</Typography>
            <Typography variant="subtitle2">
              Manage your API Service Keys
            </Typography>
          </Box>
          <Card>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <List component={Box} display="flex" flexGrow={1}>
                <ListItem sx={{ p: 3, width: '25%' }}>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                      gutterBottom: true
                    }}
                    secondaryTypographyProps={{
                      variant: 'subtitle2',
                      lineHeight: 1
                    }}
                    primary="ChatGPT API Key"
                    secondary="You can change your api key here"
                  />
                </ListItem>
                <ListItem sx={{ width: '50%' }}>
                  <TextField
                    required
                    label="ChatGPT API Key"
                    name="type"
                    fullWidth
                    value={updatedGPTKey}
                    disabled={disableEditGPTKey}
                    onChange={handleKeyChange}
                  />
                </ListItem>

                {showEditGPTKey && (
                  <ListItem sx={{ width: '25%' }}>
                    <Button
                      variant="contained"
                      startIcon={<EditTwoToneIcon />}
                      onClick={handleEditGPTKey}
                    >
                      Edit
                    </Button>
                  </ListItem>
                )}
                {!!!showEditGPTKey && (
                  <ListItem sx={{ width: '12.5%' }}>
                    <Button variant="contained" onClick={handleCancelGPTKey}>
                      Cancel
                    </Button>
                  </ListItem>
                )}
                {!!!showEditGPTKey && (
                  <ListItem sx={{ width: '12.5%' }}>
                    <Button variant="contained" onClick={handleSubmitGPTKey}>
                      Save
                    </Button>
                  </ListItem>
                )}
              </List>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <List component={Box} display="flex" flexGrow={1}>
                <ListItem sx={{ p: 3, width: '25%' }}>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                      gutterBottom: true
                    }}
                    secondaryTypographyProps={{
                      variant: 'subtitle2',
                      lineHeight: 1
                    }}
                    primary="Slack Signing Secret"
                    secondary="You can change your signing secret here"
                  />
                </ListItem>
                <ListItem sx={{ width: '50%' }}>
                  <TextField
                    required
                    label="ChatGPT API Key"
                    name="type"
                    fullWidth
                    value={updatedSlackSigningSecret}
                    disabled={disableEditSlackSigningSecret}
                    onChange={handleSlackSecretChange}
                  />
                </ListItem>

                {showEditSlackSigningSecret && (
                  <ListItem sx={{ width: '25%' }}>
                    <Button
                      variant="contained"
                      startIcon={<EditTwoToneIcon />}
                      onClick={handleEditSlackSigningSecret}
                    >
                      Edit
                    </Button>
                  </ListItem>
                )}
                {!!!showEditSlackSigningSecret && (
                  <ListItem sx={{ width: '12.5%' }}>
                    <Button variant="contained" onClick={handleCancelSlackSigningSecret}>
                      Cancel
                    </Button>
                  </ListItem>
                )}
                {!!!showEditSlackSigningSecret && (
                  <ListItem sx={{ width: '12.5%' }}>
                    <Button variant="contained" onClick={handleSubmitSlackSigningSecret}>
                      Save
                    </Button>
                  </ListItem>
                )}
              </List>
            </Stack>
          </Card>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Parameters.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Parameters;
