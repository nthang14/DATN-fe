import { useRef, useState } from "react";
import "~/components/common/DropZone/style.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import * as React from "react";
import SubTitleCommon from "~/components/common/SubTitleCommon";
import { useTranslations } from "next-intl";
import ButtonCommon from "~/components/common/ButtonCommon";
import CloseIcon from "@mui/icons-material/Close";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { setShowLoading } from "~/app/slices/commonSlice";
import { PATH_API } from "~/utils/constants";
import { store } from "~/app/store";

const DropZone = ({ ...props }) => {
  const t = useTranslations();
  const dialog = useTranslations("dialog.upload_image");
  const button = useTranslations("common.button");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [removeUpload, setRemoveUpload] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [errorFileContent, setErrorFileContent] = useState("");
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D8D8D8",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: "#64B334",
    },
  }));
  const handleUploadImage = async (image: any) => {
    await store.dispatch(setShowLoading(false));
    await setRemoveUpload(true);
    let formData = new FormData();
    formData.append("image", image);
    await setRemoveUpload(false);
    await store.dispatch(setShowLoading(true));
    props.setDisabledSubmit(false);
  };

  const removeImage = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = "";
    }

    props.setFile(null);
  };
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleUploadFile = (newFile: any) => {
    const fileType = newFile[0]["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/apng",
      "image/avif",
      "image/webp",
      "image/svg+xml",
    ];
    setErrorFile(false);
    setErrorFileContent("");
    if (!validImageTypes.includes(fileType)) {
      setErrorFile(true);
      removeImage();
      setErrorFileContent(t("common.messages.msg003", { field: "Image" }));
    } else if (newFile[0].size / (1024 * 1024) > 3) {
      setErrorFile(true);
      removeImage();
      setErrorFileContent(t("common.messages.msg017"));
    } else {
      props.setFile(newFile[0]);
      handleUploadImage(newFile[0]);
    }
  };

  const handleFile = (e: any) => {
    let newFile = e.target.files;
    if (newFile[0]) {
      handleUploadFile(newFile);
    }
  };

  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let newFile = e.dataTransfer.files;
      if (newFile[0]) {
        handleUploadFile(newFile);
      }
    }
  };

  return (
    <>
      <div className="items-center">
        <div
          className="rounded-md w-[862px] h-[312px]"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div
            className={
              "items-center w-full h-full relative upload-img-area" +
              (errorFile ? "  bg-dashed-err" : " bg-dashed")
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={12} className={"text-center"}>
                <CloudUploadIcon
                  sx={{ fontSize: 80 }}
                  className={"text-center w-[80px] fill-primary mt-2"}
                />
              </Grid>
              <Grid item xs={12} className={"text-center !pt-3"}>
                <SubTitleCommon title={dialog("content")} className={"!mb-0"} />
              </Grid>
              <Grid item xs={12} className={"text-center !pt-3"}>
                <Typography>{dialog("description")}</Typography>
              </Grid>
              <Grid item xs={12} className={"text-center"}>
                <input
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFile}
                  className="hidden"
                  name="file"
                />
                <ButtonCommon
                  className="btn bg-primary w-[214px] h-[48px] cursor-pointer mt-8"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => inputFileRef.current?.click()}
                  title={button("choose_file")}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-1 mb-8 w-full">
        {props.file ? (
          <div className="w-full h-16 flex items-center justify-between rounded pt-8 bg-white">
            <div className="flex gap-4 w-full">
              <div className="h-10">
                <picture>
                  <img
                    className="w-full h-full rounded"
                    src={URL.createObjectURL(props.file)}
                    alt="drop-zone"
                  />
                </picture>
              </div>
              <div className={"w-full h-10 flex justify-between flex-col"}>
                <div
                  className={
                    "text-[14px] leading-5 font-semibold flex flex-row items-center justify-between"
                  }
                >
                  <span className="truncate w-[85%]">{props.file.name}</span>
                  {removeUpload ? (
                    <CloseIcon
                      onClick={removeImage}
                      className={"cursor-pointer"}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <Box sx={{ position: "relative" }}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={props.progressNumber}
                  />
                </Box>
              </div>
            </div>
            <div
              onClick={removeImage}
              className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
            >
              <i className="mdi mdi-trash-can text-white text-[14px]"></i>
            </div>
          </div>
        ) : (
          <div className="w-full h-24 flex justify-between rounded bg-white">
            {errorFile && (
              <Typography className="text-[14px] leading-[20px] tracking-[.25px] font-normal text-error">
                {errorFileContent}
              </Typography>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DropZone;
