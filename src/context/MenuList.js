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

const Menu = {
  ROLE1: [
    {
      href: '/app/organizaiton/view',
      icon: UsersIcon,
      title: 'Organizations'
    },
    {
      href: '/app/company/view',
      icon: UsersIcon,
      title: 'Companies'
    },
    {
      href: '/app/employee/view',
      icon: UsersIcon,
      title: 'Employees'
    }
  ],
  SUPER_ADMIN: [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/organizaiton/view',
      icon: UsersIcon,
      title: 'Organizations'
    },
    {
      href: '/app/company/view',
      icon: UsersIcon,
      title: 'Companies'
    },
    {
      href: '/app/employee/view',
      icon: UsersIcon,
      title: 'Employees'
    },

    {
      href: '/app/permission/create',
      icon: UsersIcon,
      title: 'Permissions'
    },
    {
      href: '/app/designation/view',
      icon: UsersIcon,
      title: 'Designations'
    },

    // {
    //   href: '/app/account',
    //   icon: UserIcon,
    //   title: 'Account'
    // },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings'
    },
  ],
  ROLE2: [
    {
      href: 'app/organizaiton/view',
      icon: UsersIcon,
      title: 'Organizations'
    },
    {
      href: '/app/company/view',
      icon: UsersIcon,
      title: 'Companies'
    },
  ],
  DEFAULT: [
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Change Password'
    }
  ]
}

export const GetRoles = () => {
  return Object.keys(Menu);
}

export default Menu;