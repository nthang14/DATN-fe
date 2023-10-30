import "~/components/common/ImageCommon/style.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const LazyImage = ({ ...props }) => {
  return (
    <div className={`__img relative text-center`}>
      <LazyLoadImage
        delayMethod='debounce'
        delayTime={3000}
        className={props.className}
        effect="opacity"
        alt={props.alt}
        src={props.src}
        width={props.width}
        height={props.height}
      />
    </div>
  );
}

export default LazyImage;
