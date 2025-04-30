import React from 'react';
import { Box, CssBaseline, Container, Typography, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar, { SidebarItem, SidebarLogo } from './Sidebar';

interface DashboardContainerProps {
    // Sidebar Props
    sidebarOpen: boolean;
    onSidebarToggle: () => void;
    sidebarItems: SidebarItem[];
    sidebarFooterLogos?: SidebarLogo[];
    
    // Navbar Props
    logoSrc: string;
    logoAlt: string;
    userInfo: {
        name: string;
        email: string;
        role: string;
        avatar?: string;
    };
    onLogout: () => void;
    onNavigateToProfile?: () => void;
    onNavigateToChangePassword?: () => void;
    showSearch?: boolean;
    showNotifications?: boolean;
    
    // Content Props
    children: React.ReactNode;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
    // Sidebar Props
    sidebarOpen,
    onSidebarToggle,
    sidebarItems,
    sidebarFooterLogos = [],
    
    // Navbar Props
    logoSrc,
    logoAlt,
    userInfo,
    onLogout,
    onNavigateToProfile,
    onNavigateToChangePassword,
    showSearch = false,
    showNotifications = false,
    
    // Content Props
    children
}) => {
    const theme = useTheme();
    const drawerWidth = theme.sidebar?.drawerWidth || 220;
    const closedDrawerWidth = theme.sidebar?.closedDrawerWidth || 50;
    
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            
            {/* Navbar */}
            <Navbar 
                onMenuToggle={onSidebarToggle}
                onLogout={onLogout}
                onNavigateToProfile={onNavigateToProfile}
                onNavigateToChangePassword={onNavigateToChangePassword}
                userInfo={userInfo}
                logoSrc={logoSrc}
                logoAlt={logoAlt}
                showSearch={showSearch}
                showNotifications={showNotifications}
            />
            
            {/* Sidebar */}
            <Sidebar 
                open={sidebarOpen}
                items={sidebarItems}
                footerLogos={sidebarFooterLogos}
                onClose={onSidebarToggle}
            />
            
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: {
                        sm: sidebarOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`,
                        xs: 0
                    },
                    width: {
                        sm: `calc(100% - ${sidebarOpen ? drawerWidth : closedDrawerWidth}px)`,
                        xs: '100%'
                    },
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: sidebarOpen 
                            ? theme.transitions.duration.enteringScreen 
                            : theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                {/* Spacer for the AppBar */}
                <Box sx={{ ...theme.mixins.toolbar, mb: 2 }} />
                
                {/* Render the dashboard content */}
                {children}
            </Box>
        </Box>
    );
};

export default DashboardContainer; 