import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { DataSourceModel } from '@/models/DataSourceModel';

import Footer from '@/components/Footer';

function EditDataSources() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<DataSourceModel>();

  const { id } = router.query;

  useEffect(() => {
    id &&
      DataSourceAPI.get(id).then((dataSource) => {
        setDataSource(dataSource);
      });
  }, [id]);

  const validationSchema = yup.object({
    type: yup.string().required('Type is required'),
    url: yup.string().required('URL is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    database: yup.string(),
    port: yup.string().required('Port is required'),
    schema: yup.string(),
    tablesToScan: yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dataSource?.id || '',
      type: dataSource?.type || '',
      url: dataSource?.url || '',
      username: dataSource?.username || '',
      password: dataSource?.password || '',
      database: dataSource?.database || '',
      port: dataSource?.port || '',
      schema: dataSource?.schema || '',
      tablesToScan: dataSource?.tablesToScan || ''
    },
    validationSchema: validationSchema,
    onSubmit: async ({
      id,
      type,
      url,
      username,
      password,
      database,
      port,
      schema,
      tablesToScan
    }) => {
      DataSourceAPI.edit(id, {
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
            <CardHeader title="Edit Data Source" />
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
                  Edit
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

EditDataSources.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default EditDataSources;
