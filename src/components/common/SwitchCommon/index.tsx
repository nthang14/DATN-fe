import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const SwitchCommon = ({...props}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch 
            name={props.name} 
            checked={props.value} 
            size={props.size || 'medium'} 
            onChange={props.onChange} 
            sx={{
              "&.MuiSwitch-root .MuiSwitch-switchBase .MuiSwitch-thumb": {
                color: "#FFF"
              },
            
              "&.MuiSwitch-root .Mui-checked .MuiSwitch-thumb": {
               color: "#64B334"
              },
              "&.MuiSwitch-root .MuiFormControlLabel-root .MuiFormControlLabel-label": {
                color: "#333433"
              }
            }}
          />
        }
        label={props.label}
      />
    </FormGroup>
  )
}

export default SwitchCommon;