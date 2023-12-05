import React, { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import {
  Grid,
  Container,
  Card,
  Paper,
  IconButton,
  InputBase
} from '@mui/material';
import Footer from '@/components/Footer';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { QuestionAPI } from '@/apis/QuestionAPI';

function AskQuestion() {
  const [writtenQuestion, setWrittenQuestion] = useState<string>('');
  const [questionResponse, setQuestionResponse] = useState<string>('');

  const handleQuestionChange = (e) => {
    setWrittenQuestion(e.target.value);
  };

  const handleQuestionSubmit = async () => {
    QuestionAPI.search(writtenQuestion).then((data) => {
      setQuestionResponse(data);
    });
  };

  return (
    <>
      <Head>
        <title>Data Sources</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Ask your Question"
          subHeading="Input your business question here and wait for the answer"
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
        <Card sx={{ minHeight: '600px' }}>
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 'fullWidth'
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Ask Question"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={handleQuestionChange}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handleQuestionSubmit}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Card>{questionResponse}</Card>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

AskQuestion.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default AskQuestion;
