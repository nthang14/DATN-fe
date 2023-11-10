import TextField from "@mui/material/TextField";
import { NoSsr } from "@mui/material";

const InputCommon = ({ ...props }) => {
  return (
    <>
      <NoSsr>
        <TextField
          aria-describedby={props.ariaDescribedby || null}
          className={`w-full ${props.className}`}
          label={props.label}
          placeholder={props.placeholder}
          onChange={(event) => props.onChange(event?.target?.value)}
          onBlur={(e) => {
            if (props.onBlur) {
              props.onBlur();
            }
          }}
          onFocus={(e) => {
            if (props.onFocus) {
              props.onFocus(e);
            }
          }}
          onClick={(e) => {
            if (props.onClick) {
              props.onClick(e);
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
