const customTheme = {
  palette: {
    primary: {
      light: '#e4ffff',
      main: '#b1ddd9',
      dark: '#81aba8',
      contrastText: '#000000',
    },
    secondary: {
      light: '#eeffff',
      main: '#bbdefb',
      dark: '#8aacc8',
      contrastText: '#000000',
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    image: {
      height: 100,
      margin: '20px auto 10px auto',
    },
    form: {
      textAlign: 'Center',
    },
    textField: {
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      marginBottom: 10,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
  },
}

export default customTheme
