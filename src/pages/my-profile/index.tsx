import { useRouter } from "next/router";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ButtonCommon from "~/components/common/ButtonCommon";
import { readProfile } from "~/utils/storage";
import { useTranslations } from "next-intl";
import "./style.scss";
export default function Register() {
  const router = useRouter();
  const profile = readProfile();

  const t = useTranslations();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article>
      <div className="box-form">
        <div className="login-wrap">
          <div className="form-login px-16 py-10 gap-x-16">
            <div>
              <div className="title flex items-center justify-center pb-8">
                <Typography
                  variant="h3"
                  className="pni-text-title text-center font-bold"
                >
                  {t("myProfile.title")}
                </Typography>
              </div>
              <div className="text-field">
                <Grid container columnSpacing={6} rowSpacing={6}>
                  <Grid item xs={2} className="">
                    <div className="font-bold text-right">
                      {t("myProfile.payload.fullName")}:
                    </div>
                  </Grid>
                  <Grid item xs={10} className="">
                    <div className="">{profile?.fullName || "--"}</div>
                  </Grid>

                  <Grid item xs={2} className="">
                    <div className="font-bold text-right">
                      {t("myProfile.payload.username")}:
                    </div>
                  </Grid>
                  <Grid item xs={10} className="">
                    <div className="">{profile?.username || "--"}</div>
                  </Grid>

                  <Grid item xs={2} className="">
                    <div className="font-bold text-right">
                      {t("myProfile.payload.phoneNumber")}:
                    </div>
                  </Grid>
                  <Grid item xs={10} className="">
                    <div className="">{profile?.phoneNumber || "--"}</div>
                  </Grid>

                  <Grid item xs={2} className="">
                    <div className="font-bold text-right">
                      {t("myProfile.payload.address")}:
                    </div>
                  </Grid>
                  <Grid item xs={10} className="">
                    <div className="">{profile?.address || "--"}</div>
                  </Grid>
                </Grid>

                <div className="form-button mt-8 flex items-center justify-center">
                  <ButtonCommon
                    color="primary"
                    size="large"
                    className="rounded-3xl"
                    onClick={() => {
                      router.push("/my-profile/edit");
                    }}
                  >
                    {t("common.button.edit")}
                  </ButtonCommon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
