// assets
import { MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
  MessageOutlined
};

// ==============================|| MENU ITEMS - CHAT ||============================== //

const chat = {
  id: 'chat',
  title: 'Chat',
  type: 'group',
  children: [
    {
      id: 'chat-page',
      title: 'Chat',
      type: 'item',
      url: '/chat',
      icon: icons.MessageOutlined,
      breadcrumbs: false
    }
  ]
};

export default chat;
