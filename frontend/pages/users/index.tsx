import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import DataTable from '@/components/DataTable';
import { UsersAPI } from '@/apis/UsersAPI';

const UserModel = [
  { name: 'name', type: 'string' },
  { name: 'email', type: 'string' },
  { name: 'role', type: 'string' },
  { name: 'slackUser', type: 'string' },
];

function Users() {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Users"
          docs="/users/create"
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
            model={UserModel}
            modelAPI={UsersAPI}
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Users.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Users;
