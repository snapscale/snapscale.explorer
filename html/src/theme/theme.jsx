import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0.1rem',
      },
    },
    MuiInputBase: {
      input: {
        font: 'normal',
      },
    },
    MuiTab: {
      labelIcon: {
        minHeight: '2.5rem',
      },
    },
    MuiTableCell: {
      head: {
        fontSize: '0.8rem',
        letterSpacing: '1px',
        lineHeight: 1.6,
        fontWeight: 'normal',
        color: '#333333',
      },
      root: {
        minWidth: 200,
        padding: '0.7rem 2rem 0.7rem 0.8rem',
        '&:first-child': {
          paddingLeft: 60,
        },
      },
      body: {
        fontSize: '0.7rem',
        fontWeight: 'bold',
      },
    },
    MuiTableRow: {
      root: {
        height: 80,
      },
    },
    MuiSvgIcon: {
      root: {
        width: '0.8rem',
        height: '0.8rem',
      },
    },
    MuiTablePagination: {
      selectIcon: {
        top: 'calc(50% - 0.4rem)',
      },
    },
    MuiChip: {
      root: {
        fontSize: '0.7rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#F23847',
      dark: '#BF3945',
      contrastText: '#333333',
    },
    secondary: {
      main: '#382AC7',
      contrastText: '#333333',
    },
  },
  typography: {
    fontFamily: [
      'Nunito Sans',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'Hiragino Sans GB',
      'Hiragino Sans GB W3',
      'Microsoft YaHei UI',
      'Microsoft YaHei',
      'WenQuanYi Micro Hei',
      'sans-serif',
    ].join(','),
    h2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: '800',
    },
    h3: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      fontWeight: '700',
    },
    h4: {
      fontSize: '0.8rem',
      lineHeight: 1.6,
      fontWeight: '600',
    },
    h5: {
      fontSize: '0.7rem',
      lineHeight: 1.6,
      fontWeight: '500',
    },
    h6: {
      fontSize: '0.7rem',
      lineHeight: 2,
    },
    body1: {
      fontSize: '0.7rem',
      fontWeight: '400',
      lineHeight: 1.6,
    },
    boyd2: {

    },
    caption: {
      fontSize: '0.6rem',
      fontWeight: '300',
      lineHeight: 1.6,
    },
  },
});

export default theme;
