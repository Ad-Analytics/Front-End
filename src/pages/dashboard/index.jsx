import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatarLucas from 'assets/images/users/avatar-lucas.jpg'

import campaignData from 'mock/dashboard/campaignReport.json';
import engagementData from 'mock/dashboard/engagementReport.json';
import areaData from 'mock/dashboard/areaReport.json';

import { PlatformProvider } from 'contexts/PlatformContext';
import PlatformSelector from 'components/selectors/PlatformSelector';
import { usePlatform } from 'contexts/PlatformContext';

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

function DashboardHeader() {
  const { platform, setPlatform } = usePlatform();

  return (
    <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Grid item>
        <Typography variant="h5">Dashboard de Marketing</Typography>
      </Grid>
      <Grid item>
        <PlatformSelector 
          platform={platform} 
          onChange={(e) => setPlatform(e.target.value)} 
        />
      </Grid>
    </Grid>
  );
}

export default function DashboardDefault() {
  return (
    <PlatformProvider>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12}>
          <DashboardHeader />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce 
            title="Total de Impressões" 
            count={campaignData.metrics.impressions.total}
            percentage={campaignData.metrics.impressions.growth}
            extra={campaignData.metrics.impressions.extra}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce 
            title="Cliques"
            count={campaignData.metrics.clicks.total}
            percentage={campaignData.metrics.clicks.growth}
            extra={campaignData.metrics.clicks.extra}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce 
            title="Conversões" 
            count={campaignData.metrics.conversions.total}
            percentage={campaignData.metrics.conversions.growth}
            isLoss 
            color="warning" 
            extra={campaignData.metrics.conversions.extra}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce 
            title="ROI" 
            count={campaignData.metrics.roi.total}
            percentage={campaignData.metrics.roi.growth}
            isLoss 
            color="warning" 
            extra={campaignData.metrics.roi.extra}
          />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <UniqueVisitorCard />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Visão Geral de Engajamento</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="text.secondary">
                  Estatísticas desta Semana
                </Typography>
                <Typography variant="h3">7,650 Interações</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>

        {/* row 3 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Campanhas Recentes</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Relatório de Análise</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Crescimento de Engajamento" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Taxa de Retenção de Clientes" />
                <Typography variant="h5">58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Casos de Churn" />
                <Typography variant="h5">Baixo</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>

        {/* row 4 */}
        <Grid item xs={12} md={7} lg={8}>
          <SaleReportCard />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Histórico de Interações</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                }
              }}
            >
              {campaignData.recentCampaigns.map((campaign) => (
                <ListItemButton key={campaign.id} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                      <GiftOutlined />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<Typography variant="subtitle1">Campanha #{campaign.id}</Typography>} 
                    secondary={campaign.date} 
                  />
                  <ListItemSecondaryAction>
                    <Stack alignItems="flex-end">
                      {campaign.clicks && (
                        <>
                          <Typography variant="subtitle1" noWrap>
                            + {campaign.clicks} Cliques
                          </Typography>
                          <Typography variant="h6" color="text.secondary" noWrap>
                            {campaign.ctr}
                          </Typography>
                        </>
                      )}
                      {campaign.leads && (
                        <>
                          <Typography variant="subtitle1" noWrap>
                            + {campaign.leads} Leads
                          </Typography>
                          <Typography variant="h6" color="text.secondary" noWrap>
                            {campaign.conversion}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItemButton>
              ))}
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack>
                    <Typography variant="h5" noWrap>
                      Chat de Suporte ao Cliente
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      Tempo médio de resposta: 5 min
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    <Avatar alt="Remy Sharp" src={avatarLucas} />
                    <Avatar alt="Travis Howard" src={avatar2} />
                    <Avatar alt="Cindy Baker" src={avatar3} />
                    <Avatar alt="Agnes Walker" src={avatar4} />
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                Precisa de Ajuda?
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </PlatformProvider>
  );
}
