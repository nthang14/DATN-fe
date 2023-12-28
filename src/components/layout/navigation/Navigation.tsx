import {
  ListItemText,
  List,
  Popover,
  Dialog,
  DialogActions,
  ListItemButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useTranslations } from "next-intl";
import { createElement, useState } from "react";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import ButtonCommon from "~/components/common/ButtonCommon";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useCreateFolderMutation } from "~/app/services/folderService";
import { TypeFolder } from "~/types/globalTypes";
import { useRef } from "react";
import { useUploadFileMutation } from "~/app/services/fileService";
import { useDispatch } from "react-redux";
import { setNotify, setIsReload } from "~/app/slices/commonSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useGetTotalSizeQuery } from "~/app/services/fileService";
import { convertByte } from "~/utils/helpers";

export default function Navigation() {
  const [createFolder] = useCreateFolderMutation();
  const [uploadFile] = useUploadFileMutation();
  const dispatch = useDispatch();
  const refInput = useRef();
  const t = useTranslations();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const fetchTotalSize = useGetTotalSizeQuery({});
  const menus = [
    {
      key: "home",
      label: t("nav.home"),
      icon: createElement(HomeIcon),
      handleClick: () => {
        router.push("/");
      },
      children: [],
    },
    {
      key: "my-drive",
      label: t("nav.myDrive"),
      icon: createElement(AddToDriveIcon),
      handleClick: () => {
        router.push("/my-drive");
      },
      children: [],
    },
    {
      key: "shared-with-me",
      label: t("nav.sharedDrive"),
      icon: createElement(FolderSharedIcon),
      handleClick: () => {
        router.push("/shared-with-me");
      },
      children: [],
    },
    {
      key: "star",
      label: t("nav.star"),
      icon: createElement(StarBorderIcon),
      handleClick: () => {
        router.push("/star");
      },
      children: [],
    },
  ];
  const [actives, setActives] = useState<string>(t("nav.myDrive"));
  const handleOpenCollapse = (key: string) => {
    setActives(key);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isDialog, setIsDialog] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleOpenFolder = () => {
    setIsDialog(true);
    setAnchorEl(undefined);
  };
  const doSubmit = async (formValue: TypeFolder) => {
    const payloadFolder = router?.query?.folderId
      ? { ...formValue, parentId: router?.query?.folderId }
      : formValue;
    const result = await createFolder(payloadFolder);
    if (result) {
      setIsDialog(false);
      dispatch(setIsReload(true));
      reset();
    }
  };
  const handleOpenInput = () => {
    refInput?.current.click();
    setAnchorEl(undefined);
  };
  const handleUploadFile = async (e: any) => {
    let newFile = e.target.files;
    let formData = new FormData();
    const parentId = router?.query?.folderId || "";
    if (parentId) {
      formData.append("parentId", parentId);
    }
    if (newFile[0]) {
      formData.append("file", newFile[0]);
      const result = await uploadFile(formData);
      if (result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg016"),
            typeAlert: "success",
          })
        );
        dispatch(setIsReload(true));
      }
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <ButtonCommon
          aria-describedby={id}
          variant="contained"
          color="primary"
          className="w-[80px] rounded-3xl"
          onClick={handleClick}
        >
          <AddIcon fontSize="medium" className="fill-[#fff]" />
          <span className="text-[20px] text-white">
            {t("common.button.add")}
          </span>
        </ButtonCommon>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className="p-10"
        >
          <div className="p-4">
            <div
              onClick={handleOpenFolder}
              className="flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
            >
              <CreateNewFolderIcon />
              <span className="pl-3 text-[14px]">
                {t("common.button.newFolder")}
              </span>
            </div>
            <div
              onClick={handleOpenInput}
              className="flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
            >
              <UploadFileIcon />
              <span className="pl-3 text-[14px]">
                {t("common.button.fileUpload")}
              </span>
            </div>
          </div>
        </Popover>
      </div>
      <List
        sx={{
          width: "224.03px",
          maxWidth: 360,
          bgcolor: "background.paper",
          padding: "12px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {menus.map((menu: any, indexMenu: number) => {
          return (
            <div key={menu.key} className="pt-2">
              <ListItemButton
                className={`rounded-2xl hover:bg-[#F2F9ED] ${
                  router?.pathname === `/${menu.key}` ||
                  (router?.pathname === "/" && menu.key === "home")
                    ? " bg-[#F2F9ED]"
                    : ""
                }`}
                onClick={() => menu.handleClick()}
              >
                {menu.icon || ""}
                <ListItemText className="pl-3">
                  <div className="text-sm font-medium text-[14px] text-neutral">
                    {menu.label}
                  </div>
                </ListItemText>
              </ListItemButton>
            </div>
          );
        })}
        <ListItemText className="pl-3">
          <div className="text-sm font-medium text-[14px] text-neutral">
            <div>
              Tổng bộ nhớ đã dùng:
              {convertByte(
                fetchTotalSize?.data && fetchTotalSize?.data.length > 0
                  ? fetchTotalSize?.data[0]?.totalByte
                  : 0
              )}
            </div>
          </div>
        </ListItemText>
      </List>
      <Dialog open={isDialog} onClose={handleClose}>
        <DialogTitle>
          <div className="text-center">{t("common.button.newFolder")}</div>
        </DialogTitle>
        <DialogContent>
          <div className="py-3 pb-10">
            <InputHasValidate
              control={control}
              name="title"
              rules={{
                required: t("common.messages.msg001input", {
                  field: t("folderForm.nameFolder"),
                }),
              }}
              label={`${t("folderForm.nameFolder")} *`}
              error={errors.title}
              inputProps={{
                style: {
                  color: errors.title && "#B33434",
                },
              }}
              type="text"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonCommon
            color="primary"
            variant="outlined"
            className="w-[80px] rounded-3xl"
            onClick={() => setIsDialog(false)}
          >
            {t("common.button.cancel")}
          </ButtonCommon>
          <ButtonCommon
            onClick={handleSubmit(doSubmit)}
            color="primary"
            className="w-[80px] rounded-3xl"
          >
            {t("common.button.submit")}
          </ButtonCommon>
        </DialogActions>
      </Dialog>
      <input
        type="file"
        ref={refInput}
        className="hidden"
        onChange={handleUploadFile}
      />
    </>
  );
}
