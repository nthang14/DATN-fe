import "./style.scss";
import { useSelector } from "react-redux";
import loadingImg from "~/assets/images/loading.png";
import * as React from "react";

const Loading = () => {
  let loading = useSelector((state: any) => state.common.loading);
  const showLoading = useSelector((state: any) => state.common.showLoading);
  return (
    <>
      {showLoading ? (
        <div className={"loading" + (loading ? " active" : "")}>
          <picture>
            <img className="w-[56px] h-[56px]" src={loadingImg.src} alt={""} />
          </picture>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Loading;
