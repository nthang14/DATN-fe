import { Control, Controller } from "react-hook-form";
import { InputProps, TextField } from "@mui/material";
export type InputType = {
  control: Control | undefined;
  rules: object;
  label?: string;
  error: any;
  className?: string;
  name: string;
  inputProps: Partial<InputProps>;
  type: string;
  onChange?: any;
  onBlur?: any;
  disabled?: boolean;
  defaultValue?: string;
  attribute?: any;
  maxLength?: number;
  multiline?: boolean;
  maxRows?:number
};
const InputHasValidate = ({ ...props }: InputType) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue=""
      rules={props.rules}
      render={({ field }) => (
        <TextField
          maxRows={props.maxRows}
          className={`w-full ${props.className}`}
          label={props.label}
          {...field}
          defaultValue={props.defaultValue}
          type={props.type}
          onKeyPress={(ev) => {
            if (ev.ctrlKey && ev.key === 'Enter') {
            }
          }}
          onChange={(e: any) => {
            let value = e.target.value;
            if (!!props.maxLength) {
              if (value.length > props.maxLength) {
                value = value.trim();
              }
              value = value.slice(0, props.maxLength);
            }
            field.onChange(value);
            if (props.onChange) {
              props?.onChange(value);
            }
          }}
          onBlur={(e: any) => {
            let value = e.target.value;
            field.onChange(value.trim());
            field.onBlur();
            if (props.onBlur) {
              props?.onBlur(value);
            }
          }}
          disabled={!!props.disabled}
          error={!!props.error}
          helperText={`${props.error ? props.error.message : ""}`}
          InputProps={props.inputProps}
          inputProps={props.attribute}
          size="medium"
          multiline={props.multiline}
        />
      )}
    />
  );
};

export default InputHasValidate;
