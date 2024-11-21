import { ApiOutlined } from '@ant-design/icons';

const icons = {
  ApiOutlined
};

// ==============================|| MENU ITEMS - INTEGRATION ||============================== //

const integration = {
  id: 'integration',
  title: 'Integrações',
  type: 'group',
  children: [
    {
      id: 'tokens',
      title: 'Tokens API',
      type: 'item',
      url: '/integration',
      icon: icons.ApiOutlined,
      breadcrumbs: false
    }
  ]
};

export default integration; 