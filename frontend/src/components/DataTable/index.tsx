import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

interface DataTableProps {
  title: string;
  model: any[];
  data?: any[];
}

const DataTable: FC<DataTableProps> = ({ title, model, data }) => {
  const [selectedData, setSelectedData] = useState<string[]>([]);
  // const selectedBulkActions = selectedData.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllData = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedData(event.target.checked ? data.map((row) => row.id) : []);
  };

  const handleSelectOneData = (
    _event: ChangeEvent<HTMLInputElement>,
    rowId: string
  ): void => {
    if (!selectedData.includes(rowId)) {
      setSelectedData((prevSelected) => [...prevSelected, rowId]);
    } else {
      setSelectedData((prevSelected) =>
        prevSelected.filter((id) => id !== rowId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const selectedSomeData =
    selectedData.length > 0 && selectedData.length < data.length;
  const selectedAllData =
    selectedData.length > 0 && selectedData.length === data.length;
  const theme = useTheme();

  return (
    <Card>
      {/* {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )} */}
      <CardHeader title={title} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllData}
                  indeterminate={selectedSomeData}
                  onChange={handleSelectAllData}
                />
              </TableCell>
              {model.map((object, i) => (
                <TableCell key={i}>{object.name}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const isDataSelected = selectedData.includes(row.id);
              return (
                <TableRow hover key={row.id} selected={isDataSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isDataSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneData(event, row.id)
                      }
                      value={isDataSelected}
                    />
                  </TableCell>
                  {model.map((object, i) => (
                    <TableCell key={i}>{row[object.name]}</TableCell>
                  ))}

                  <TableCell align="right">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={data.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired
};

DataTable.defaultProps = {
  data: []
};

export default DataTable;
