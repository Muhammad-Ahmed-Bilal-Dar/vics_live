// Define a type for supported languages
export type SupportedLanguage = 'en' | 'ur' | 'ar' | 'zh';

// Define a type for translation keys
interface Translations {
  // Common
  dashboard: string;
  station: string;
  reports: string;
  analytics: string;
  appointments: string;
  settings: string;
  management: string;
  
  // Management sections
  userManagement: string;
  stationManagement: string;
  areaManagement: string;
  appointmentManagement: string;
  
  // Settings
  theme: string;
  displayMode: string;
  light: string;
  dark: string;
  textSize: string;
  small: string;
  default: string;
  large: string;
  extraLarge: string;
  currentTextSize: string;
  language: string;
  languageAndRegion: string;
  notificationSettings: string;
  emailNotifications: string;
  pushNotifications: string;
  dateTimeFormat: string;
  hour12: string;
  hour24: string;
  resetToDefault: string;
  saveSettings: string;
  settingsUpdated: string;
  
  // Area Management
  areaName: string;
  city: string;
  region: string;
  population: string;
  stations: string;
  status: string;
  createdDate: string;
  action: string;
  
  // Station Management
  stationName: string;
  location: string;
  type: string;
  powerOutput: string;
  chargers: string;
  lastUpdated: string;
  
  // Statuses
  active: string;
  inactive: string;
  planned: string;
  operational: string;
  maintenance: string;
  offline: string;
  
  // Development placeholder
  underDevelopment: string;
}

// English translations
const enTranslations: Translations = {
  // Common
  dashboard: 'Dashboard',
  station: 'Station',
  reports: 'Reports',
  analytics: 'Analytics',
  appointments: 'Appointments',
  settings: 'Settings',
  management: 'Management',
  
  // Management sections
  userManagement: 'User Management',
  stationManagement: 'Station Management',
  areaManagement: 'Area Management',
  appointmentManagement: 'Appointment Management',
  
  // Settings
  theme: 'Theme',
  displayMode: 'Display Mode',
  light: 'Light',
  dark: 'Dark',
  textSize: 'Text Size',
  small: 'Small',
  default: 'Default',
  large: 'Large',
  extraLarge: 'Extra Large',
  currentTextSize: 'Current Text Size',
  language: 'Language',
  languageAndRegion: 'Language & Region',
  notificationSettings: 'Notification Settings',
  emailNotifications: 'Email Notifications',
  pushNotifications: 'Push Notifications',
  dateTimeFormat: 'Date & Time Format',
  hour12: '12-hour (1:30 PM)',
  hour24: '24-hour (13:30)',
  resetToDefault: 'Reset to Default',
  saveSettings: 'Save Settings',
  settingsUpdated: 'Settings updated successfully',
  
  // Area Management
  areaName: 'Area Name',
  city: 'City',
  region: 'Region',
  population: 'Population',
  stations: 'Stations',
  status: 'Status',
  createdDate: 'Created Date',
  action: 'Action',
  
  // Station Management
  stationName: 'Station Name',
  location: 'Location',
  type: 'Type',
  powerOutput: 'Power Output',
  chargers: 'Chargers',
  lastUpdated: 'Last Updated',
  
  // Statuses
  active: 'Active',
  inactive: 'Inactive',
  planned: 'Planned',
  operational: 'Operational',
  maintenance: 'Maintenance',
  offline: 'Offline',
  
  // Development placeholder
  underDevelopment: 'This module is under development.'
};

// Urdu translations
const urTranslations: Translations = {
  // Common
  dashboard: 'ڈیش بورڈ',
  station: 'اسٹیشن',
  reports: 'رپورٹس',
  analytics: 'تجزیات',
  appointments: 'اپائنٹمنٹس',
  settings: 'ترتیبات',
  management: 'انتظام',
  
  // Management sections
  userManagement: 'صارف انتظام',
  stationManagement: 'اسٹیشن انتظام',
  areaManagement: 'علاقہ انتظام',
  appointmentManagement: 'اپائنٹمنٹ انتظام',
  
  // Settings
  theme: 'تھیم',
  displayMode: 'ڈسپلے موڈ',
  light: 'روشن',
  dark: 'تاریک',
  textSize: 'متن کا سائز',
  small: 'چھوٹا',
  default: 'ڈیفالٹ',
  large: 'بڑا',
  extraLarge: 'بہت بڑا',
  currentTextSize: 'موجودہ متن کا سائز',
  language: 'زبان',
  languageAndRegion: 'زبان اور علاقہ',
  notificationSettings: 'اطلاعات کی ترتیبات',
  emailNotifications: 'ای میل اطلاعات',
  pushNotifications: 'پش اطلاعات',
  dateTimeFormat: 'تاریخ اور وقت کی شکل',
  hour12: '12 گھنٹے (1:30 PM)',
  hour24: '24 گھنٹے (13:30)',
  resetToDefault: 'ڈیفالٹ پر ری سیٹ کریں',
  saveSettings: 'ترتیبات محفوظ کریں',
  settingsUpdated: 'ترتیبات کامیابی سے اپ ڈیٹ ہو گئیں',
  
  // Area Management
  areaName: 'علاقے کا نام',
  city: 'شہر',
  region: 'خطہ',
  population: 'آبادی',
  stations: 'اسٹیشنز',
  status: 'حالت',
  createdDate: 'تخلیق کی تاریخ',
  action: 'عمل',
  
  // Station Management
  stationName: 'اسٹیشن کا نام',
  location: 'مقام',
  type: 'قسم',
  powerOutput: 'پاور آؤٹ پٹ',
  chargers: 'چارجرز',
  lastUpdated: 'آخری اپڈیٹ',
  
  // Statuses
  active: 'فعال',
  inactive: 'غیر فعال',
  planned: 'منصوبہ بند',
  operational: 'آپریشنل',
  maintenance: 'دیکھ بھال',
  offline: 'آف لائن',
  
  // Development placeholder
  underDevelopment: 'یہ ماڈیول ابھی زیر ترقی ہے۔'
};

// Create a mapping of languages to translations
const translations: Record<SupportedLanguage, Translations> = {
  en: enTranslations,
  ur: urTranslations,
  // Placeholders for future languages - would use actual translations in a real app
  ar: enTranslations,
  zh: enTranslations
};

export default translations; 