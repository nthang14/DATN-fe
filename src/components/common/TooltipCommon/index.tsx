import { Tooltip } from "@mui/material";
import { useRef, useState, useEffect } from "react";
export default function TooltipCommon({ ...props }) {
  const textRef: any = useRef();
  const childRef: any = useRef();
  const [overflowActive, setOverflowActive] = useState(false);
  const [height, setHeight] = useState(false);
  const isOverflowActive = (event1: any, event2: any) => {
    const width = event1.offsetWidth <= event2.offsetWidth;
    setHeight(event1.offsetHeight < event2.offsetHeight);
    return width;
  };
  useEffect(() => {
    if (isOverflowActive(textRef?.current, childRef?.current)) {
      setOverflowActive(true);
      return;
    }
    setOverflowActive(false);
  }, [props.children, textRef?.current, childRef?.current]);
  return (
    <>
      {props.twoLine ? (
        <Tooltip
          title={overflowActive && height ? `${props.title}` : ""}
          arrow
          followCursor
        >
          <div
            className={`w-full ${props.className || ""} ${
              height ? "line-clamp-2" : ""
            }`}
            ref={textRef}
          >
            <div className={`${props.classChill || ""} w-fit`} ref={childRef}>
              {props.children}
            </div>
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          title={overflowActive ? `${props.title}` : ""}
          arrow
          followCursor
        >
          <div className={`w-full ${props.className || ""} `} ref={textRef}>
            <div className={`${props.classChill || ""} w-fit`} ref={childRef}>
              {props.children}
            </div>
          </div>
        </Tooltip>
      )}
    </>
  );
}
