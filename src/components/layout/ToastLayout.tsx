import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
export default function EmptyLayout({ children }: any) {
  const dispatch = useDispatch();
  const isShowNotify = useSelector((state: any) => state.common.isShowNotify);
  const notifyContent = useSelector((state: any) => state.common.notifyContent);
  const typeAlert = useSelector((state: any) => state.common.typeAlert);

  return (
    <>
      {children}
      {typeAlert ? (
        <Snackbar
          open={isShowNotify}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          onClose={(e) =>
            dispatch(
              setNotify({
                isShowNotify: false,
                notifyContent: "",
                typeAlert: null,
              })
            )
          }
        >
          <Alert
            icon={
              typeAlert === "success" ? (
                <CheckCircleIcon className="fill-primary" />
              ) : typeAlert === "error" ? (
                <ErrorIcon className="fill-error" />
              ) : (
                ""
              )
            }
            severity={typeAlert}
            sx={{ width: "100%", padding: "8px 16px", minWidth: "320px" }}
            className={"leading-5 text-neutral-09 font-semibold"}
          >
            {notifyContent}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}
