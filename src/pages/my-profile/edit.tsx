import { useUpdateProfileMutation } from "~/app/services/userService";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import ButtonCommon from "~/components/common/ButtonCommon";
import { REGEX_EMAIL } from "~/utils/constants";
import { readProfile, saveProfile } from "~/utils/storage";
import { useTranslations } from "next-intl";
import "./style.scss";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import InputCommon from "~/components/common/InputCommon";
import { NoSsr } from "@mui/base";

export default function Register() {
  const ref = useRef<HTMLInputElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = readProfile();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    values: useMemo(() => {
      return {
        fullName: profile?.fullName || "",
        username: profile?.username || "",
        phoneNumber: profile?.phoneNumber || "",
        address: profile?.address || "",
      };
    }, [profile]),
  });

  const t = useTranslations();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();

  const handleUpdate = async (value: any) => {
    const { fullName, username, phoneNumber, address } = value;
    if (isLoading) return;
    setIsLoading(true);
    const result: any = await updateProfile({
      fullName,
      username,
      phoneNumber,
      address,
    });
    if (result) {
      const { address, phoneNumber, username, fullName, _id } =
        result?.data?.data;
      saveProfile({ address, phoneNumber, username, fullName, _id });
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg014"),
          typeAlert: "success",
        })
      );
      router.push("/my-profile");
      return;
    }
    setIsLoading(false);
  };

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
                <NoSsr>
                  <Grid container columnSpacing={6} rowSpacing={6}>
                    <Grid item xs={12} className="">
                      <InputHasValidate
                        control={control}
                        name="fullName"
                        value={profile?.fullName || ""}
                        rules={{
                          required: t("common.messages.msg001input", {
                            field: t("myProfile.payload.fullName"),
                          }),
                        }}
                        label={t("myProfile.payload.fullName")}
                        error={errors.fullName}
                        inputProps={{
                          style: { color: errors.fullName && "#B33434" },
                        }}
                        maxLength={256}
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} className="">
                      <InputCommon
                        value={profile?.username || ""}
                        label={t("myProfile.payload.username")}
                        error={errors.username}
                        type="text"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} className="">
                      <InputHasValidate
                        control={control}
                        name="phoneNumber"
                        rules={{
                          required: t("common.messages.msg001input", {
                            field: t("myProfile.payload.phoneNumber"),
                          }),
                          pattern: {
                            value: /\d{10}$/im,
                            message: t("common.messages.msg002"),
                          },
                        }}
                        label={t("myProfile.payload.phoneNumber")}
                        error={errors.phoneNumber}
                        inputProps={{
                          style: { color: errors.phoneNumber && "#B33434" },
                        }}
                        maxLength={10}
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} className="">
                      <InputHasValidate
                        control={control}
                        name="address"
                        rules={{
                          required: t("common.messages.msg001input", {
                            field: t("myProfile.payload.address"),
                          }),
                        }}
                        label={t("myProfile.payload.address")}
                        error={errors.address}
                        inputProps={{
                          style: { color: errors.address && "#B33434" },
                        }}
                        maxLength={256}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </NoSsr>

                <div className="form-button mt-6 flex items-center justify-center">
                  <ButtonCommon
                    color="primary"
                    size="large"
                    variant="outlined"
                    className="rounded-3xl"
                    onClick={() => {
                      router.push("/my-profile");
                    }}
                  >
                    {t("common.button.cancel")}
                  </ButtonCommon>
                  <ButtonCommon
                    color="primary"
                    size="large"
                    variant="contained"
                    className="rounded-3xl ml-5"
                    onClick={handleSubmit(handleUpdate)}
                  >
                    {t("register.button")}
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
