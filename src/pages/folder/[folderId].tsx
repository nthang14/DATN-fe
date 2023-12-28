import {
  useGetFoldersByOwnerQuery,
  useGetFolderShareWithMeQuery,
  useSharingPermissionsMutation,
  useDeleteFolderMutation,
  useUpdateStarFolderMutation,
  useRemovePermissionsFolderMutation,
  useUpdateFolderMutation,
} from "~/app/services/folderService";
import {
  useGetFileByOwnerQuery,
  useGetFileShareWithMeQuery,
  useDeleteFileMutation,
  useSharingPermissionsFileMutation,
  useUpdateStarMutation,
  useRemovePermissionsFileMutation,
  useUpdateFileMutation,
} from "~/app/services/fileService";
import LayoutGrid from "~/components/layout/LayoutGrid";
import FolderItem from "~/components/FolderItem";
import FileItem from "~/components/FileItem";
import TableCommon from "~/components/common/TableCommon";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { saveGoogleToken, readGoogleToken } from "~/utils/storage";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { convertByte } from "~/utils/helpers";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import defaultThumbnail from "~/assets/images/default-thumbnail.jpg";
import SelectUser from "~/components/common/SelectUser";
import { setNotify, setIsReload } from "~/app/slices/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import DialogCommon from "~/components/common/DialogCommon";
export default function Home() {
  const isReload = useSelector((state: any) => state?.common.isReload);
  const dispatch = useDispatch();
  const router = useRouter();
  const parentId = router?.query?.folderId || "";
  const isOwner = router?.query?.type !== "shared-with-me";
  const t = useTranslations();
  const [paginator, setPaginator] = useState({
    limit: 10000,
    page: 1,
    parentId: parentId,
  });
  const [isPreview, setIsPreview] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [idAction, setIdAction] = useState("");
  const [type, setType] = useState("");

  function getThumbnail(id: string) {
    const fileId = id;
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
  const handleRowClick = async (data: any) => {
    if (!data.fileExtension) {
      router.push(`/folder/${data.id}?mode=${router.query.mode}`);
    } else {
      await getThumbnail(data.ggId);
      setIsPreview(true);
    }
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      wordBreak: true,
      className: "w-[300px] !p[12px] cursor-pointer",
      render: (record: any) => (
        <div
          className="flex items-center justify-start"
          onClick={() => {
            handleRowClick(record);
          }}
        >
          {record?.iconLink ? (
            <img
              src={record.iconLink}
              alt="icon file"
              width="20"
              height="auto"
            />
          ) : (
            <div>
              <FolderSharedIcon />
            </div>
          )}
          <div className="pni-text-line-1 my-3 pl-3" title={record?.title}>
            {record?.title}
          </div>
        </div>
      ),
    },
    {
      title: "Kích cỡ tệp",
      dataIndex: "Kích cỡ tệp",
      key: "fileSize",
      ellipsis: true,
      wordBreak: true,
      className: "w-[300px] !p[12px] cursor-pointer",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3 pl-3" title={record?.fileSize}>
          {record?.fileSize ? convertByte(record?.fileSize) : "--"}
        </div>
      ),
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "Kích cỡ tệp",
      key: "owner",
      ellipsis: true,
      wordBreak: true,
      className: "w-[300px] !p[12px] cursor-pointer",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3 pl-3" title={record?.fileSize}>
          {record?.owner.fullName}
        </div>
      ),
    },
  ];
  const fetchFolders = useGetFoldersByOwnerQuery(paginator);
  const fetFoldersShareMe = useGetFolderShareWithMeQuery(paginator);
  const fetchFiles = useGetFileByOwnerQuery({ parentId: parentId });
  const fetchFilesShareMe = useGetFileShareWithMeQuery({ parentId: parentId });
  const [deleteFolder] = useDeleteFolderMutation();
  const [sharingPermissions] = useSharingPermissionsMutation();
  const [updateStarFolder] = useUpdateStarFolderMutation();
  const [removePermissionsFile] = useRemovePermissionsFileMutation();
  const [removePermissionsFolder] = useRemovePermissionsFolderMutation();
  const [sharingPermissionsFile] = useSharingPermissionsFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [updateStar] = useUpdateStarMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [updateFile] = useUpdateFileMutation();
  useEffect(() => {
    if (isReload) {
      if (isOwner) {
        fetchFolders.refetch();
        fetchFiles.refetch();
      } else {
        fetFoldersShareMe.refetch();
        fetchFilesShareMe.refetch();
      }
      dispatch(setIsReload(false));
    }
  }, [isReload]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (
    (fetchFiles &&
      !fetchFiles.isFetching &&
      fetchFiles.isSuccess &&
      fetchFiles?.data?.googleToken) ||
    (fetchFilesShareMe &&
      !fetchFilesShareMe.isFetching &&
      fetchFilesShareMe.isSuccess &&
      fetchFilesShareMe?.data?.googleToken)
  ) {
    saveGoogleToken(
      fetchFiles?.data?.googleToken || fetchFilesShareMe?.data?.googleToken
    );
  }
  const handleChangePage = (e: any) => {
    setPaginator({
      page: e,
      limit: 10000,
      parentId: parentId,
    });
  };
  const handleOpenSelect = (data: any) => {
    setIdAction(data.id);
    setType(data.type);
    setOpenSelect(true);
  };
  const handleDelete = (data: any) => {
    setIdAction(data.id);
    setType(data.type);
    setIsModalOpen(true);
  };
  const handleSubmitShare = async (data: any) => {
    if (!data?.length || !idAction || !type) return;
    if (type === "folder") {
      const result = await sharingPermissions({
        id: idAction,
        payload: {
          sharedIds: data,
        },
      });
      if (result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg007"),
            typeAlert: "success",
          })
        );
        fetchFolders.refetch();
        fetFoldersShareMe.refetch();
      }
      return;
    }
    if (type === "file") {
      const result = await sharingPermissionsFile({
        id: idAction,
        payload: {
          sharedIds: data,
        },
      });
      if (result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg007"),
            typeAlert: "success",
          })
        );
        fetchFiles.refetch();
        fetchFilesShareMe.refetch();
      }
    }
  };
  const handleClose = () => {
    setOpenSelect(false);
  };
  const handleSubmitDelete = async () => {
    if (type === "folder") {
      const result = await deleteFolder(idAction);
      if (result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg009"),
            typeAlert: "success",
          })
        );
      }
      fetchFolders.refetch();
      fetFoldersShareMe.refetch();
      setIsModalOpen(false);

      return;
    }
    if (type === "file") {
      const result = await deleteFile(idAction);
      if (result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg009"),
            typeAlert: "success",
          })
        );
      }
      fetchFiles.refetch();
      fetchFilesShareMe.refetch();
      setIsModalOpen(false);

      return;
    }
  };
  const handleUpdateStar = async (data: any) => {
    if (data?.type === "folder") {
      const result = await updateStarFolder({ id: data.id });
      if (!!result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg012"),
            typeAlert: "success",
          })
        );
        fetchFolders.refetch();
        fetFoldersShareMe.refetch();
      }
      return;
    }
    if (data?.type === "file") {
      const result = await updateStar({ id: data.id });
      if (!!result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg012"),
            typeAlert: "success",
          })
        );
        fetchFiles.refetch();
        fetchFilesShareMe.refetch();
      }
    }
  };
  const handleRemoveSharing = async (data: any) => {
    if (data?.type === "folder") {
      const result = await removePermissionsFolder({
        id: data.id,
        payload: {
          userId: data.userId,
        },
      });
      if (!!result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg012"),
            typeAlert: "success",
          })
        );
        fetchFolders.refetch();
        fetFoldersShareMe.refetch();
      }
      return;
    }
    if (data?.type === "file") {
      const result = await removePermissionsFile({
        id: data.id,
        payload: {
          userId: data.userId,
        },
      });
      if (!!result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg012"),
            typeAlert: "success",
          })
        );
        fetchFiles.refetch();
        fetchFilesShareMe.refetch();
      }
    }
  };
  const handleRename = async (data: any) => {
    if (data?.type === "folder") {
      const result = await updateFolder({
        id: data.id,
        data: data.data,
      });
      if (!!result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg012"),
            typeAlert: "success",
          })
        );
        fetchFolders.refetch();
        fetFoldersShareMe.refetch();
      }
      return;
    }
    if (data?.type === "file") {
      const result = await updateFile({
        id: data.id,
        data: data.data,
      });
      if (!!result) {
        dispatch(
          setNotify({
            isShowNotify: true,
            notifyContent: t("common.messages.msg012"),
            typeAlert: "success",
          })
        );
        fetchFiles.refetch();
        fetchFilesShareMe.refetch();
      }
    }
  };
  return (
    <div>
      <LayoutGrid />
      <div>
        {router?.query.mode === "table" ? (
          // layout table

          <div className="table-layout">
            {fetchFolders.isSuccess &&
              fetchFiles.isSuccess &&
              fetFoldersShareMe.isSuccess &&
              fetchFilesShareMe.isSuccess && (
                <TableCommon
                  handleChangePage={handleChangePage}
                  columns={columns}
                  fetchData={[
                    ...fetchFolders?.data?.data,
                    ...fetFoldersShareMe?.data?.data,
                    ...fetchFiles?.data?.data,
                    ...fetchFilesShareMe?.data?.data,
                  ]}
                  paginator={paginator}
                  data={fetchFolders?.data}
                />
              )}
          </div>
        ) : (
          // layout grid
          <div className="grid-layout box-form">
            {/* Folders */}
            <div>
              <div className="text-[14px] font-medium pb-3">
                {t("common.folders")}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {fetchFolders?.data?.data?.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <FolderItem
                        data={item}
                        handleDelete={handleDelete}
                        handleOpenSelect={handleOpenSelect}
                        handleStar={handleUpdateStar}
                        handleRemoveSharing={handleRemoveSharing}
                        handleRename={handleRename}
                      />
                    </div>
                  );
                })}
                {fetFoldersShareMe?.data?.data?.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <FolderItem
                        data={item}
                        handleDelete={handleDelete}
                        handleOpenSelect={handleOpenSelect}
                        handleStar={handleUpdateStar}
                        handleRemoveSharing={handleRemoveSharing}
                        handleRename={handleRename}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-5">
              <div className="text-[14px] font-medium pb-3">
                {t("common.files")}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {fetchFiles?.data?.data?.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <FileItem
                        data={item}
                        handleDelete={handleDelete}
                        handleOpenSelect={handleOpenSelect}
                        handleStar={handleUpdateStar}
                        handleRemoveSharing={handleRemoveSharing}
                        handleRename={handleRename}
                      />
                    </div>
                  );
                })}
                {fetchFilesShareMe?.data?.data?.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <FileItem
                        data={item}
                        handleDelete={handleDelete}
                        handleOpenSelect={handleOpenSelect}
                        handleStar={handleUpdateStar}
                        handleRemoveSharing={handleRemoveSharing}
                        handleRename={handleRename}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isPreview} onClose={() => setIsPreview(false)}>
        <div className="flex items-center justify-end cursor-pointer">
          <CloseIcon onClick={() => setIsPreview(false)} />
        </div>
        <DialogContent>
          <img
            src={
              !!thumbnail
                ? `data:image/gif;base64,${thumbnail}`
                : defaultThumbnail.src
            }
            alt="thumnial"
            width="700"
            height="auto"
          />
        </DialogContent>
      </Dialog>
      <SelectUser
        open={openSelect}
        close={handleClose}
        submit={handleSubmitShare}
      />
      <DialogCommon
        title={t("common.messages.msg008")}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmitDelete}
      />
    </div>
  );
}
export async function getServerSideProps({ req }: any) {
  if (!req?.cookies?.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
