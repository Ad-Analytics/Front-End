import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ReactApexChart from 'react-apexcharts';
import { usePlatform } from 'contexts/PlatformContext';

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
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
  grid: {
    show: false
  },
  tooltip: {
    theme: 'dark'
  }
};

export default function MonthlyBarChart() {
  const theme = useTheme();
  const { platform } = usePlatform();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  // Dados de engajamento por plataforma
  const engagementData = {
    google: [
      {
        name: 'Interações',
        data: [2.8, 3.2, 2.5, 3.5, 2.9, 3.8, 3.1]
      }
    ],
    meta: [
      {
        name: 'Interações',
        data: [3.2, 2.8, 3.0, 3.8, 2.6, 3.4, 2.9]
      }
    ]
  };

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      }
    }));
  }, [primary, info, secondary]);

  const [options, setOptions] = useState(barChartOptions);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart 
        options={options} 
        series={engagementData[platform]} 
        type="bar" 
        height={365} 
      />
    </Box>
  );
}
