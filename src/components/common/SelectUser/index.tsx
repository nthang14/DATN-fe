import {
  Avatar,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputCommon from "~/components/common/InputCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  useGetUsersQuery,
  useGetUsersNoParamsQuery,
} from "~/app/services/userService";
import { debounce } from "~/utils/helpers";
import { store } from "~/app/store";
import { setShowLoading } from "~/app/slices/commonSlice";
import Image from "next/image";
import * as React from "react";
export default function SelectUser({ open, close, submit, ...props }: any) {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const fetUsers = useGetUsersQuery({ fullName: search });
  const fetUsersNoParams = useGetUsersNoParamsQuery({});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  useEffect(() => {}, []);
  const handleSearch = (value: any) => {
    store.dispatch(setShowLoading(false));
    setSearch(value);
  };
  const handleClose = () => {
    setSearch("");
    close();
  };
  const filterUser = debounce(handleSearch, 500);
  const [user, setUser] = useState<string[]>([]);
  const handleChooseUser = (data: any) => {
    const newData: string[] = [...user, data];
    setUser(newData);
  };
  const handleDelete = (data: string) => {
    const newData: string[] = user.filter((user) => user !== data);
    setUser(newData);
  };
  const handleCancel = () => {
    setUser([]);
  };
  const handleSubmit = () => {
    submit(user);
    setUser([]);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        fullWidth
        sx={{ "& .MuiPaper-root": { height: "450px", width: "512px" } }}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <h3 className="font-medium">Share with</h3>
          <CloseIcon onClick={() => handleClose()} />
        </div>
        <DialogContent className="p-5">
          <div className="">
            <InputCommon
              ariaDescribedby={id}
              onChange={filterUser}
              placeholder={`Add people`}
              type="text"
              onClick={handleClick}
            />
          </div>
          <Popover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleCloseDrop}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className="w-[500px]"
          >
            <div className="h-[260px] overflow-hidden overflow-y-auto w-[472px]">
              {fetUsers.isSuccess && !fetUsers.isFetching
                ? fetUsers?.data
                    .filter((item: any) => !user.includes(item?._id))
                    .map((item: any) => {
                      return (
                        <div
                          onClick={() => handleChooseUser(item._id)}
                          key={item._id}
                          className="flex items-center justify-start px-3 py-2 bg-[#e8f5e8] hover:bg-[#ccf3cc] cursor-pointer"
                        >
                          <div className="w-[40px] h-[40px] rounded-full uppercase flex justify-center items-center bg-neutral-03 text-[24px] leading-[32px] font-medium text-neutral-07">
                            {item?.fullName ? item?.fullName[0] : ""}
                          </div>
                          <div className="pl-3">
                            <div className="text-[14px]">{item.fullName}</div>
                            <div className="text-[12px]">{item.username}</div>
                          </div>
                        </div>
                      );
                    })
                : ""}
            </div>
          </Popover>
          <div className="mt-2">
            {user.length &&
            fetUsersNoParams.isSuccess &&
            !fetUsersNoParams.isFetching
              ? fetUsersNoParams?.data
                  .filter((item: any) => user.includes(item?._id))
                  .map((item: any) => {
                    return (
                      <Chip
                        className="my-[2px] mr-[4px]"
                        key={item._id}
                        avatar={<Avatar alt="avatar" src={item?.avatar} />}
                        label={`${item.fullName}`}
                        variant="outlined"
                        onDelete={() => handleDelete(item?._id)}
                      />
                    );
                  })
              : ""}
          </div>
        </DialogContent>
        <DialogActions className="mx-auto">
          <ButtonCommon
            className="w-[216px] rounded-3xl leading-[24px]"
            size="medium"
            variant="outlined"
            onClick={() => handleCancel()}
          >
            {t("common.button.cancel")}
          </ButtonCommon>
          <ButtonCommon
            className="w-[216px] rounded-3xl !ml-4 leading-[24px]"
            size="medium"
            variant="contained"
            onClick={() => handleSubmit()}
            autoFocus
          >
            {t("common.button.share")}
          </ButtonCommon>
        </DialogActions>
      </Dialog>
    </div>
  );
}
