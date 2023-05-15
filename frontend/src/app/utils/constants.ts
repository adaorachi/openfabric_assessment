export const categories = [
  { name: 'All', value: 'all' },
  { name: 'Clothings', value: 'clothings' },
  { name: 'Footwear & Bags', value: 'footwear_and_bags' },
  { name: 'Furniture', value: 'furniture' },
  { name: 'Gadgets', value: 'gadgets' },
];

export const sidebarList = [
  {
    id: 'account',
    name: 'Account',
    icon: 'bi-house-door',
    routerLink: '/account',
  },
  {
    id: 'products',
    name: 'Products',
    icon: 'bi-ui-checks-grid',
    routerLink: '/products',
  },
  {
    id: 'manage-products',
    name: 'Manage Products',
    icon: 'bi-kanban-fill',
    routerLink: '/manage-products',
  },
  {
    id: 'create-product',
    name: 'Create Products',
    icon: 'bi-bag-plus-fill',
    routerLink: '/create-product',
  },
  {
    id: 'orders',
    name: 'Orders',
    icon: 'bi-table',
    routerLink: '/orders',
  },

  {
    id: 'customers',
    name: 'Customers',
    icon: 'bi-people',
    routerLink: '/customers',
  },
];
