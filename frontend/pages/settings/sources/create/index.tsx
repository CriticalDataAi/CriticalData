import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Footer from '@/components/Footer';

// const DataSourceModel = [
//   { name: 'type', type: 'string' },
//   { name: 'url', type: 'string' },
//   { name: 'username', type: 'string' },
//   { name: 'password', type: 'string' },
//   { name: 'port', type: 'string' },
//   { name: 'database', type: 'string' }
// ];

function DataSources() {
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
        ></Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Create Data Sources" />
            <Divider />
            <CardContent>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField required label="Type" defaultValue="PostgreSQL" />
                  <TextField required label="URL" defaultValue="" />
                </div>
                <div>
                  <TextField required label="Username" defaultValue="" />
                  <TextField
                    required
                    label="Password"
                    type="password"
                    defaultValue=""
                  />
                </div>
                <div>
                  <TextField required label="Database" defaultValue="" />
                  <TextField required label="Port" defaultValue="" />
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DataSources.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DataSources;
