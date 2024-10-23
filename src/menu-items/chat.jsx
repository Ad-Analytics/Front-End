import { MessageOutlined } from '@ant-design/icons';

const icons = {
  MessageOutlined
};

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
