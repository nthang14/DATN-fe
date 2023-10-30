import {TextField} from "@mui/material";
import * as React from "react";
import {IMaskInput} from 'react-imask';
import {Controller} from "react-hook-form";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const DmsInput = ({...props}) => {
  const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref:any) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask={`00°00'00.0"X 000°00'00.0"Y`}
          definitions={
            {
              'X': /[NS]/,
              'Y': /[EW]/
            }
          }
          inputRef={ref}
          onAccept={(value: any) => {
            onChange({ target: { name: props.name, value } })
          }}
          overwrite={false}
          lazy={false}
          placeholderChar={'_'}
        />
      );
    },
  );

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue=""
      rules={props.rules}
      render={({ field }) => (
        <TextField
          className={`w-full ${props.className} ${field.value ? '' : 'hide-placeholder'}`}
          label={props.label}
          {...field}
          type={props.type}
          value={field.value}
          onChange={(e) => {
            let value = e.target.value;
            if (value == `__°__'__._"_ ___°__'__._"_`) {
              value = '';
            }
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
            inputComponent: TextMaskCustom as any,
          }}
        />
      )}
    />
  )
}

export default DmsInput