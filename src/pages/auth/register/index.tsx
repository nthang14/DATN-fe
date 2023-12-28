import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import ButtonCommon from "~/components/common/ButtonCommon";
import { REGEX_EMAIL } from "~/utils/constants";
import { useTranslations } from "next-intl";
import "./style.scss";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { validatePassword } from "~/utils/helpers";
import { useRegisterMutation } from "~/app/services/userService";
export default function Register() {
  const ref = useRef<HTMLInputElement>(null);
  const refRemind = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    getValues,
  } = useForm({ mode: "onBlur" });

  const t = useTranslations();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [register] = useRegisterMutation();
  const [isOutSide, setIsOutSide] = useState(false);
  const handleRegister = async (value: any) => {
    const { fullName, username, password, phoneNumber, address } = value;
    if (isLoading) return;
    setIsLoading(true);
    const result = await register({
      fullName,
      username,
      password,
      phoneNumber,
      address,
    });
    if (result) {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg011"),
          typeAlert: "success",
        })
      );
      router.push("/auth/login");
      return;
    }
    setIsLoading(false);
  };
  const [first, setFirst] = useState(true);
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
  return (
    <article id="register-page">
      <div className="login-page container mx-auto flex items-center min-h-screen justify-center">
        <div className="login-wrap">
          <div className="form-login px-16 py-10 gap-x-16">
            <div>
              <div className="title flex items-center justify-center pb-8">
                <Typography
                  variant="h3"
                  className="pni-text-title text-center font-bold"
                >
                  {t("register.title")}
                </Typography>
              </div>
              <div className="text-field">
                <InputHasValidate
                  control={control}
                  name="fullName"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("register.payload.fullName"),
                    }),
                  }}
                  label={t("register.payload.fullName")}
                  error={errors.fullName}
                  inputProps={{
                    style: { color: errors.fullName && "#B33434" },
                  }}
                  maxLength={256}
                  type="text"
                />
                <InputHasValidate
                  control={control}
                  name="username"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("register.payload.username"),
                    }),
                    pattern: {
                      value: REGEX_EMAIL,
                      message: t("common.messages.msg002"),
                    },
                  }}
                  label={t("register.payload.username")}
                  error={errors.username}
                  inputProps={{
                    style: { color: errors.username && "#B33434" },
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
                <InputHasValidate
                  control={control}
                  name="phoneNumber"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("register.payload.phoneNumber"),
                    }),
                    pattern: {
                      value: /\d{10}$/im,
                      message: t("common.messages.msg002"),
                    },
                  }}
                  label={t("register.payload.phoneNumber")}
                  error={errors.phoneNumber}
                  inputProps={{
                    style: { color: errors.phoneNumber && "#B33434" },
                  }}
                  maxLength={10}
                  type="text"
                />
                <InputHasValidate
                  control={control}
                  name="address"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("register.payload.address"),
                    }),
                  }}
                  label={t("register.payload.address")}
                  error={errors.address}
                  inputProps={{
                    style: { color: errors.address && "#B33434" },
                  }}
                  maxLength={256}
                  type="text"
                />
                <div className="form-button">
                  <ButtonCommon
                    color="primary"
                    size="large"
                    variant="contained"
                    className="rounded-3xl w-full"
                    onClick={handleSubmit(handleRegister)}
                  >
                    {t("register.button")}
                  </ButtonCommon>
                </div>
                <div
                  className="text-[14px] hover:underline cursor-pointer"
                  onClick={() => router.push("/auth/login")}
                >
                  {t("register.login")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
