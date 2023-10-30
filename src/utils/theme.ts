import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";
export const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
const colorButton = {
  primary: {
    contained: {
      bgActive: "#64B334",
      bgDisabled: "#BCE5A3",
      bgHover: "#508F2A",
      text: "#F9F9F9",
    },
    outlined: {
      bgActive: "#FFFFFF",
      bgDisabled: "#FFFFFF",
      bgHover: "#F2F9ED",
      text: "#64B334",
      textDisabled: "#BCE5A3",
    },
    text: {
      bgActive: "#FFFFFF",
      bgDisabled: "#FFFFFF",
      bgHover: "#F2F9ED",
      text: "#64B334",
      textDisabled: "#BCE5A3",
    },
  },
  info: {
    contained: {
      bgActive: "#1F6FA4",
      bgDisabled: "#A5C5DB",
      bgHover: "#195983",
      text: "#F9F9F9",
    },
    outlined: {
      bgActive: "#FFFFFF",
      bgDisabled: "#FFFFFF",
      bgHover: "#D2E2ED",
      text: "#1F6FA4",
      textDisabled: "#A5C5DB",
    },
    text: {
      bgActive: "#FFFFFF",
      bgDisabled: "#FFFFFF",
      bgHover: "#D2E2ED",
      text: "#1F6FA4",
      textDisabled: "#A5C5DB",
    },
  },
  error: {
    contained: {
      bgActive: "#B33434",
      bgDisabled: "#E0A0A0",
      bgHover: "#8F2A2A",
      text: "#F9F9F9",
    },
    outlined: {
      bgActive: "#FFFFFF",
      bgDisabled: "#FFFFFF",
      bgHover: "#EFCDCD",
      text: "#B33434",
      textDisabled: "#E0A0A0",
    },
    text: {
      bgActive: "#FFFFFF",
      bgDisabled: "#FFFFFF",
      bgHover: "#EFCDCD",
      text: "#B33434",
      textDisabled: "#E0A0A0",
    },
  },
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#64B334",
    },
    error: {
      main: "#B33434",
    },
    secondary: {
      main: "#071507",
    },
    info: {
      main: "#1F6FA4",
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    allVariants: {
      fontFamily: poppins.style.fontFamily,
      textTransform: "none",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          padding: "16px",
          maxHeight: "676px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "0px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none"
        },
        sizeSmall: {
          height: "40px",
          minWidth: "153px",
          textAlign: "center",
          fontSize: "16px",
        },
        sizeLarge: {
          height: "56px",
          minWidth: "171px",
          textAlign: "center",
          fontSize: "16px",
        },
        sizeMedium: {
          height: "48px",
          minWidth: "140px",
          textAlign: "center",
          fontSize: "16px",
        },
        containedPrimary: {
          backgroundColor: colorButton.primary.contained.bgActive,
          color: colorButton.primary.contained.text,
          "&:hover": {
            backgroundColor: colorButton.primary.contained.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.primary.contained.bgDisabled,
            color: colorButton.error.contained.text,
          },
        },
        containedInfo: {
          backgroundColor: colorButton.info.contained.bgActive,
          color: colorButton.info.contained.text,
          "&:hover": {
            backgroundColor: colorButton.info.contained.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.info.contained.bgDisabled,
            color: colorButton.error.contained.text,
          },
        },
        containedError: {
          backgroundColor: colorButton.error.contained.bgActive,
          color: colorButton.error.contained.text,
          "&:hover": {
            backgroundColor: colorButton.error.contained.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.error.contained.bgDisabled,
            color: colorButton.error.contained.text,
          },
        },
        outlinedPrimary: {
          backgroundColor: colorButton.primary.outlined.bgActive,
          color: colorButton.primary.outlined.text,
          border: `1px solid ${colorButton.primary.outlined.text}`,
          "&:hover": {
            backgroundColor: colorButton.primary.outlined.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.primary.outlined.bgDisabled,
            color: colorButton.primary.outlined.textDisabled,
            border: `1px solid ${colorButton.primary.outlined.textDisabled}`,
          },
        },
        outlinedInfo: {
          backgroundColor: colorButton.info.outlined.bgActive,
          color: colorButton.info.outlined.text,
          border: `1px solid ${colorButton.info.outlined.text}`,
          "&:hover": {
            backgroundColor: colorButton.info.outlined.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.info.outlined.bgDisabled,
            color: colorButton.info.outlined.textDisabled,
            border: `1px solid ${colorButton.info.outlined.textDisabled}`,
          },
        },
        outlinedError: {
          backgroundColor: colorButton.error.outlined.bgActive,
          color: colorButton.error.outlined.text,
          border: `1px solid ${colorButton.error.outlined.text}`,
          "&:hover": {
            backgroundColor: colorButton.error.outlined.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.error.outlined.bgDisabled,
            color: colorButton.error.outlined.textDisabled,
            border: `1px solid ${colorButton.error.outlined.textDisabled}`,
          },
        },
        textPrimary: {
          backgroundColor: colorButton.primary.text.bgActive,
          color: colorButton.primary.text.text,
          "&:hover": {
            backgroundColor: colorButton.primary.text.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.primary.text.bgDisabled,
            color: colorButton.primary.text.textDisabled,
          },
        },
        textInfo: {
          backgroundColor: colorButton.info.text.bgActive,
          color: colorButton.info.text.text,
          "&:hover": {
            backgroundColor: colorButton.info.text.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.info.text.bgDisabled,
            color: colorButton.info.text.textDisabled,
          },
        },
        textError: {
          backgroundColor: colorButton.error.text.bgActive,
          color: colorButton.error.text.text,
          "&:hover": {
            backgroundColor: colorButton.error.text.bgHover,
            boxShadow: "none"
          },
          ":disabled": {
            backgroundColor: colorButton.error.text.bgDisabled,
            color: colorButton.error.text.textDisabled,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#2A2D29",
          fontWeight: "400",
          borderRadius: "4px",
          ":disabled": {
            backgroundColor: "#ECECEC",
            color: "#333433",
            letterSpacing: "0.25px",
            WebkitTextFillColor: "#333433",
          },
          fontSize: "14px",
          lineHeight: "20px",
          '&::placeholder': {
            fontSize: "14px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#2A2D29",
          height: "56px",
          fontSize: "14px",
          fontWeight: "400",
          "& label.Mui-focused": {
            color: "#508F2A",
          },
          "& label.MuiInputLabel-shrink:not(.Mui-focused):not(.Mui-error)": {
            color: "#555754!important",
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "400",
        }
      }
    },
    
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          color: "#64B334",
          backgroundColor: "#F2F9ED",
        },
        colorWarning: {
          color: "#E99414",
          backgroundColor: "#FFF9F0",
        },
        colorSuccess: {
          color: "#64B334",
          backgroundColor: "#F2F9ED",
        },
        label: {
          color: "unset",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          // paddingBottom: "100px",
          // bottom: "0 !important"
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "16px"
        },
        outlinedSuccess: {
          border: "1px solid #64B334",
          backgroundColor: "#F2F9ED",
        },
        outlinedError: {
          border: "1px solid #E0A0A0",
          backgroundColor: "#FFF9F0",
        },
        message: {
          display: "flex",
          alignItems: "center"
        }
      },
    },
  },
});
export default theme;
