import { useTranslations } from "next-intl";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { Typography } from "@mui/material";
export default function Empty() {
  const t = useTranslations();

  return (
    <div className="box-form box-not-found text-center flex flex-col justify-between">
      <div>
        <DoDisturbAltIcon className={"text-[88px] text-neutral-03 fill-neutral-03"} />
        <Typography>
          <div className="text-base text-center text-neutral-09">
            {t("common.messages.msg004")}
          </div>
        </Typography>
      </div>
    </div>
  );
}
