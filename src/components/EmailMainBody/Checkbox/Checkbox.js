import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes(props) {
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (

      <Checkbox
        {...props}
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />

    
  );
}