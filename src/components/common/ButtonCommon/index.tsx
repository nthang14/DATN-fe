import {Button} from "@mui/material";
import '~/components/common/ButtonCommon/style.scss'

const ButtonCommon = ({ children, ...props }: any) => {
  return (
    <Button
     aria-describedby="buttonComp" aria-label="buttonComp" title={''}
      className={`${props.className}`}
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      size={props.size || "large"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {children ?? props.title}
    </Button>
  );
};

export default ButtonCommon;
