import React, { useState } from 'react';
import { 
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Divider, 
    Box,
    useTheme,
    Theme,
    CSSObject,
    useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Sidebar item interface
export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: (id: string) => void;
    subItems?: SidebarItem[];
    selected?: boolean;
}

// Footer logos interface
export interface SidebarLogo {
    src: string;
    alt: string;
}

// Define transition mixins
const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create(['width', 'background-color'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRight: 'none',
    marginTop: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.mixins.toolbar.minHeight as number + 8,
    },
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    [theme.breakpoints.up('sm')]: {
        height: `calc(100% - ${(theme.mixins.toolbar.minHeight as number) + 8}px)`,
    },
});

const closedMixin = (theme: Theme, closedWidth: number): CSSObject => ({
    transition: theme.transitions.create(['width', 'background-color'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `${closedWidth}px`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRight: 'none',
    marginTop: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.mixins.toolbar.minHeight as number + 8,
    },
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    [theme.breakpoints.up('sm')]: {
        height: `calc(100% - ${(theme.mixins.toolbar.minHeight as number) + 8}px)`,
    },
});

// Mobile drawer mixin
const mobileMixin = (theme: Theme): CSSObject => ({
    width: '100%',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRight: 'none',
    marginTop: theme.mixins.toolbar.minHeight,
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
});

// Header for spacing inside Drawer
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

// Props interface
interface SidebarProps {
    open: boolean;
    items: SidebarItem[];
    footerLogos?: SidebarLogo[];
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    open, 
    items, 
    footerLogos = [],
    onClose
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    
    // Get drawer width from theme
    const drawerWidth = theme.sidebar?.drawerWidth || 220;
    const closedDrawerWidth = theme.sidebar?.closedDrawerWidth || 50;
    
    // Styled Drawer component
    const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && !isMobile && {
                ...openedMixin(theme, drawerWidth),
                '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
            }),
            ...(!open && !isMobile && {
                ...closedMixin(theme, closedDrawerWidth),
                '& .MuiDrawer-paper': closedMixin(theme, closedDrawerWidth),
            }),
            ...(isMobile && open && {
                ...mobileMixin(theme),
                '& .MuiDrawer-paper': mobileMixin(theme),
            }),
        })
    );
    
    // Toggle a submenu
    const toggleSubMenu = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    
    // Handle item click
    const handleItemClick = (item: SidebarItem) => {
        if (item.subItems && item.subItems.length > 0) {
            toggleSubMenu(item.id);
        } else {
            item.onClick(item.id);
            // Close mobile drawer when clicking an item (if onClose is provided)
            if (isMobile && onClose) {
                onClose();
            }
        }
    };
    
    // Render a sidebar item (recursively handles sub-items)
    const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedItems[item.id];
        const paddingLeft = level * theme.sidebar?.subItemPadding || 0;
        
        return (
            <React.Fragment key={item.id}>
                <ListItem 
                    disablePadding 
                    sx={{ display: 'block' }}
                >
                    <ListItemButton
                        onClick={() => handleItemClick(item)}
                        sx={{
                            minHeight: level === 0 
                                ? theme.sidebar?.itemHeight || 40 
                                : theme.sidebar?.subItemHeight || 36,
                            pl: open ? 2 + paddingLeft : 2,
                            justifyContent: open ? 'initial' : 'center',
                            backgroundColor: item.selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            transition: theme => theme.transitions.create(['background-color', 'padding', 'min-height'], {
                                easing: theme.transitions.easing.easeInOut,
                                duration: theme.transitions.duration.shorter,
                            }),
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? theme.sidebar?.iconMargin || 2 : 'auto',
                                justifyContent: 'center',
                                color: 'inherit',
                                transition: theme => theme.transitions.create(['margin-right', 'transform'], {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.standard,
                                }),
                                animation: open ? 'none' : 'spin 0.4s ease-out',
                                '@keyframes spin': {
                                    '0%': {
                                        transform: 'rotate(-180deg)',
                                        opacity: 0.3,
                                    },
                                    '100%': {
                                        transform: 'rotate(0deg)',
                                        opacity: 1,
                                    },
                                },
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.label} 
                            sx={{ 
                                opacity: open ? 1 : 0,
                                m: 0,
                                transition: theme => theme.transitions.create(['opacity', 'transform'], {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.standard,
                                    delay: open ? '0.1s' : '0s',
                                }),
                                transform: open ? 'translateX(0)' : 'translateX(10px)',
                            }}
                            primaryTypographyProps={{ 
                                variant: level === 0 ? 'sidebarMenuItem' : 'sidebarSubMenuItem',
                                sx: {
                                    textTransform: level === 0 ? 'uppercase' : 'none',
                                    fontWeight: item.selected ? 500 : 400
                                }
                            }}
                        />
                        {hasSubItems && open && (
                            isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                        )}
                    </ListItemButton>
                </ListItem>
                
                {/* Render sub-items in a collapsible section */}
                {hasSubItems && (
                    <Collapse in={isExpanded && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.subItems?.map(subItem => 
                                renderSidebarItem(subItem, level + 1)
                            )}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };
    
    return (
        <StyledDrawer
            variant={isMobile ? "temporary" : "permanent"}
            open={open}
            onClose={onClose}
        >
            <DrawerHeader /> {/* Provides space for AppBar */}
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            
            <List component="nav">
                {items.map(item => renderSidebarItem(item))}
            </List>
            
            {/* Footer logos section, only visible when sidebar is open */}
            {footerLogos.length > 0 && (
                <>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ 
                        p: open ? 1.5 : 0.5, 
                        display: 'flex', 
                        justifyContent: 'space-around', 
                        alignItems: 'center', 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        opacity: open ? 1 : 0, 
                        transition: theme => theme.transitions.create(['opacity', 'padding'], {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                        overflow: 'hidden', 
                        minHeight: 50, 
                    }}>
                        {footerLogos.map((logo, index) => (
                            <Box 
                                key={index}
                                component="img" 
                                src={logo.src} 
                                alt={logo.alt} 
                                sx={{ 
                                    height: 30, 
                                    width: 'auto', 
                                    objectFit: 'contain', 
                                    display: open ? 'block' : 'none',
                                    animation: open ? 'fadeInLogo 0.6s ease-out' : 'none',
                                    '@keyframes fadeInLogo': {
                                        '0%': {
                                            opacity: 0,
                                            transform: 'scale(0.5)'
                                        },
                                        '100%': {
                                            opacity: 1,
                                            transform: 'scale(1)'
                                        }
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </>
            )}
        </StyledDrawer>
    );
};

export default Sidebar; 