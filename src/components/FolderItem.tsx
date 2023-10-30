import FolderIcon from "@mui/icons-material/Folder";
export default function FolderItem({ item, ...props }: any) {
  return (
    <div className="items-center justify-between flex px-4 py-2 bg-[#F2F9ED]">
      <FolderIcon />
      {item.title}
    </div>
  );
}
