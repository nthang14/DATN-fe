import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import Groups2Icon from "@mui/icons-material/Groups2";
import ButtonCommon from "~/components/common/ButtonCommon";
import { getColor } from "~/utils/helpers";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { useForm } from "react-hook-form";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { readProfile } from "~/utils/storage";
export default function FolderItem({
  handleOpenSelect,
  handleDelete,
  handleRemoveSharing,
  handleStar,
  handleRename,
  handleCreateNewFolder,
  data,
  ...props
}: any) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: data.title,
    },
  });
  const t = useTranslations();
  const router = useRouter();
  const profile = readProfile();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setAnchorEl(null);
    handleOpenSelect({ type: "folder", id: data.id });
  };
  const handleDeleteInter = () => {
    setAnchorEl(null);
    handleDelete({ type: "folder", id: data.id });
  };
  const [isDialog, setIsDialog] = React.useState<boolean>(false);
  const [isDialogEdit, setIsDialogEdit] = React.useState<boolean>(false);
  const [isDialogRemove, setIsDialogRemove] = React.useState<boolean>(false);
  const [isDialogNew, setIsDialogNew] = React.useState<boolean>(false);

  const [userId, setUserId] = React.useState<string>("");
  const handleOpenRemove = (value: string) => {
    setIsDialogRemove(true);
    setIsDialog(false);
    setAnchorEl(null);
    setUserId(value);
  };
  const handleUpdateStar = (data: any) => {
    handleStar(data);
    setAnchorEl(null);
  };
  const handleDoSubmitEdit = (value: any) => {
    handleRename({
      type: "folder",
      id: data.id,
      data: value,
    });
    setAnchorEl(null);
    setIsDialogEdit(false);
  };
  const handleSubmitNewFolder = (value: any) => {};
  return (
    <div>
      <div className="items-center justify-between flex  bg-[#e8f5e8] rounded-[10px] cursor-pointer">
        <div
          onClick={() => router.push(`/folder/${data.id}`)}
          className="flex items-center justify-start w-full px-4 py-3"
        >
          <FolderIcon />
          <p className="pl-3 text-line-1 text-[14px] font-medium">
            {data.title}
          </p>
        </div>
        <IconButton color="primary" aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon className="" />
        </IconButton>
      </div>
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
            onClick={() => setIsDialogEdit(true)}
            className="w-[200px] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            <EditIcon />
            <span className="pl-3 text-[14px]">
              {t("common.button.rename")}
            </span>
          </div>
          <div
            onClick={() => {
              reset();
              setIsDialogNew(true);
            }}
            className="flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            <CreateNewFolderIcon />
            <span className="pl-3 text-[14px]">
              {t("common.button.newFolder")}
            </span>
          </div>
          <div
            onClick={() => handleOpen()}
            className="w-[200px] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            <PersonAddIcon />
            <span className="pl-3 text-[14px]">{t("common.button.share")}</span>
          </div>
          <div
            onClick={() => handleDeleteInter()}
            className="w-[200px] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            <DeleteOutlineOutlinedIcon />
            <span className="pl-3 text-[14px]">
              {t("common.button.remove")}
            </span>
          </div>
          <div
            onClick={() => setIsDialog(true)}
            className="w-[200px] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            <Groups2Icon />
            <span className="pl-3 text-[14px]">
              {t("common.button.viewer")}
            </span>
          </div>

          {data.startIds.includes(profile?._id) ? (
            <div
              onClick={() => {
                setAnchorEl(null);
                handleUpdateStar({
                  id: data.id,
                  newValue: false,
                  type: "folder",
                });
              }}
              className="w-[200pxx] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
            >
              <div className="flex items-center">
                <StarIcon />
                {data.startIds.includes(profile?._id)}
                <span className="pl-3 text-[14px]">
                  {t("common.button.removeStar")}
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setAnchorEl(null);
                handleUpdateStar({
                  id: data.id,
                  newValue: true,
                  type: "folder",
                });
              }}
              className="w-[200pxx] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
            >
              <div className="flex items-center">
                <StarBorderIcon />
                <span className="pl-3 text-[14px]">
                  {t("common.button.star")}
                </span>
              </div>
            </div>
          )}
        </div>
      </Popover>
      <Dialog
        open={isDialog}
        onClose={() => {
          setIsDialog(false);
          setAnchorEl(null);
        }}
      >
        <div className="flex justify-end items-center">
          <CloseIcon
            className="cursor-pointer"
            onClick={() => {
              setIsDialog(false);
              setAnchorEl(null);
            }}
          />
        </div>
        <DialogTitle className="py-0">
          <div className="text-center">{t("common.listViewers")}</div>
        </DialogTitle>
        <DialogContent>
          <div className="py-3 pb-10">
            <div className="max-h-[300px] overflow-hidden overflow-y-auto">
              {data?.shared?.length
                ? data?.shared.map((item: any) => {
                    return (
                      <div
                        key={item._id}
                        className="flex items-center justify-start px-3 py-2 bg-[#e8f5e8] hover:bg-[#ccf3cc] cursor-pointer w-[300px]"
                      >
                        <div className="flex items-center justify-start w-full">
                          <div
                            className={`w-[40px] h-[40px] rounded-full uppercase flex justify-center items-center bg-neutral-03 text-[24px] leading-[32px] font-medium text-[${getColor()}] ${getColor()}`}
                          >
                            {item?.fullName ? item?.fullName[0] : ""}
                          </div>
                          <div className="pl-3">
                            <div className="text-[14px]">{item.fullName}</div>
                            <div className="text-[12px]">{item.username}</div>
                          </div>
                        </div>

                        <CloseIcon onClick={() => handleOpenRemove(item._id)} />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogRemove}
        onClose={() => {
          setIsDialogRemove(false);
          setAnchorEl(null);
        }}
      >
        <DialogContent>
          <div className="py-3 pb-10"> {t("common.stopSharing")}</div>
        </DialogContent>
        <DialogActions>
          <ButtonCommon
            color="primary"
            variant="outlined"
            className="w-[80px] rounded-3xl"
            onClick={() => setIsDialogRemove(false)}
          >
            {t("common.button.cancel")}
          </ButtonCommon>
          <ButtonCommon
            onClick={() => {
              handleRemoveSharing({
                id: data.id,
                userId: userId,
                type: "folder",
              });
              setIsDialogRemove(false);
            }}
            color="primary"
            className="w-[80px] rounded-3xl"
          >
            {t("common.button.remove")}
          </ButtonCommon>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDialogEdit}
        onClose={() => {
          setIsDialogEdit(false);
          handleClose();
          reset();
        }}
      >
        <DialogTitle>
          <div className="text-center">{t("common.button.editFolder")}</div>
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
            onClick={() => {
              setIsDialogEdit(false);
              handleClose();
              reset();
            }}
          >
            {t("common.button.cancel")}
          </ButtonCommon>
          <ButtonCommon
            onClick={handleSubmit(handleDoSubmitEdit)}
            color="primary"
            className="w-[80px] rounded-3xl"
          >
            {t("common.button.save")}
          </ButtonCommon>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDialogNew}
        onClose={() => {
          setIsDialogNew(true);
          reset();
        }}
      >
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
            onClick={() => {
              setIsDialogNew(false);
              reset();
            }}
          >
            {t("common.button.cancel")}
          </ButtonCommon>
          <ButtonCommon
            onClick={handleSubmit(handleSubmitNewFolder)}
            color="primary"
            className="w-[80px] rounded-3xl"
          >
            {t("common.button.submit")}
          </ButtonCommon>
        </DialogActions>
      </Dialog>
    </div>
  );
}
