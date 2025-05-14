import React from 'react';
import { SidebarItem, SidebarLogo } from './Sidebar';

// Icons for VICS sidebar
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SensorsIcon from '@mui/icons-material/Sensors';
import PersonIcon from '@mui/icons-material/Person';
import EvStationIcon from '@mui/icons-material/EvStation';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';

// Icons for LAW-MIS sidebar
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';

// Logos for footer
import PtaLogo from '../../assets/images/PTA-logo.png';
import PunjabLogo from '../../assets/images/punjab-logo.png';
import TransportLogo from '../../assets/images/transport-loho.png';

// VICS Sidebar Items Generator
export const generateVicsSidebarItems = (
    currentModule: string,
    onModuleSelect: (module: string) => void
): SidebarItem[] => {
    const isManagementModule = currentModule.startsWith('Management');
    
    // Generate management sub-items
    const managementSubItems: SidebarItem[] = [
        {
            id: 'Management/User',
            label: 'User management',
            icon: <PersonIcon fontSize="small" />,
            onClick: () => onModuleSelect('Management/User'),
            selected: currentModule === 'Management/User'
        },
        {
            id: 'Management/Station',
            label: 'Station management',
            icon: <EvStationIcon fontSize="small" />,
            onClick: () => onModuleSelect('Management/Station'),
            selected: currentModule === 'Management/Station'
        },
        {
            id: 'Management/Area',
            label: 'Area management',
            icon: <LocationOnIcon fontSize="small" />,
            onClick: () => onModuleSelect('Management/Area'),
            selected: currentModule === 'Management/Area'
        },
        {
            id: 'Management/Appointment',
            label: 'Appointment management',
            icon: <EventNoteIcon fontSize="small" />,
            onClick: () => onModuleSelect('Management/Appointment'),
            selected: currentModule === 'Management/Appointment'
        }
    ];
    
    return [
        {
            id: 'Dashboard',
            label: 'Dashboard',
            icon: <DashboardIcon fontSize="small" />,
            onClick: () => onModuleSelect('Dashboard'),
            selected: currentModule === 'Dashboard'
        },
        {
            id: 'Station',
            label: 'Station',
            icon: <SensorsIcon fontSize="small" />,
            onClick: () => onModuleSelect('Station'),
            selected: currentModule === 'Station'
        },
        {
            id: 'Reports',
            label: 'Reports',
            icon: <AssessmentIcon fontSize="small" />,
            onClick: () => onModuleSelect('Reports'),
            selected: currentModule === 'Reports'
        },
        {
            id: 'Analytics',
            label: 'Analytics',
            icon: <BarChartIcon fontSize="small" />,
            onClick: () => onModuleSelect('Analytics'),
            selected: currentModule === 'Analytics'
        },
        {
            id: 'Appointments',
            label: 'Appointments',
            icon: <CalendarMonthIcon fontSize="small" />,
            onClick: () => onModuleSelect('Appointments'),
            selected: currentModule === 'Appointments'
        },
        {
            id: 'Management',
            label: 'Management',
            icon: <ManageAccountsIcon fontSize="small" />,
            onClick: () => {},
            selected: isManagementModule,
            subItems: managementSubItems
        },
        {
            id: 'Settings',
            label: 'Settings',
            icon: <SettingsIcon fontSize="small" />,
            onClick: () => onModuleSelect('Settings'),
            selected: currentModule === 'Settings'
        }
    ];
};

// LAW-MIS Sidebar Items Generator
export const generateLawMisSidebarItems = (
    currentView: string,
    onNavigateBack: () => void,
    onNavigateToView: (view: string) => void
): SidebarItem[] => {
    return [
        {
            id: 'Dashboard',
            label: 'Dashboard',
            icon: <DashboardIcon fontSize="small" />,
            onClick: () => onNavigateBack(),
            selected: currentView === 'DASHBOARD'
        }
    ];
};

// Vendor Sidebar Items Generator
export const generateVendorSidebarItems = (
    currentView: string,
    onNavigateBack: () => void,
    onNavigateToView: (view: string) => void
): SidebarItem[] => {
    return [
        {
            id: 'Dashboard',
            label: 'Dashboard',
            icon: <DashboardIcon fontSize="small" />,
            onClick: () => onNavigateBack(),
            selected: currentView === 'DASHBOARD'
        },
        {
            id: 'Products',
            label: 'Manage Products',
            icon: <InventoryIcon fontSize="small" />,
            onClick: () => onNavigateToView('MANAGE_PRODUCTS'),
            selected: currentView === 'MANAGE_PRODUCTS'
        },
        {
            id: 'Orders',
            label: 'View Orders',
            icon: <ShoppingCartIcon fontSize="small" />,
            onClick: () => onNavigateToView('VIEW_ORDERS'),
            selected: currentView === 'VIEW_ORDERS'
        },
        {
            id: 'BecomeVendor',
            label: 'Vendor Registration',
            icon: <BusinessIcon fontSize="small" />,
            onClick: () => onNavigateToView('BECOME_VENDOR'),
            selected: currentView === 'BECOME_VENDOR'
        },
        {
            id: 'Profile',
            label: 'Profile',
            icon: <AccountCircleIcon fontSize="small" />,
            onClick: () => onNavigateToView('PROFILE'),
            selected: currentView === 'PROFILE'
        },
        {
            id: 'ChangePassword',
            label: 'Change Password',
            icon: <LockIcon fontSize="small" />,
            onClick: () => onNavigateToView('CHANGE_PASSWORD'),
            selected: currentView === 'CHANGE_PASSWORD'
        }
    ];
};

// Footer Logos
export const lawMisFooterLogos: SidebarLogo[] = [
    { src: PtaLogo, alt: 'PTA Logo' },
    { src: PunjabLogo, alt: 'Punjab Logo' },
    { src: TransportLogo, alt: 'Transport Logo' }
];

export const vicsFooterLogos: SidebarLogo[] = [];  // No footer logos for VICS  