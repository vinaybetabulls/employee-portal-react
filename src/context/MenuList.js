import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Users as UsersIcon,
  Award as AwardIcon, Briefcase as BriefcaseIcon
} from 'react-feather';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ApartmentIcon from '@material-ui/icons/Apartment';

const Menu = {
  ROLE1: [
    {
      href: '/app/organizaiton/view',
      icon: AccountBalanceIcon,
      title: 'Organizations'
    },
    {
      href: '/app/company/view',
      icon: ApartmentIcon,
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
      icon: AccountBalanceIcon,
      title: 'Organizations'
    },
    {
      href: '/app/company/view',
      icon: ApartmentIcon,
      title: 'Companies'
    },
    {
      href: '/app/employee/view',
      icon: UsersIcon,
      title: 'Employees'
    },
    {
      href: '/app/designation/view',
      icon: AwardIcon,
      title: 'Designations'
    },
    {
      href: '/app/department/view',
      icon: BriefcaseIcon,
      title: 'Departments'
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings'
    },
  ],
  ROLE2: [
    {
      href: '/app/organizaiton/view',
      icon: AccountBalanceIcon,
      title: 'Organizations'
    },
    {
      href: '/app/company/view',
      icon: ApartmentIcon,
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
};

export const GetRoles = () => {
  return Object.keys(Menu);
};

export default Menu;
