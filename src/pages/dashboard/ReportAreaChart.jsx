import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';

import areaData from 'mock/dashboard/areaReport.json';

const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },
  xaxis: {
    type: 'datetime',
    categories: areaData.categories,
    labels: {
      format: 'MMM'
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  tooltip: {
    theme: 'dark',
    x: {
      format: 'MM'
    }
  }
};

export default function ReportAreaChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, theme]);

  const [series] = useState(areaData.series);

  return <ReactApexChart options={options} series={series} type="line" height={340} />;
}
