import CampaignIcon from '@mui/icons-material/Campaign';

const campaigns = {
  id: 'group-campaigns',
  title: 'Marketing',
  type: 'group',
  children: [
    {
      id: 'campaigns',
      title: 'Campanhas',
      type: 'item',
      url: '/campaigns',
      icon: CampaignIcon,
      breadcrumbs: false
    }
  ]
};

export default campaigns; 