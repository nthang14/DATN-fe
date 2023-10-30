import { useGetFoldersByOwnerQuery } from "~/app/services/folderService";
import LayoutGrid from "~/components/layout/LayoutGrid";
import FolderItem from "~/components/FolderItem";
export default function Home() {
  const fetchFolders = useGetFoldersByOwnerQuery({});
  console.log(fetchFolders);
  return (
    <div>
      <LayoutGrid />

      {/* grid layout */}
      <div className="grid-layout">
        <div className="grid grid-cols-6 gap-4">
          {fetchFolders?.data?.data?.map((item: any) => {
            return (
              <div key={item.id}>
                <FolderItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
      {/* table layout */}
      <div className="table-layout"></div>
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
