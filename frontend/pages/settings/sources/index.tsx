import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import DataTable from '@/components/DataTable';
import { DataSourceAPI } from '@/apis/DataSourceAPI';
// import { DataSourceModel } from '@/models/DataSourceModel';

const DataSourceModel = [
  { name: 'type', type: 'string' },
  { name: 'url', type: 'string' },
  { name: 'username', type: 'string' },
  { name: 'port', type: 'string' },
  { name: 'database', type: 'string' }
];

function DataSources() {
  const [dataSources, setDataSources] = useState();

  useEffect(() => {
    DataSourceAPI.getAll().then((dataSources) => {
      // response handling
      setDataSources(dataSources);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Data Sources</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Data Sources"
          subHeading="Manage your data sources"
          docs="/settings/sources/create"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <DataTable
              title="Data Sources"
              model={DataSourceModel}
              data={dataSources}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DataSources.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DataSources;
