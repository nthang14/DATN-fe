import { useTranslations } from "next-intl";
import Pagination from "@mui/material/Pagination";
import "~/components/common/PaginationCommon/style.scss";
import { styled } from "@mui/system";

const NewPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "#2A2D29",
    fontWeight: 500,
  },
  "& .MuiPaginationItem-page, & .MuiPaginationItem-previousNext": {
    width: "36px",
    height: "36px",
  },
  "& .MuiPaginationItem-previousNext svg": {
    width: "24px",
    fill: "#2A2D29",
    height: "24px",
  },
  "& .Mui-disabled svg": {
    fill: "#D8D8D8!important",
  },
});

const PaginationCommon = ({ ...props }) => {
  const t = useTranslations();
  const { paginator } = props;
  const start = paginator.limit * (paginator.page - 1);
  let currentPage = paginator.page;
  const doChangePage = (e: any, page: number) => {
    currentPage = page;
    props.handleChangePage(page);
  };
  return (
    <div className={"flex justify-end pagination"}>
      <span className={"lh-32 fs-14"}>
        {t("common.paging_with_total", {
          range1: start + 1,
          range2:
            currentPage === props.totalPage
              ? props.total
              : start + paginator.limit,
          total: props.total,
        })}
      </span>
      <NewPagination
        onChange={(e, page) => doChangePage(e, page)}
        count={props.totalPage}
        className={"__item"}
        shape="rounded"
        page={props.page ?? 1}
      />
    </div>
  );
};

export default PaginationCommon;
