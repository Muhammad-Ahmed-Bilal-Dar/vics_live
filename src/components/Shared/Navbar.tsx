import React, { useState } from 'react';
import { 
    AppBar,
    Toolbar,
    IconButton,
    Box, 
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

// Interfaces for the navbar props and menu items
interface UserProfileMenuItem {
    label: string;
    icon: React.ReactNode;
    action: () => void;
    disabled?: boolean;
}

interface NavbarUserInfo {
    name: string;
    email: string;
    role: string;
    avatar?: string; // URL or initials
}

interface NavbarProps {
    onMenuToggle: () => void;
    onLogout: () => void;
    onNavigateToProfile?: () => void;
    onNavigateToChangePassword?: () => void;
    userInfo: NavbarUserInfo;
    logoSrc: string;
    logoAlt: string;
    showSearch?: boolean;
    showNotifications?: boolean;
    additionalMenuItems?: UserProfileMenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({
    onMenuToggle,
    onLogout,
    onNavigateToProfile,
    onNavigateToChangePassword,
    userInfo,
    logoSrc,
    logoAlt,
    showSearch = false,
    showNotifications = false,
    additionalMenuItems = []
}) => {
    const theme = useTheme();
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

    // Profile Menu Handlers
    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };
    
    const handleCloseProfileMenu = () => {
        setProfileMenuAnchorEl(null);
    };

    const handleLogoutClick = () => {
        handleCloseProfileMenu();
        onLogout();
    };

    const handleProfileClick = () => {
        handleCloseProfileMenu();
        if (onNavigateToProfile) {
            onNavigateToProfile();
        }
    };

    const handleChangePasswordClick = () => {
        handleCloseProfileMenu();
        if (onNavigateToChangePassword) {
            onNavigateToChangePassword();
        }
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: theme.zIndex.drawer + 1, 
                bgcolor: theme.palette.secondary.main,
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Toolbar>
                {/* Menu Button */}
                <IconButton
                    sx={{ 
                        marginRight: 2, 
                        color: theme.palette.getContrastText(theme.palette.secondary.main) 
                    }} 
                    aria-label="toggle drawer"
                    onClick={onMenuToggle}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo */}
                <Box 
                    component="img"
                    src={logoSrc}
                    alt={logoAlt}
                    sx={{ height: 40, mr: 2 }}
                />

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Optional Search Button */}
                {showSearch && (
                    <IconButton 
                        color="inherit" 
                        sx={{ mr: 1 }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                )}

                {/* Optional Notifications Button */}
                {showNotifications && (
                    <IconButton 
                        color="inherit" 
                        sx={{ mr: 1 }}
                        aria-label="notifications"
                    >
                        <NotificationsIcon />
                    </IconButton>
                )}

                {/* Profile Button */}
                <IconButton
                    sx={{ p: 0 }}
                    aria-label="account of current user"
                    aria-controls={isProfileMenuOpen ? 'profile-menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpenProfileMenu}
                    color="inherit"
                >
                    <Avatar 
                        sx={{ 
                            bgcolor: theme.palette.primary.main, 
                            width: 32, 
                            height: 32 
                        }}
                    >
                        {userInfo.avatar || userInfo.name.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
            </Toolbar>

            {/* Profile Menu */}
            <Menu
                id="profile-menu-appbar"
                anchorEl={profileMenuAnchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isProfileMenuOpen}
                onClose={handleCloseProfileMenu}
                sx={{ mt: '5px' }}
            >
                {/* User Info */}
                <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 }}}>
                    <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary={`Name: ${userInfo.name}`} />
                </MenuItem>
                <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 }}}>
                    <ListItemIcon><EmailIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary={`Email: ${userInfo.email}`} />
                </MenuItem>
                <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 }}}>
                    <ListItemIcon><BadgeIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary={`Role: ${userInfo.role}`} />
                </MenuItem>
                
                <Divider sx={{ my: 1 }} />
                
                {/* Standard Actions */}
                {onNavigateToProfile && (
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon><ManageAccountsIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Update Profile</ListItemText>
                    </MenuItem>
                )}
                
                {onNavigateToChangePassword && (
                    <MenuItem onClick={handleChangePasswordClick}>
                        <ListItemIcon><KeyIcon fontSize="small" /></ListItemIcon>
                        <ListItemText>Change Password</ListItemText>
                    </MenuItem>
                )}
                
                {/* Additional Menu Items */}
                {additionalMenuItems.length > 0 && (
                    <>
                        {additionalMenuItems.map((item, index) => (
                            <MenuItem 
                                key={index} 
                                onClick={item.action}
                                disabled={item.disabled}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.label}</ListItemText>
                            </MenuItem>
                        ))}
                        <Divider sx={{ my: 1 }} />
                    </>
                )}
                
                {/* Logout */}
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: 'error' }}>LOGOUT</ListItemText>
                </MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Navbar; 