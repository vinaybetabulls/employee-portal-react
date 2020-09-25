import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';

const Menu = [
  {
    role1: [
      {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Customers'
      },
      {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Products'
      },
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings'
      },
      {
        href: '/login',
        icon: LockIcon,
        title: 'Login'
      },
      {
        href: '/register',
        icon: UserPlusIcon,
        title: 'Register'
      },
      {
        href: '/404',
        icon: AlertCircleIcon,
        title: 'Error'
      }
    ],
  },
  {
    superadmin: [
      {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard'
      },
      {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Customers'
      },
      {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Products'
      },
      {
        href: '/app/account',
        icon: UserIcon,
        title: 'Account'
      },
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings'
      },
      {
        href: '/login',
        icon: LockIcon,
        title: 'Login'
      },
      {
        href: '/register',
        icon: UserPlusIcon,
        title: 'Register'
      },
      {
        href: '/404',
        icon: AlertCircleIcon,
        title: 'Error'
      }
    ]
  },
  {
    role2: [
      {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Customers'
      },
      {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Products'
      },
    ]
  },
  {
    default: [
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Change Password'
      },
      {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Customers',
      },
      {
        href: '/app/account',
        icon: UserIcon,
        title: 'Account'
      },
      {
        href: '/app/employee/create',
        icon: UserIcon,
        title: 'Create Employee'
      },
    ]
  }
]

export default Menu;