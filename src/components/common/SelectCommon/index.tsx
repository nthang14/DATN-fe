import {MenuItem,Select} from "@mui/material";

const SelectCommon = ({...props}) => {
  return (
    <>
      <Select
        value={props.value}
        label={props.placeholder}
        onChange={props.onChange}
        className={(props.className ?? '') + ' w-full'}
      >
        {props.options.map((datum: any) => {
          return <MenuItem key={datum.value} value={datum.value}>
            {datum.label}
          </MenuItem>
        })}
      </Select>
    </>
  )
}

export default SelectCommon