// assets
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

// icons
const icons = {
  ShoppingCartCheckoutIcon
};

// ==============================|| MENU ITEMS - PAYMENT ||============================== //

const payment = {
  id: 'payment',
  title: 'Pagamento',
  type: 'group',
  children: [
    {
      id: 'checkout',
      title: 'Checkout',
      type: 'item',
      url: '/payment',
      icon: icons.ShoppingCartCheckoutIcon,
      breadcrumbs: false
    }
  ]
};

export default payment;