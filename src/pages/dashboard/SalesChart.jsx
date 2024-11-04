import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainCard from 'components/MainCard';

import ReactApexChart from 'react-apexcharts';

import platformSalesData from 'mock/dashboard/platformSalesReport.json';

const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: []
  },
  yaxis: {
    title: {
      text: 'R$ (milhares)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter(val) {
        return `R$ ${val} mil`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

export default function SalesChart({ period, platform }) {
  const theme = useTheme();

  const [legend, setLegend] = useState({
    income: true,
    cos: true
  });

  const { income, cos } = legend;

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([]);
  const [netProfit, setNetProfit] = useState(0);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    const data = platformSalesData[platform][period];
    if (data) {
      if (income && cos) {
        setSeries(data.series);
      } else if (income) {
        setSeries([data.series[0]]);
      } else if (cos) {
        setSeries([data.series[1]]);
      } else {
        setSeries([]);
      }
      setNetProfit(data.netProfit);

      setOptions(prev => ({
        ...prev,
        colors: !(income && cos) && cos ? [primaryMain] : [warning, primaryMain],
        xaxis: {
          ...prev.xaxis,
          categories: data.categories,
          labels: {
            style: {
              colors: Array(data.categories.length).fill(secondary)
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: [secondary]
            }
          }
        },
        grid: {
          borderColor: line
        },
        plotOptions: {
          bar: {
            columnWidth: xsDown ? '60%' : '30%'
          }
        }
      }));
    }
  }, [platform, period, income, cos, secondary, warning, primaryMain, line, xsDown]);

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="h6" color="text.secondary">
              Lucro Líquido
            </Typography>
            <Typography variant="h4">{netProfit}</Typography>
          </Stack>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox color="warning" checked={income} onChange={handleLegendChange} name="income" />}
                label="Receita"
              />
              <FormControlLabel control={<Checkbox checked={cos} onChange={handleLegendChange} name="cos" />} label="Custo de Vendas" />
            </FormGroup>
          </FormControl>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={360} />
        </Box>
      </Box>
    </MainCard>
  );
}