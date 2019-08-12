import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Title from '../title/title.jsx';
import Loading from '../loading/loading.jsx';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1, 0, 3, 0),
  },
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.grey[200],
    borderRadius: '1rem !important',
  },
  detail: {
    flexDirection: 'column',
  },
  key: {
    overflow: 'hidden',
  },
}));

const Keys = (props) => {
  const classes = useStyles();
  const { values } = props;

  return pug`
    Title(
      Icon=LockIcon
      Text='Permissions & Keys'
    )
    div(className=classes.paper)
      ExpansionPanel(classes={root:classes.root})
        ExpansionPanelSummary(expandIcon=${pug`ExpandMoreIcon`})
          if values.ld
            Loading
          else
            Typography(variant='h5')
              |VIEW
              |&nbsp;
              =values.info.permissions.length
              |&nbsp;
              |PERMISSIONS
        ExpansionPanelDetails(classes={root:classes.detail})
          if !values.ld
            each item, index in values.info.permissions
              Grid(container)
                Grid(
                  item
                  md=2
                  xs=4
                )
                  Typography(variant='body1')
                    =item.perm_name
                    |&nbsp;->&nbsp;
                Grid(
                  item
                  md=8
                  xs=4
                )
                  Typography(
                    variant='body1'
                    className=classes.key
                  )
                    =item.required_auth.keys[0].key
                Grid(
                  item
                  md=2
                  xs=4
                )
                  Typography(
                    variant='body1'
                    align='right'
                  )
                    |(
                    =item.required_auth.keys[0].weight
                    |&nbsp;/&nbsp;
                    =item.required_auth.threshold
                    |)
  `;
};

export default Keys;
