import {Typography} from "@mui/material";

const SubTitleCommon = ({...props}) => {
  return (
    <Typography variant="h4" component="h4" className={'my-0 text-neutral-08 text-[22px] mb-5 leading-[28px] font-medium ' + (props.className ?? '')}>
      {props.title}
    </Typography>
  )
}

export default SubTitleCommon;