import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import DataTable from '@/components/DataTable';
import { HistoryAPI } from '@/apis/HistoryAPI';

const HistoryModel = [
  { name: 'questionSource', type: 'string' },
  { name: 'questionUsername', type: 'string' },
  { name: 'questionAsked', type: 'string' },
  { name: 'status', type: 'string' },
  { name: 'validationStatus', type: 'string' }
];

function TrainingStatements() {
  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Execution History"
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
            title="Execution History"
            model={HistoryModel}
            modelAPI={HistoryAPI}
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

TrainingStatements.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default TrainingStatements;
