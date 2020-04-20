export default {
  palette: {
      primary: {
        light: '#ffffff',
        main: '#f9f9f9',
        dark: '#c6c6c6',
        contrastText: '#000000'
      },
      secondary: {
        light: '#ff9d3f',
        main: '#ef6c00',
        dark: '#b53d00',
        contrastText: '#000000'
      }
    },

    // the object to be spread
    spreadThis: {
       typography: {
        useNextVariants: true
      },
      form: {
        textAlign: "center"
      },
      image: {
        margin: "10px auto 10px auto",
        width: "100%"
      },
      pageTitle: {
        margin: "10px auto 10px auto"
      },
      textField: {
        margin: "10px auto 10px auto"
      },
      button: {
        marginTop: 20,
        position: "relative"
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
    },
      customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 5
      },
      progress: {
        position: "absolute",
        color: "red"
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 100,
          height: 100,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      }
      
}
};