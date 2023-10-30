import { Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const TitleCommon = ({ ...props }) => {
  return (
    <div className={'flex items-center'}>
      {
        props.handleBackIcon ?
        <ArrowBackIcon className={'mr-[4px] w-[28px] h-[28px] cursor-pointer fill-neutral-08'} onClick={props.handleBackIcon} /> :
        <></>
      }
      <Typography variant="h2" component="h2" className={"mt-1 mb-0 text-neutral-09 text-[28px] leading-[36px] font-medium " + props.customClass}>
        {props.title}
      </Typography>
    </div>
  );
};

export default TitleCommon;
