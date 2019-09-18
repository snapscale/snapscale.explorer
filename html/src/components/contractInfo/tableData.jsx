import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReactJson from 'react-json-view';

let AccountTag = '';
let nameTag = '';
let limitTag = '';
let updateFunc = () => {};
const timmer = setInterval(() => {
  try {
    updateFunc();
  } catch (e) {
    // e
  }
}, 1000);

const TablesData = (props) => {
  const arr = window.location.pathname.split('/');
  const account = arr[arr.length - 1];

  const [tableData, setTableData] = React.useState({
    keys: [],
    data: [],
  });

  const update = () => {
    _x.utils.request('contract', JSON.stringify({
      code: account,
      scope: props.name,
      limit: props.limit,
    }), (data) => {
      try {
        const xdt = JSON.parse(data);
        console.log(xdt);

        setTableData({
          keys: (xdt.rows.length === 0) ? [] : Object.keys(xdt.rows[0]),
          data: xdt.rows,
        });
      } catch (e) {
        console.log(data);
      }
    });
  };

  updateFunc = update;

  if (AccountTag !== account || nameTag !== props.name || limitTag !== props.limit) {
    update();
  }

  AccountTag = account;
  nameTag = props.name;
  limitTag = props.limit;

  return pug`
    Table
      TableHead
        TableRow
          each item, index in tableData.keys
            TableCell
              =item
      TableBody
        each item, index in tableData.data
          TableRow
            each item2, index2 in tableData.keys
              TableCell
                if typeof item[item2] === 'object'
                  ReactJson(
                    src=item[item2]
                    enableClipboard=false
                    collapsed=2
                  )
                else
                  =item[item2]
  `;
};

export default TablesData;
