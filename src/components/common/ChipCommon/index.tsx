import {Chip} from "@mui/material";
import '~/components/common/ChipCommon/style.scss';

const ChipCommon = ({...props}) => {
  return (
    <Chip
      label={props.label}
      color={props.color}
      className={(props.className ?? '') + ' fw-500 chip' + ` text-${props.color}`}
      variant={props.variant}
      icon={props.icon}
    ></Chip>
  )
}

export default ChipCommon