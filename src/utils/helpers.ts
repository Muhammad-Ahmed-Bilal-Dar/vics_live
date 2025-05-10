/**
 * Calculates availability percentage
 * @param available Number of available items
 * @param total Total number of items
 * @returns Percentage of available items
 */
export const getAvailabilityPercentage = (available: number, total: number): number => {
  return total > 0 ? Math.round((available / total) * 100) : 0;
};

/**
 * Extract initials from a name
 * @param name Full name
 * @returns Initials (up to 2 characters)
 */
export const getInitials = (name: string): string => {
  const nameParts = name.split(' ');
  return nameParts.length > 1 
    ? `${nameParts[0][0]}${nameParts[1][0]}` 
    : nameParts[0].substring(0, 2);
};

/**
 * Formats a date string to a more readable format
 * @param dateStr Date string in format MM/DD/YYYY
 * @returns Formatted date string
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  const [month, day, year] = dateStr.split('/');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Check if month is valid before accessing months array
  const monthIndex = parseInt(month) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex >= months.length) {
    return dateStr; // Return original string if date format is invalid
  }
  
  return `${months[monthIndex]} ${parseInt(day)}, ${year}`;
}; 