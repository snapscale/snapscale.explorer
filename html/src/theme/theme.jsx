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
        borderRadius: '1rem',
      },
    },
    MuiInputBase: {
      input: {
        font: 'normal',
      },
    },
    MuiTab: {
      labelIcon: {
        minHeight: '25rem',
      },
    },
    MuiTableCell: {
      head: {
        fontSize: '7rem',
        lineHeight: 1.6,
      },
      root: {
        fontSize: '6rem',
        fontWeight: 100,
        padding: '7rem 20rem 7rem 8rem',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '8rem',
        height: '8rem',
      },
    },
    MuiTablePagination: {
      selectIcon: {
        top: 'calc(50% - 4rem)',
      },
    },
    MuiChip: {
      root: {
        fontSize: '7rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#F23847',
      dark: '#BF3945',
      contrastText: '#fefefe',
    },
    secondary: {
      main: '#0281C7',
      contrastText: '#0c0c0c',
    },
  },
  typography: {
    fontFamily: [
      'Nunito Sans',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h2: {
      fontSize: '10rem',
      lineHeight: 1.6,
      fontWeight: '800',
    },
    h3: {
      fontSize: '9rem',
      lineHeight: 1.6,
      fontWeight: '700',
    },
    h4: {
      fontSize: '8rem',
      lineHeight: 1.6,
      fontWeight: '600',
    },
    h5: {
      fontSize: '7rem',
      lineHeight: 1.6,
      fontWeight: '500',
    },
    h6: {
      fontSize: '7rem',
      lineHeight: 2,
    },
    body1: {
      fontSize: '7rem',
      fontWeight: '400',
      lineHeight: 1.6,
    },
    boyd2: {

    },
    caption: {
      fontSize: '6rem',
      fontWeight: '300',
      lineHeight: 1.6,
    },
  },
});

export default theme;
