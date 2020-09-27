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
  },
  {
    superadmin: [
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
    ]
  },
  {
    role2: [
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
    ]
  },
  {
    default: [
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Change Password'
      }
    ]
  }
]

export default Menu;