import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { getInitials, formatDate } from '../../utils/helpers';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  stationName: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar?: string;
}

interface UserManagementProps {
  visible: boolean;
}

// Fixed user data
const userdata: User[] = [
  {
    id: 1,
    name: 'Ahmed Raza',
    email: 'ahmed.raza@example.com',
    phone: '+92 300-1234567',
    stationName: 'Lahore EV Station',
    status: 'active',
    joinDate: '02/15/2024',
    avatar: 'AR'
  },
  {
    id: 2,
    name: 'Bilal Hussain',
    email: 'bilal.hussain@example.com',
    phone: '+92 333-9876543',
    stationName: 'Faisalabad Charge Zone',
    status: 'inactive',
    joinDate: '01/05/2023',
    avatar: 'BH'
  },
  {
    id: 3,
    name: 'Usman Tariq',
    email: 'usman.tariq@example.com',
    phone: '+92 306-4455667',
    stationName: 'Rawalpindi Volt Corner',
    status: 'active',
    joinDate: '12/01/2024',
    avatar: 'UT'
  },
  {
    id: 4,
    name: 'Zain Ali',
    email: 'zain.ali@example.com',
    phone: '+92 309-5566778',
    stationName: 'Multan EV Dock',
    status: 'inactive',
    joinDate: '07/30/2023',
    avatar: 'ZA'
  },
  {
    id: 5,
    name: 'Imran Ashraf',
    email: 'imran.ashraf@example.com',
    phone: '+92 331-2233445',
    stationName: 'Gujranwala SparkPoint',
    status: 'active',
    joinDate: '09/14/2024',
    avatar: 'IA'
  },
  {
    id: 6,
    name: 'Daniyal Malik',
    email: 'daniyal.malik@example.com',
    phone: '+92 300-8877665',
    stationName: 'Bahawalpur EV Bay',
    status: 'inactive',
    joinDate: '06/06/2023',
    avatar: 'DM'
  },
  {
    id: 7,
    name: 'Farhan Sheikh',
    email: 'farhan.sheikh@example.com',
    phone: '+92 304-6655443',
    stationName: 'Sialkot Spark Station',
    status: 'active',
    joinDate: '05/05/2024',
    avatar: 'FS'
  },
  {
    id: 8,
    name: 'Saad Qureshi',
    email: 'saad.qureshi@example.com',
    phone: '+92 335-9988774',
    stationName: 'Rahim Yar Khan EV Station',
    status: 'active',
    joinDate: '04/01/2024',
    avatar: 'SQ'
  },
  {
    id: 9,
    name: 'Adeel Akhtar',
    email: 'adeel.akhtar@example.com',
    phone: '+92 301-4433225',
    stationName: 'Kasur EV Point',
    status: 'active',
    joinDate: '01/22/2024',
    avatar: 'AA'
  },
  {
    id: 10,
    name: 'Hamza Nawaz',
    email: 'hamza.nawaz@example.com',
    phone: '+92 300-7766553',
    stationName: 'Jhelum Charge Spot',
    status: 'active',
    joinDate: '12/31/2024',
    avatar: 'HN'
  },
  {
    id: 11,
    name: 'Faizan Murtaza',
    email: 'faizan.murtaza@example.com',
    phone: '+92 312-9988776',
    stationName: 'Okara Volt Dock',
    status: 'active',
    joinDate: '09/22/2024',
    avatar: 'FM'
  },
  {
    id: 12,
    name: 'Talha Rauf',
    email: 'talha.rauf@example.com',
    phone: '+92 319-6655331',
    stationName: 'Sheikhupura Charge Zone',
    status: 'active',
    joinDate: '03/04/2024',
    avatar: 'TR'
  },
  {
    id: 13,
    name: 'Noman Abbas',
    email: 'noman.abbas@example.com',
    phone: '+92 305-4433212',
    stationName: 'Vehari Electric Point',
    status: 'active',
    joinDate: '06/13/2024',
    avatar: 'NA'
  },
  {
    id: 14,
    name: 'Shahzaib Khan',
    email: 'shahzaib.khan@example.com',
    phone: '+92 321-2233556',
    stationName: 'Sargodha Power Stop',
    status: 'active',
    joinDate: '01/18/2024',
    avatar: 'SK'
  },
  {
    id: 15,
    name: 'Waqar Javed',
    email: 'waqar.javed@example.com',
    phone: '+92 322-1122334',
    stationName: 'Mianwali Grid Center',
    status: 'active',
    joinDate: '02/14/2024',
    avatar: 'WJ'
  },
  {
    id: 16,
    name: 'Raza Mirza',
    email: 'raza.mirza@example.com',
    phone: '+92 324-7788990',
    stationName: 'Dera Ghazi Khan Hub',
    status: 'inactive',
    joinDate: '03/12/2023',
    avatar: 'RM'
  },
  {
    id: 17,
    name: 'Hammad Saleem',
    email: 'hammad.saleem@example.com',
    phone: '+92 303-4433556',
    stationName: 'Lodhran Charge Point',
    status: 'active',
    joinDate: '04/21/2024',
    avatar: 'HS'
  },
  {
    id: 18,
    name: 'Salman Iqbal',
    email: 'salman.iqbal@example.com',
    phone: '+92 307-2299334',
    stationName: 'Khanewal EV Station',
    status: 'active',
    joinDate: '01/09/2024',
    avatar: 'SI'
  },
  {
    id: 19,
    name: 'Junaid Bashir',
    email: 'junaid.bashir@example.com',
    phone: '+92 334-6655112',
    stationName: 'Pakpattan Energy Dock',
    status: 'active',
    joinDate: '03/11/2024',
    avatar: 'JB'
  },
  {
    id: 20,
    name: 'Haris Nadeem',
    email: 'haris.nadeem@example.com',
    phone: '+92 313-8844221',
    stationName: 'Layyah Power Dock',
    status: 'active',
    joinDate: '02/22/2024',
    avatar: 'HN'
  },
  {
    id: 21,
    name: 'Ahsan Shah',
    email: 'ahsan.shah@example.com',
    phone: '+92 310-9988771',
    stationName: 'Hafizabad Electric Bay',
    status: 'active',
    joinDate: '05/02/2024',
    avatar: 'AS'
  },
  {
    id: 22,
    name: 'Zeeshan Baig',
    email: 'zeeshan.baig@example.com',
    phone: '+92 328-7733445',
    stationName: 'Bhakkar Energy Hub',
    status: 'active',
    joinDate: '11/15/2024',
    avatar: 'ZB'
  },
  {
    id: 23,
    name: 'Kashif Rehman',
    email: 'kashif.rehman@example.com',
    phone: '+92 300-3344559',
    stationName: 'Chiniot Spark Plug',
    status: 'inactive',
    joinDate: '08/08/2023',
    avatar: 'KR'
  },
  {
    id: 24,
    name: 'Irfan Khalid',
    email: 'irfan.khalid@example.com',
    phone: '+92 302-1100998',
    stationName: 'Muzaffargarh PowerPoint',
    status: 'active',
    joinDate: '01/27/2024',
    avatar: 'IK'
  },
  {
    id: 25,
    name: 'Taimoor Aslam',
    email: 'taimoor.aslam@example.com',
    phone: '+92 345-1223344',
    stationName: 'Narowal EV Dock',
    status: 'active',
    joinDate: '06/30/2024',
    avatar: 'TA'
  },
  {
    id: 26,
    name: 'Sohail Nawaz',
    email: 'sohail.nawaz@example.com',
    phone: '+92 316-4433999',
    stationName: 'Chakwal Electric Dock',
    status: 'active',
    joinDate: '04/15/2024',
    avatar: 'SN'
  },
  {
    id: 27,
    name: 'Usama Anwar',
    email: 'usama.anwar@example.com',
    phone: '+92 309-5544332',
    stationName: 'Toba Tek Singh Grid Spot',
    status: 'active',
    joinDate: '05/08/2024',
    avatar: 'UA'
  },
  {
    id: 28,
    name: 'Ameer Hamza',
    email: 'ameer.hamza@example.com',
    phone: '+92 335-4433224',
    stationName: 'Attock EV Bay',
    status: 'active',
    joinDate: '02/26/2024',
    avatar: 'AH'
  },
  {
    id: 29,
    name: 'Asif Javaid',
    email: 'asif.javaid@example.com',
    phone: '+92 321-9988770',
    stationName: 'Jhang ChargeUp Station',
    status: 'inactive',
    joinDate: '09/20/2023',
    avatar: 'AJ'
  },
  {
    id: 30,
    name: 'Hassan Mir',
    email: 'hassan.mir@example.com',
    phone: '+92 300-7766552',
    stationName: 'Bahawalnagar SparkPoint',
    status: 'active',
    joinDate: '07/11/2024',
    avatar: 'HM'
  },
  {
    id: 31,
    name: 'Abdul Moiz',
    email: 'abdul.moiz@example.com',
    phone: '+92 314-8899776',
    stationName: 'Rajanpur Charge Station',
    status: 'active',
    joinDate: '03/30/2024',
    avatar: 'AM'
  },
  {
    id: 32,
    name: 'Arslan Yaseen',
    email: 'arslan.yaseen@example.com',
    phone: '+92 308-2211443',
    stationName: 'Sahiwal Grid Hub',
    status: 'active',
    joinDate: '10/13/2024',
    avatar: 'AY'
  },
  {
    id: 33,
    name: 'Nabeel Anjum',
    email: 'nabeel.anjum@example.com',
    phone: '+92 301-7755441',
    stationName: 'Gujrat Volt Corner',
    status: 'active',
    joinDate: '08/03/2024',
    avatar: 'NA'
  },
  {
    id: 34,
    name: 'Sameer Asif',
    email: 'sameer.asif@example.com',
    phone: '+92 335-2200112',
    stationName: 'Mandi Bahauddin Charge Zone',
    status: 'active',
    joinDate: '04/18/2024',
    avatar: 'SA'
  }
];

const UserManagement: React.FC<UserManagementProps> = ({ visible }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter users based on search query
  const filteredUsers = userdata.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.stationName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Color for status chip
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return theme.palette.status.active;
      case 'inactive':
        return theme.palette.status.inactive;
      case 'pending':
        return theme.palette.status.pending;
      default:
        return '#9e9e9e'; // grey
    }
  };
  
  if (!visible) {
    return null;
  }
  
  return (
    <Box sx={{ p: 3, animation: 'fadeIn 0.3s ease-in-out' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h5" component="h1">
            User Management
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Add New User
        </Button>
      </Box>
      
      {/* Search and Filter Bar */}
      <Paper sx={{ mb: 3, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search users"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filter
          </Button>
        </Stack>
      </Paper>
      
      {/* Users Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Station Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Join Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        }}>
                          {user.avatar || getInitials(user.name)}
                        </Avatar>
                        <Typography variant="body2">{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.stationName}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        size="small" 
                        sx={{ 
                          bgcolor: `${getStatusColor(user.status)}15`,
                          color: getStatusColor(user.status),
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{formatDate(user.joinDate)}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement; 