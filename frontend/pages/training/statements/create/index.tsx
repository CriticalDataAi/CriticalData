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
  Button
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { TrainingStatementAPI } from '@/apis/TrainingStatementAPI';

import Footer from '@/components/Footer';

function CreateTrainingStatements() {
  const router = useRouter();

  const validationSchema = yup.object({
    context: yup.string().required('Type is required'),
    query: yup.string().required('URL is required')
  });

  const formik = useFormik({
    initialValues: {
      context: '',
      query: ''
    },
    validationSchema: validationSchema,
    onSubmit: async ({ context, query }) => {
      TrainingStatementAPI.create({
        context,
        query
      });

      router.push({
        pathname: '/training/statements'
      });
    }
  });

  return (
    <>
      <Head>
        <title>Training Statements</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Training Statements"
          subHeading="Teach your model how to respond to questions"
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
            <CardHeader title="Create Training Statements" />
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                >
                  <div>
                    <TextField
                      required
                      label="Context"
                      name="context"
                      onChange={formik.handleChange}
                      value={formik.values.context}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      label="Query"
                      name="query"
                      onChange={formik.handleChange}
                      value={formik.values.query}
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

CreateTrainingStatements.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default CreateTrainingStatements;
