import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

export default function PlatformSelector({ platform, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Plataforma</InputLabel>
      <Select
        value={platform}
        label="Plataforma"
        onChange={onChange}
      >
        <MenuItem value="google">Google Ads</MenuItem>
        <MenuItem value="meta">Meta Ads</MenuItem>
      </Select>
    </FormControl>
  );
}

PlatformSelector.propTypes = {
  platform: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
