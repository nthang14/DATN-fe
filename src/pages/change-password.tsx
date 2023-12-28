import { useChangePasswordMutation } from "~/app/services/userService";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import ButtonCommon from "~/components/common/ButtonCommon";
import { REGEX_EMAIL } from "~/utils/constants";
import { saveAccessToken, saveProfile } from "~/utils/storage";
import { useTranslations } from "next-intl";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import { validatePassword } from "~/utils/helpers";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
export default function ChangePassword() {
  const ref = useRef<HTMLInputElement>(null);
  const refRemind = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations();
  const [changePassword] = useChangePasswordMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const [first, setFirst] = useState(true);
  const [isOutSide, setIsOutSide] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (event.target.name === "username") return;
      if (
        ref &&
        ref?.current &&
        !ref.current?.contains(event.target) &&
        first
      ) {
        setIsOutSide(true);
        setFirst(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);
  const clickEye = (showPassword: boolean) => {
    setShowPassword(showPassword);
  };
  const confirmPassword = (value: string, message: string) => {
    const password = getValues("password");
    if (value !== password) {
      return t("common.messages.msg010");
    }
    validatePassword(value, message);
  };
  const handleChangePassword = async (value: any) => {
    const result = await changePassword({ password: value.password });
    if (result) {
      saveAccessToken("");
      saveProfile({});
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg014"),
          typeAlert: "success",
        })
      );
      router.push("/auth/login");
    }
  };
  return (
    <div className="box-form">
      <div className="login-wrap">
        <div className="form-login px-16 py-10 gap-x-16">
          <div>
            <div className="title flex items-center justify-center pb-8">
              <Typography
                variant="h3"
                className="pni-text-title text-center font-bold"
              >
                {t("changePassword")}
              </Typography>
            </div>
            <div className="text-field">
              <Grid container columnSpacing={6} rowSpacing={6}>
                <Grid item xs={12} className="">
                  <div ref={ref} className="w-full">
                    <InputHasValidate
                      control={control}
                      name="password"
                      className={`${showPassword ? "" : "password-security"}`}
                      rules={{
                        required: t("common.messages.msg001input", {
                          field: t("register.payload.password"),
                        }),
                        validate: (value: string) =>
                          validatePassword(value, t("common.messages.msg002")),
                      }}
                      label={t("register.payload.password")}
                      error={isOutSide ? errors.password : null}
                      inputProps={{
                        style: { color: errors.password && "#B33434" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className="bg-white hover:bg-white"
                              onClick={() => clickEye(!showPassword)}
                              edge="end"
                              style={{ color: errors.password && "#B33434" }}
                            >
                              {showPassword ? (
                                <VisibilityOffOutlinedIcon
                                  className={
                                    errors.password && isOutSide
                                      ? "fill-error"
                                      : "fill-neutral-09"
                                  }
                                />
                              ) : (
                                <VisibilityOutlinedIcon
                                  className={
                                    errors.password && isOutSide
                                      ? "fill-error"
                                      : "fill-neutral-09"
                                  }
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      maxLength={256}
                      attribute={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      type="text"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} className="">
                  <div ref={refRemind} className="w-full">
                    <InputHasValidate
                      control={control}
                      name="confirmPassword"
                      className={`${showPassword ? "" : "password-security"}`}
                      rules={{
                        required: t("common.messages.msg001input", {
                          field: t("register.payload.confirmPassword"),
                        }),
                        validate: (value: string) =>
                          confirmPassword(value, t("common.messages.msg002")),
                      }}
                      label={t("register.payload.confirmPassword")}
                      error={isOutSide ? errors.confirmPassword : null}
                      inputProps={{
                        style: { color: errors.confirmPassword && "#B33434" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className="bg-white hover:bg-white"
                              onClick={() => clickEye(!showPassword)}
                              edge="end"
                              style={{ color: errors.password && "#B33434" }}
                            >
                              {showPassword ? (
                                <VisibilityOffOutlinedIcon
                                  className={
                                    errors.password && isOutSide
                                      ? "fill-error"
                                      : "fill-neutral-09"
                                  }
                                />
                              ) : (
                                <VisibilityOutlinedIcon
                                  className={
                                    errors.password && isOutSide
                                      ? "fill-error"
                                      : "fill-neutral-09"
                                  }
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      maxLength={256}
                      attribute={{
                        autoComplete: "new-password",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      type="text"
                    />
                  </div>
                </Grid>
              </Grid>

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
                  onClick={handleSubmit(handleChangePassword)}
                >
                  {t("register.button")}
                </ButtonCommon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
