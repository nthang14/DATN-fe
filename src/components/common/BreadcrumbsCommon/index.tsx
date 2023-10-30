import { Link } from "@mui/material";
import { Breadcrumbs, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BreadcrumbsCommon = ({ ...props }) => {
  const router = useRouter();
  const t = useTranslations();
  const common: any = {
    dashboard: {
      title: t("nav.dashboard"),
      link: "/dashboard",
    },
  };

  useEffect(() => {}, [props.data]);
  const doBack = () => {
    props.handleBack();
  };

  return (
    <div className={"flex"}>
      <Breadcrumbs>
        {props?.data?.length > 0 &&
          props.data.map((datum: any, index: number) => {
            return index == props.data.length - 1 ? (
              <Typography
                key="3"
                fontWeight={"medium"}
                className={"fs-14 text-primary-06"}
              >
                {common[datum?.value || datum].title || datum.title}
              </Typography>
            ) : (
              <Link
                underline="hover"
                key={index}
                href={common[datum].link}
                className={"font-medium text-neutral-06 fs-14"}
              >
                {common[datum].title}
              </Link>
            );
          })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsCommon;
