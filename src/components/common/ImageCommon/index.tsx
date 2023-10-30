import { useState } from "react";
import "~/components/common/ImageCommon/style.scss";
import image from "~/assets/images/default-product-img.jpg";
import Image from "next/image";
export default function ImageCommon({ ...props }) {
  const [loaded, setLoaded] = useState(false);
  function onLoad() {
    setLoaded(true);
  }
  return (
    <div className={"__img relative"}>
      <Image src={props.src} alt={""} loading="lazy"  width={24} height={24}></Image>
    </div>
  );
}
