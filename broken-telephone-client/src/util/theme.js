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
    spacing: 8,
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
    paper: {
      padding: 20,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#b1ddd9',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
    card: {
      display: 'flex',
      marginBottom: 20,
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25,
    },
    cover: {
      minWidth: 200,
      objectFit: 'cover',
    },
    handle: {
      width: 60,
      height: 25,
      backgroundColor: '#b1ddd9',
      marginBottom: 6,
    },
    date: {
      height: 14,
      width: 80,
      marginBottom: 6,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
}

export default customTheme
