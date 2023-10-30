import TextField from "@mui/material/TextField";
import {NoSsr} from "@mui/material";

const InputCommon = ({ ...props }) => {
  return (
    <>
      <NoSsr>
        <TextField
          className={`w-full ${props.className}`}
          label={props.placeholder || props.label}
          onChange={props.onChange}
          onBlur={(e) => {
            let value = e.target.value;
            if (props.onChange) {
              props.onChange(value.trim());
            }
            if (props.onBlur) {
              props.onBlur();
            }
          }}
          value={props.value}
          disabled={props.disabled ?? false}
          name={props.name}
          defaultValue={props.defaultValue}
          InputLabelProps={{ ...props.InputLabelProps }}
        />
      </NoSsr>
    </>
  );
};

export default InputCommon;
