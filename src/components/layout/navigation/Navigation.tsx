import {
  ListItemText,
  List,
  Popover,
  Typography,
  ListItemButton,
} from "@mui/material";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useTranslations } from "next-intl";
import { createElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import ButtonCommon from "~/components/common/ButtonCommon";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
export default function Navigation() {
  const t = useTranslations();
  const router = useRouter();
  const menus = [
    {
      key: t("nav.myDrive"),
      label: t("nav.myDrive"),
      icon: createElement(AddToDriveIcon),
      children: [],
    },
    {
      key: t("nav.sharedDrive"),
      label: t("nav.sharedDrive"),
      icon: createElement(FolderSharedIcon),
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
            <div className="flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl">
              <CreateNewFolderIcon />
              <span className="pl-3 text-[14px]">
                {t("common.button.newFolder")}
              </span>
            </div>
            <div className="flex items-center justify-start py-2 cursor-pointer hover:bg-[#F2F9ED] px-4 rounded-2xl">
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
                  actives === menu.key ? " bg-[#F2F9ED]" : ""
                }`}
                onClick={() => handleOpenCollapse(menu.key)}
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
      </List>
    </>
  );
}
