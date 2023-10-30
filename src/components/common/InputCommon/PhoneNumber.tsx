import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { MAX_LENGTH_DECIMAL } from "~/utils/constants";
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: any;
}
const MAX_LENGTH_PHONE_NUMBER = 20;
const DecimalInput = ({ ...props }) => {
  const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          value={props.value}
          // valueIsNumericString
          isAllowed={(values) => {
            return values.value.length <= MAX_LENGTH_PHONE_NUMBER;
          }}
          prefix=""
        />
      );
    }
  );

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue=""
      rules={props.rules}
      render={({ field }) => (
        <TextField
          className={`w-full ${props.className}`}
          label={props.label}
          {...field}
          type={props.type}
          value={field.value}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]+/g, "");
            field.onChange(value);
            if (props.onChange) {
              props?.onChange(value);
            }
          }}
          disabled={!!props.disabled}
          error={!!props.error}
          helperText={`${props.error ? props.error.message : ""}`}
          InputProps={{
            style: { color: props.error && "#B33434" },
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      )}
    />
  );
};

export default DecimalInput;
