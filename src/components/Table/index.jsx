import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import "./style.scss";
import { categoryColumns, productColumns } from '../../constants';
import { CircularProgress } from '@mui/material';

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(columns) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: '#f5f5f5', fontSize: '16px', fontWeight: 600 }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row, handleDelete, handleUpdate, columns) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
          sx={{ fontSize: "15px" }}
        >
          {column.dataKey === 'img' ? (
            <img src={row[column.dataKey]} alt="product" width="60" />
          ) : column.dataKey === 'category' ? (
            row.category?.name || "No category"
          ) : column.dataKey === 'actions' ? (
            <div className='buttons__wrapper'>
              <button onClick={() => handleDelete(row.id)} className='delete__button'>
                <MdDelete />
              </button>
              <button onClick={() => handleUpdate(row.id)} className='edit__button'>
                <RiEditFill />
              </button>
            </div>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </>
  );
}

export default function TableT({ data, handleDelete, handleUpdate, tableType, loading }) {
  const columns = tableType === "product" ? productColumns  : categoryColumns;

  return (
    <Paper style={{ height: "100%", width: '100%' }}>
      {!loading ? <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => fixedHeaderContent(columns)}
        itemContent={(index, row) => rowContent(index, row, handleDelete, handleUpdate, columns)}
      /> : <CircularProgress />}
    </Paper>
  );
}
