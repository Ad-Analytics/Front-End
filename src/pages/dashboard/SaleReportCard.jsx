import { useState } from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PlatformSelector from 'components/selectors/PlatformSelector';

import SalesChart from './SalesChart';

const status = [
  {
    value: 'today',
    label: 'Hoje'
  },
  {
    value: 'month',
    label: 'Este Mês'
  },
  {
    value: 'year',
    label: 'Este Ano'
  }
];

export default function SaleReportCard() {
  const [value, setValue] = useState('today');
  const [platform, setPlatform] = useState('google');

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Relatório de Campanhas</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <PlatformSelector platform={platform} onChange={handlePlatformChange} />
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Grid>
      </Grid>
      <SalesChart period={value} platform={platform} />
    </>
  );
}
