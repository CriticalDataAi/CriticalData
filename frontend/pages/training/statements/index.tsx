import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import DataTable from '@/components/DataTable';
import { TrainingStatementAPI } from '@/apis/TrainingStatementAPI';

const TrainingStatementModel = [
  { name: 'context', type: 'string' },
  { name: 'query', type: 'string' }
];

function TrainingStatements() {
  return (
    <>
      <Head>
        <title>Training Statements</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Training Statements"
          subHeading="Teach your model how to respond to questions"
          docs="/training/statements/create"
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
          <DataTable
            title="Training Statements"
            model={TrainingStatementModel}
            modelAPI={TrainingStatementAPI}
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

TrainingStatements.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default TrainingStatements;
