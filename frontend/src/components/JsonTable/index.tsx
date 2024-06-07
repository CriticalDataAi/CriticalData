
import { FC, ChangeEvent, useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import DeleteConfirmDialog from './delete-dialog';


interface JsonTableProps {
  rows: any;
}

const JsonTable: FC<JsonTableProps> = (props: JsonTableProps) => {
  const { rows } = props;

  // const data = JSON.parse(rows);
  const data = rows;
  const keys = Object.keys(data.length ? data[0] : {});

  return (
    <div className="JsonTable">
      {rows.length > 0 && (
        <table>
         <thead>
            <tr>
              {keys.map((item, idx) => (
                <th key={idx}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                {keys.map((key, colidx) => (
                  <td key={idx + "_" + colidx}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// JsonTable.propTypes = {
//   rows: PropTypes.string.isRequired
// };


export default JsonTable;
