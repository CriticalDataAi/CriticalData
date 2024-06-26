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
  Button
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { UsersAPI } from '@/apis/UsersAPI';
import { UsersModel } from '@/models/UsersModel';

import Footer from '@/components/Footer';

function EditUsers() {
  const router = useRouter();
  const [users, setUsers] =
    useState<UsersModel>();

  const { id } = router.query;

  useEffect(() => {
    id &&
      UsersAPI.get(id).then((users) => {
        setUsers(users);
      });
  }, [id]);

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: users?.id || '',
      name: users?.name || '',
      email: users?.email || '',
      password: users?.password || '',
      role: users?.role || '',
      slackUser: users?.slackUser || '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ id, name, email, password, role, slackUser }) => {
      UsersAPI.edit(id, {
        name,
        email,
        password,
        role,
        slackUser
      });

      router.push({
        pathname: '/users'
      });
    }
  });

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="User"
          subHeading="Manage the users asking questions"
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
            <CardHeader title="Edit Users" />
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '98.5%' }
                  }}
                >
                  <div>
                    <TextField
                      required
                      label="Name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Password"
                      name="password"
                      type='password'
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Role"
                      name="role"
                      onChange={formik.handleChange}
                      value={formik.values.role}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Slack User"
                      name="slackUser"
                      onChange={formik.handleChange}
                      value={formik.values.slackUser}
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

EditUsers.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default EditUsers;
