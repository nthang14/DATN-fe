import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useTranslations } from "next-intl";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { readGoogleToken } from "~/utils/storage";
import defaultThumbnail from "~/assets/images/default-thumbnail.jpg";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Groups2Icon from "@mui/icons-material/Groups2";
import ButtonCommon from "~/components/common/ButtonCommon";
import CloseIcon from "@mui/icons-material/Close";
import { getColor } from "~/utils/helpers";
import EditIcon from "@mui/icons-material/Edit";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { useForm } from "react-hook-form";

export default function FileItem({
  handleOpenSelect,
  handleDelete,
  handleRemoveSharing,
  handleStar,
  handleRename,
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
  const [thumbnail, setThumbnail] = useState("");
  function getThumbnail() {
    const fileId = data.ggId;
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      true
    );
    xhr.setRequestHeader("Authorization", "Bearer " + readGoogleToken());
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      const buf = xhr.response;
      var base64String = btoa(
        new Uint8Array(buf).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setThumbnail(base64String);
    };
    xhr.send();
  }
  useEffect(() => {
    getThumbnail();
  }, []);
  const t = useTranslations();
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
    handleOpenSelect({ type: "file", id: data.id });
  };
  const handleDeleteInter = () => {
    setAnchorEl(null);
    handleDelete({ type: "file", id: data.id });
  };
  const [isDialog, setIsDialog] = React.useState<boolean>(false);
  const [isDialogEdit, setIsDialogEdit] = React.useState<boolean>(false);
  const [isDialogRemove, setIsDialogRemove] = React.useState<boolean>(false);
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
    console.log("value", value);
    handleRename({
      type: "file",
      id: data.id,
      data: value,
    });
    setAnchorEl(null);
    setIsDialogEdit(false);
  };
  return (
    <div className="bg-[#e8f5e8] rounded-[10px]">
      {/* header file item */}
      <div className="items-center justify-between flex px-4 py-2 bg-[#e8f5e8] rounded-[10px] cursor-pointer">
        <div className="flex items-center justify-star">
          <img src={data.iconLink} alt="icon file" />
          <div className="pl-3 text-line-1 text-[14px] font-medium">
            {data.title}
          </div>
        </div>

        <IconButton color="primary" aria-describedby={id} onClick={handleClick}>
          <MoreVertIcon className="" />
        </IconButton>
      </div>
      {/* content */}
      <div className="px-4 py-2">
        <img
          src={
            !!thumbnail
              ? `data:image/gif;base64,${thumbnail}`
              : defaultThumbnail.src
          }
          alt="thumnial"
          width="100%"
          height="auto"
        />
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
            onClick={() => handleOpen()}
            className="w-[150px] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            <PersonAddIcon />
            <span className="pl-3 text-[14px]">{t("common.button.share")}</span>
          </div>
          <div
            onClick={() => handleDeleteInter()}
            className="w-[150px] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
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
          <div
            onClick={() =>
              handleUpdateStar({
                id: data.id,
                star: !data.isStar,
                type: "file",
              })
            }
            className="w-[200pxx] flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl"
          >
            {data.isStar ? (
              <div className="flex items-center">
                <StarIcon />
                <span className="pl-3 text-[14px]">
                  {t("common.button.removeStar")}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <StarBorderIcon />
                <span className="pl-3 text-[14px]">
                  {t("common.button.star")}
                </span>
              </div>
            )}
          </div>
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
          <div className="py-3 pb-10">delete</div>
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
                type: "file",
                userId: userId,
              });
              setIsDialogRemove(false);
            }}
            color="primary"
            className="w-[80px] rounded-3xl"
          >
            {t("common.button.submit")}
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
                  field: t("fileForm.nameFile"),
                }),
              }}
              label={`${t("fileForm.nameFile")} *`}
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
    </div>
  );
}
