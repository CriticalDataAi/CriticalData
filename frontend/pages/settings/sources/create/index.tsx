import { useRouter } from 'next/router';
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
  Divider,
  Button,
  FormControl,
  MenuItem
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { DataSourceAPI } from '@/apis/DataSourceAPI';

import Footer from '@/components/Footer';

function CreateDataSources() {
  const router = useRouter();

  const validationSchema = yup.object({
    type: yup.string().required('Type is required'),
    url: yup.string().required('URL is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    database: yup.string().required('Database is required'),
    port: yup.string().required('Port is required')
  });

  const formik = useFormik({
    initialValues: {
      type: 'PostgreSQL',
      url: '',
      username: '',
      password: '',
      database: '',
      port: '',
      schema: '',
      tablesToScan: ''
    },
    validationSchema: validationSchema,
    onSubmit: async ({
      type,
      url,
      username,
      password,
      database,
      port,
      schema,
      tablesToScan
    }) => {
      DataSourceAPI.create({
        type,
        url,
        username,
        password,
        database,
        port,
        schema,
        tablesToScan
      });

      router.push({
        pathname: '/settings/sources'
      });
    }
  });

  return (
    <>
      <Head>
        <title>Data Sources</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Data Sources"
          subHeading="Manage your data sources"
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
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '98.5%' }
                  }}
                >
                  <div>
                    <FormControl fullWidth sx={{ p: 1 }}>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={formik.values.type}
                        label="Age"
                        name="type"
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={'PostgreSQL'}>PostgreSQL</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      required
                      label="URL"
                      name="url"
                      onChange={formik.handleChange}
                      value={formik.values.url}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Username"
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <TextField
                      required
                      label="Password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Database"
                      name="database"
                      onChange={formik.handleChange}
                      value={formik.values.database}
                    />
                    <TextField
                      required
                      label="Port"
                      name="port"
                      onChange={formik.handleChange}
                      value={formik.values.port}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Schema"
                      name="schema"
                      onChange={formik.handleChange}
                      value={formik.values.schema}
                    />
                    <TextField
                      required
                      label="Tables To Scan"
                      name="tablesToScan"
                      multiline
                      rows={6}
                      onChange={formik.handleChange}
                      value={formik.values.tablesToScan}
                    />
                  </div>
                </Box>
              </CardContent>
              <Divider />
              <CardContent>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

CreateDataSources.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreateDataSources;
