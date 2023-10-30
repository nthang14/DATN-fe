import { useAuthLoginMutation } from "~/app/services/authService";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import ButtonCommon from "~/components/common/ButtonCommon";
import { REGEX_EMAIL } from "~/utils/constants";
import { saveAccessToken } from "~/utils/storage";
import { useTranslations } from "next-intl";
import "./style.scss";
import InputHasValidate from "~/components/common/InputCommon/InputHasValidate";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { validatePassword } from "~/utils/helpers";
import imageLogin from "~/assets/images/image-login.webp";

export default function Login() {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({ mode: "onBlur" });

  const t = useTranslations();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useAuthLoginMutation();
  const [isOutSide, setIsOutSide] = useState(false);
  const handleLogin = async (value: any) => {
    if (isLoading) return;
    setIsLoading(true);
    const result: any = await login(value);

    if (!!result && result?.data?.success) {
      saveAccessToken(result?.data?.data?.access_token || "");
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg005"),
          typeAlert: "success",
        })
      );
      router.push("/");
      return;
    } else {
      const data: any = result.data?.data;
      setError("password", {
        type: "manual",
        message: t("common.messages.msg002"),
      });
      setError("username", {
        type: "manual",
        message: t("common.messages.msg002email"),
      });
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
  return (
    <article id="login-page">
      <div className="login-page container mx-auto flex items-center min-h-screen justify-center">
        <div className="login-wrap">
          <div className="form-login flex justify-around items-center px-16 py-28 gap-x-16">
            <div>
              <Image
                src={imageLogin.src}
                width={316}
                height={289}
                alt="image-login"
                className="image-transform"
              />
            </div>
            <div>
              <div className="title">
                <Typography
                  variant="h3"
                  className="pni-text-title text-center font-bold"
                >
                  {t("login.title")}
                </Typography>
                <span className="pni-text-base">{t("login.sub_title")}</span>
              </div>
              <div className="text-field">
                <InputHasValidate
                  control={control}
                  name="username"
                  rules={{
                    required: t("common.messages.msg001input", {
                      field: t("login.payload.username"),
                    }),
                    pattern: {
                      value: REGEX_EMAIL,
                      message: t("common.messages.msg002"),
                    },
                  }}
                  label={t("login.payload.username")}
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
                        field: t("login.payload.password"),
                      }),
                      validate: (value: string) =>
                        validatePassword(value, t("common.messages.msg002")),
                    }}
                    label={t("login.payload.password")}
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
                <div className="form-button">
                  <ButtonCommon
                    color="primary"
                    size="large"
                    variant="contained"
                    className="rounded-3xl w-full"
                    onClick={handleSubmit(handleLogin)}
                  >
                    {t("login.button")}
                  </ButtonCommon>
                </div>
                <div
                  className="text-[14px]"
                  onClick={() => router.push("auth/register")}
                >
                  {t("login.register")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
