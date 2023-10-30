import GridOnIcon from "@mui/icons-material/GridOn";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
export default function Layout() {
  const router = useRouter();
  console.log("Layout", router);
  return (
    <div className="flex justify-end items-center">
      {router?.query.mode === "table" ? (
        <IconButton
          color="primary"
          onClick={() => router.push({ query: { mode: "grid" } })}
        >
          <GridOnIcon className="cursor-pointer" />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          onClick={() => router.push({ query: { mode: "table" } })}
        >
          <TableRowsIcon className="cursor-pointer" />
        </IconButton>
      )}
    </div>
  );
}
