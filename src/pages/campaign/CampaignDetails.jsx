import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper,
  Stack,
  Button,
  Divider,
  LinearProgress,
  Chip
} from '@mui/material';
import { useParams } from 'react-router-dom';
import MainCard from '../../components/MainCard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const MetricCard = ({ title, value, icon, color, percentage }) => (
  <Paper
    sx={{
      p: 2,
      bgcolor: '#0A0E17',
      height: '100%'
    }}
  >
    <Stack spacing={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        {icon}
      </Box>
      
      <Typography variant="h4" color="white">
        {value}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip 
          label={`${percentage}%`}
          size="small"
          sx={{ 
            bgcolor: `${color}.dark`,
            color: 'white'
          }}
        />
        <Typography variant="caption" color="text.secondary">
          vs. último período
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

const CampaignDetails = () => {
  const { id } = useParams();

  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Campanha ${id}`);

    // Estilização do cabeçalho
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2196F3' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Definir largura das colunas
    worksheet.columns = [
      { header: 'Métrica', key: 'metric', width: 20 },
      { header: 'Valor', key: 'value', width: 15 },
      { header: 'Variação', key: 'variation', width: 15 },
      { header: 'Meta', key: 'goal', width: 15 }
    ];

    // Dados do relatório
    const reportData = [
      { metric: 'Impressões', value: '45.239', variation: '+12%', goal: '50.000' },
      { metric: 'Cliques', value: '1.430', variation: '+8%', goal: '2.000' },
      { metric: 'CTR', value: '3.16%', variation: '-2%', goal: '4%' },
      { metric: 'Conversões', value: '85', variation: '+15%', goal: '100' },
      { metric: 'Taxa de Conversão', value: '5.94%', variation: '+5%', goal: '5%' },
      { metric: 'CPC Médio', value: 'R$ 2,45', variation: '-10%', goal: 'R$ 2,00' },
      { metric: 'Custo Total', value: 'R$ 3.503,50', variation: '+5%', goal: 'R$ 4.000,00' },
      { metric: 'ROI', value: '245%', variation: '+23%', goal: '200%' }
    ];

    // Adicionar dados ao worksheet
    reportData.forEach(row => {
      worksheet.addRow(row);
    });

    // Adicionar gráfico de desempenho diário
    worksheet.addRow([]);
    worksheet.addRow(['Desempenho Diário']);
    worksheet.addRow(['Data', 'Impressões', 'Cliques', 'Conversões']);

    const dailyData = [
      { date: '2024-01-01', impressions: 5420, clicks: 180, conversions: 12 },
      { date: '2024-01-02', impressions: 6150, clicks: 205, conversions: 15 },
      { date: '2024-01-03', impressions: 5890, clicks: 195, conversions: 11 },
      { date: '2024-01-04', impressions: 6300, clicks: 210, conversions: 14 },
      { date: '2024-01-05', impressions: 5980, clicks: 199, conversions: 13 }
    ];

    dailyData.forEach(day => {
      worksheet.addRow([day.date, day.impressions, day.clicks, day.conversions]);
    });

    // Adicionar informações da campanha
    worksheet.addRow([]);
    worksheet.addRow(['Informações da Campanha']);
    worksheet.addRow(['ID da Campanha', id]);
    worksheet.addRow(['Data de Início', '2024-01-01']);
    worksheet.addRow(['Status', 'Ativa']);
    worksheet.addRow(['Orçamento', 'R$ 5.000,00']);
    worksheet.addRow(['Público-alvo', 'Homens e Mulheres, 25-45 anos']);
    worksheet.addRow(['Localização', 'Brasil']);

    // Gerar o arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Relatorio_Campanha_${id}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MainCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h4" gutterBottom>
                  Campanha #{id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Última atualização: há 5 minutos
                </Typography>
              </Box>
              <Button 
                variant="contained"
                startIcon={<BarChartIcon />}
                onClick={generateExcel}
              >
                Gerar Relatório
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Cliques"
              value="1,430"
              icon={<TrendingUpIcon color="primary" />}
              color="primary"
              percentage={12}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Leads"
              value="302"
              icon={<PeopleIcon color="success" />}
              color="success"
              percentage={8}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Conversões"
              value="85"
              icon={<BarChartIcon color="warning" />}
              color="warning"
              percentage={15}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="ROI"
              value="R$ 4.5k"
              icon={<MonetizationOnIcon color="info" />}
              color="info"
              percentage={23}
            />
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3, bgcolor: '#0A0E17' }}>
              <Typography variant="h6" gutterBottom color="white">
                Desempenho da Campanha
              </Typography>
              <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.05)' }} />
              
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Taxa de Cliques (CTR)
                    </Typography>
                    <Typography variant="body2" color="white">
                      78%
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={78} 
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.main'
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Taxa de Conversão
                    </Typography>
                    <Typography variant="body2" color="white">
                      45%
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={45} 
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.main'
                      }
                    }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
};

export default CampaignDetails; 