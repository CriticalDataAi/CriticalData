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

import { TrainingStatementAPI } from '@/apis/TrainingStatementAPI';
import { TrainingStatementModel } from '@/models/TrainingStatementModel';

import Footer from '@/components/Footer';

function EditTrainingStatements() {
  const router = useRouter();
  const [trainingStatement, setTrainingStatement] =
    useState<TrainingStatementModel>();

  const { id } = router.query;

  useEffect(() => {
    id &&
      TrainingStatementAPI.get(id).then((trainingStatement) => {
        setTrainingStatement(trainingStatement);
      });
  }, [id]);

  const validationSchema = yup.object({
    context: yup.string().required('Context is required'),
    query: yup.string().required('Query is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: trainingStatement?.id || '',
      context: trainingStatement?.context || '',
      query: trainingStatement?.query || ''
    },
    validationSchema: validationSchema,
    onSubmit: async ({ id, context, query }) => {
      TrainingStatementAPI.edit(id, {
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
            <CardHeader title="Edit Training Statement" />
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
                      label="Context"
                      name="context"
                      onChange={formik.handleChange}
                      value={formik.values.context}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      multiline
                      rows={20}
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

EditTrainingStatements.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default EditTrainingStatements;
