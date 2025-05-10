import React, { useState, useRef } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Avatar,
    Grid,
    IconButton,
    Divider,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // For potential back button
import UploadFileIcon from '@mui/icons-material/UploadFile'; // <-- Import UploadFileIcon

// Placeholder data - replace with actual user data later
const userProfileData = {
    name: 'muhammad ahmed bilal dar',
    username: '35201-3846859-1', // Assuming username is CNIC
    fatherName: 'BILAL AZIZ DAR',
    cnicNtn: '35201-3846859-1',
    completeAddress: '-', // Placeholder
    email: 'mahmeddar2000@gmail.com',
    mobile1: '0333-4852047',
    mobile2: '-', // Placeholder
    landline: '-', // Placeholder
    profilePicUrl: '', // Placeholder or path to default image
    cnicFrontUrl: '', // Placeholder
    cnicBackUrl: '', // Placeholder
};

// Define props interface
interface LAW_MISUserProfileProps {
    onGoBack?: () => void; // Optional prop to handle going back
}

const LAW_MISUserProfile: React.FC<LAW_MISUserProfileProps> = ({ onGoBack }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Refs for file inputs
    const cnicFrontInputRef = useRef<HTMLInputElement>(null);
    const cnicBackInputRef = useRef<HTMLInputElement>(null);
    const pictureInputRef = useRef<HTMLInputElement>(null);

    // --- Edit Dialog Handlers ---
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleCloseEditDialog = () => {
        setIsEditing(false);
    };
    const handleSaveProfile = () => {
        console.log("Save profile clicked");
        // TODO: Implement actual save logic (API call, state update)
        handleCloseEditDialog();
    };

    // Placeholder file change handlers
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (event.target.files && event.target.files[0]) {
            console.log(`Selected file for ${fieldName}:`, event.target.files[0].name);
            // TODO: Add state management and upload logic here
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Optional Back Button - Removed */}
            {/* {onGoBack && (
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={onGoBack} 
                    sx={{ mb: 2 }}
                >
                    Back to Dashboard
                </Button>
            )} */}

            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                USER PROFILE 
                 {/* Optional Urdu Title */}
                {/* <span style={{ opacity: 0.7, marginLeft: '8px' }}>یوزر پروفائل</span> */}
            </Typography>

            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
                {/* --- Basic Detail Section --- */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                        BASIC DETAIL 
                         {/* Optional Urdu */}
                         {/* <span style={{ opacity: 0.7, marginLeft: '8px' }}>بنیادی معلومات</span> */}
                    </Typography>
                    <IconButton aria-label="edit profile" onClick={handleEdit} color="primary">
                        <EditIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar 
                            alt={userProfileData.name}
                            src={userProfileData.profilePicUrl || undefined} // Use || undefined to avoid rendering broken img tag
                            sx={{ width: 150, height: 150, bgcolor: 'grey.300' }} 
                        >
                            {/* Fallback if no src */}
                             {!userProfileData.profilePicUrl && userProfileData.name.charAt(0).toUpperCase()} 
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={9} container direction="column" justifyContent="center">
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {userProfileData.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            USERNAME: {userProfileData.username}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ mb: 3 }} />

                {/* --- Info Table --- */}
                <TableContainer>
                    <Table aria-label="user details table" size="small">
                        <TableBody>
                            {/* Create an array of data points for easier mapping */}
                            {[
                                { label: "FATHER'S NAME", value: userProfileData.fatherName },
                                { label: "CNIC # / NTN #", value: userProfileData.cnicNtn },
                                { label: "COMPLETE ADDRESS", value: userProfileData.completeAddress },
                                { label: "EMAIL ADDRESS", value: userProfileData.email },
                                { label: "MOBILE NUMBER 1", value: userProfileData.mobile1 },
                                { label: "MOBILE NUMBER 2", value: userProfileData.mobile2 },
                                { label: "LANDLINE NUMBER", value: userProfileData.landline },
                            ].map((row) => (
                                <TableRow 
                                    key={row.label} 
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none', width: '30%', color: 'text.secondary', py: 1.5 }}>
                                        {row.label}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: 'none', fontWeight: 'medium' }}>{row.value || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                 <Divider sx={{ my: 4 }} /> 

                {/* --- Attachments Section --- Divider is now above this section */}
                <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
                    ATTACHMENTS 
                    {/* <span style={{ opacity: 0.7, marginLeft: '8px' }}>منسلک دستاویزات</span> */}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                         <Typography variant="subtitle1" gutterBottom>
                             CNIC / NTN - FRONT 
                             {/* <span style={{ opacity: 0.7, marginLeft: '8px' }}>قومی شناختی کارڈ/این۔ٹی۔این - سامنے</span> */}
                         </Typography>
                         <Box 
                             component="img"
                             sx={{ 
                                 height: 150, 
                                 width: '100%', 
                                 maxHeight: { xs: 150, md: 150 },
                                 maxWidth: { xs: 250, md: 250 },
                                 objectFit: 'contain',
                                 border: '1px solid',
                                 borderColor: 'divider',
                                 borderRadius: 1,
                                 bgcolor: 'grey.100',
                             }}
                             alt="CNIC Front Placeholder"
                             src={userProfileData.cnicFrontUrl || undefined}
                         />
                    </Grid>
                     <Grid item xs={12} sm={6}>
                         <Typography variant="subtitle1" gutterBottom>
                             CNIC / NTN - BACK 
                             {/* <span style={{ opacity: 0.7, marginLeft: '8px' }}>قومی شناختی کارڈ/این۔ٹی۔این - پشت</span> */}
                         </Typography>
                         <Box 
                             component="img"
                             sx={{ 
                                 height: 150, 
                                 width: '100%', 
                                 maxHeight: { xs: 150, md: 150 },
                                 maxWidth: { xs: 250, md: 250 },
                                 objectFit: 'contain',
                                 border: '1px solid',
                                 borderColor: 'divider',
                                 borderRadius: 1,
                                 bgcolor: 'grey.100',
                             }}
                             alt="CNIC Back Placeholder"
                             src={userProfileData.cnicBackUrl || undefined}
                         />
                    </Grid>
                </Grid>
            </Paper>

             {/* --- Edit Profile Dialog --- */}
            <Dialog 
                open={isEditing} 
                onClose={handleCloseEditDialog} 
                fullWidth
                maxWidth="md" // Adjust width as needed
            >
                <DialogTitle>
                    EDIT PROFILE 
                    {/* <span style={{ opacity: 0.7, marginLeft: '8px' }}>پروفائل میں ترمیم کریں</span> */}
                </DialogTitle>
                <DialogContent>
                     {/* --- Refactored to use Table for form layout --- */}
                     <TableContainer component={Paper} elevation={0}> {/* Use Paper for layout consistency, remove shadow */}
                        <Table sx={{ minWidth: 650 }} aria-label="edit profile table" size="small">
                            <TableBody>
                                 {/* Row 1: CNIC / Applicant Name */}
                                <TableRow>
                                     <TableCell sx={{ width: '25%', borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">CNIC NUMBER</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>قومی شناختی کارڈ نمبر</Typography>
                                     </TableCell>
                                    <TableCell sx={{ width: '25%', borderBottom: 'none' }}>
                                         <TextField 
                                            fullWidth 
                                            value={userProfileData.cnicNtn || ''} 
                                            InputProps={{ readOnly: true }}
                                            variant="outlined" // Standard outlined variant for forms
                                            size="small"
                                        />
                                    </TableCell>
                                     <TableCell sx={{ width: '25%', borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">APPLICANT'S NAME</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>درخواست گزار کا نام</Typography>
                                     </TableCell>
                                    <TableCell sx={{ width: '25%', borderBottom: 'none' }}>
                                         <TextField 
                                            fullWidth 
                                            value={userProfileData.name || ''} 
                                            InputProps={{ readOnly: true }} 
                                            variant="outlined"
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>

                                 {/* Row 2: Father's Name / Division */}
                                 <TableRow>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">FATHER'S NAME</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>والد کا نام</Typography>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                          <TextField 
                                            fullWidth 
                                            value={userProfileData.fatherName || ''} 
                                            InputProps={{ readOnly: true }} 
                                            variant="outlined"
                                            size="small"
                                        />
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">DIVISION</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>ڈویژن</Typography>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                        <FormControl fullWidth size="small">
                                            {/* <InputLabel id="division-select-label">Select Division</InputLabel> */}
                                            <Select
                                                labelId="division-select-label"
                                                defaultValue=""
                                                displayEmpty // Allow placeholder to show
                                                // label="Select Division" // Removed label to mimic image
                                            >
                                                <MenuItem value=""><em>--SELECT DIVISION--</em></MenuItem>
                                                <MenuItem value={10}>Division 1</MenuItem>
                                                <MenuItem value={20}>Division 2</MenuItem>
                                            </Select>
                                        </FormControl>
                                     </TableCell>
                                 </TableRow>

                                  {/* Row 3: District / Tehsil */}
                                 <TableRow>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">DISTRICT</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>ضلع</Typography>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                        <FormControl fullWidth size="small">
                                            {/* <InputLabel id="district-select-label">Select District</InputLabel> */}
                                            <Select
                                                labelId="district-select-label"
                                                defaultValue=""
                                                displayEmpty
                                                // label="Select District"
                                            >
                                                 <MenuItem value=""><em>--SELECT DISTRICT--</em></MenuItem>
                                                 <MenuItem value={10}>District A</MenuItem>
                                                <MenuItem value={20}>District B</MenuItem>
                                            </Select>
                                         </FormControl>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">TEHSIL</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>تحصیل</Typography>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                        <FormControl fullWidth size="small">
                                            {/* <InputLabel id="tehsil-select-label">Select Tehsil</InputLabel> */}
                                            <Select
                                                labelId="tehsil-select-label"
                                                defaultValue=""
                                                displayEmpty
                                                // label="Select Tehsil"
                                            >
                                                 <MenuItem value=""><em>--SELECT TEHSIL--</em></MenuItem>
                                                  <MenuItem value={10}>Tehsil X</MenuItem>
                                                 <MenuItem value={20}>Tehsil Y</MenuItem>
                                            </Select>
                                         </FormControl>
                                     </TableCell>
                                 </TableRow>

                                  {/* Row 4: Address / Email */}
                                 <TableRow>
                                      <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">ADDRESS</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>پتہ</Typography>
                                     </TableCell>
                                      <TableCell sx={{ borderBottom: 'none' }}>
                                           <TextField 
                                            fullWidth 
                                            placeholder="ENTER ADDRESS"
                                            size="small"
                                            // value / onChange for state needed
                                        />
                                      </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">EMAIL ADDRESS</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>ای میل ایڈریس</Typography>
                                     </TableCell>
                                      <TableCell sx={{ borderBottom: 'none' }}>
                                          <TextField 
                                            fullWidth 
                                            value={userProfileData.email || ''} 
                                            InputProps={{ readOnly: true }} 
                                            variant="outlined"
                                            size="small"
                                        />
                                      </TableCell>
                                 </TableRow>

                                  {/* Row 5: Mobile 1 / Mobile 2 */}
                                 <TableRow>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <Typography variant="subtitle2" color="text.secondary">MOBILE NUMBER 1</Typography>
                                         <Typography variant="caption" display="block" gutterBottom>موبائل نمبر ١</Typography>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                         <TextField 
                                            fullWidth 
                                            value={userProfileData.mobile1 || ''} 
                                            InputProps={{ readOnly: true }} 
                                            variant="outlined"
                                            size="small"
                                        />
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                          <Typography variant="subtitle2" color="text.secondary">MOBILE NUMBER 2</Typography>
                                          <Typography variant="caption" display="block" gutterBottom>موبائل نمبر ٢</Typography>
                                     </TableCell>
                                     <TableCell sx={{ borderBottom: 'none' }}>
                                          <TextField 
                                            fullWidth 
                                            placeholder="ENTER MOBILE NUMBER"
                                            size="small"
                                            // value / onChange for state needed
                                        />
                                     </TableCell>
                                 </TableRow>

                                  {/* Row 6: Landline */}
                                  <TableRow>
                                      <TableCell sx={{ borderBottom: 'none' }}>
                                          <Typography variant="subtitle2" color="text.secondary">LANDLINE NUMBER</Typography>
                                          <Typography variant="caption" display="block" gutterBottom>لینڈ لائن نمبر</Typography>
                                      </TableCell>
                                      <TableCell sx={{ borderBottom: 'none' }}>
                                           <TextField 
                                            fullWidth 
                                            placeholder="ENTER LANDLINE NUMBER"
                                            size="small"
                                            // value / onChange for state needed
                                        />
                                      </TableCell>
                                      {/* Empty cells for alignment if needed */}
                                      <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                                      <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                                  </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    {/* --- File Upload Section --- */}
                    <Divider sx={{ my: 3 }} />
                     <Grid container spacing={3}>
                         {/* CNIC Front Upload */}
                         <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" gutterBottom>
                                ATTACH COPY OF CNIC FRONT 
                                {/* (Urdu) */} 
                             </Typography>
                             <Box
                                component="label" // Act as label for hidden input
                                htmlFor="cnic-front-upload"
                                sx={{
                                    border: '2px dashed',
                                    borderColor: 'grey.400',
                                    borderRadius: 1,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    display: 'block',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'action.hover'
                                    }
                                }}
                             >
                                <UploadFileIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                                <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 1 }}>
                                    CLICK TO SELECT FILES HERE
                                </Typography>
                                 <Typography variant="caption" display="block" color="text.secondary">
                                     یہاں فائل منتخب کرنے کے لئے کلک کریں
                                </Typography>
                                 <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                                    SELECT FILES FROM YOUR SYSTEM OR SCAN THEM FOR UPLOAD
                                </Typography>
                                 <Typography variant="caption" display="block" color="text.secondary">
                                    اپنے سسٹم سے فائلیں منتخب کریں یا انہیں اپ لوڈ کرنے کے لیے اسکین کریں
                                </Typography>
                             </Box>
                             <Input 
                                id="cnic-front-upload" 
                                type="file" 
                                sx={{ display: 'none' }} 
                                inputRef={cnicFrontInputRef} // Optional ref
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'cnicFront')}
                             />
                         </Grid>

                         {/* CNIC Back Upload */}
                         <Grid item xs={12} md={4}>
                             <Typography variant="subtitle2" gutterBottom>
                                ATTACH COPY OF CNIC BACK 
                                {/* (Urdu) */} 
                             </Typography>
                            <Box
                                component="label"
                                htmlFor="cnic-back-upload"
                                sx={{ /* ... same styles as above ... */ 
                                    border: '2px dashed',
                                    borderColor: 'grey.400',
                                    borderRadius: 1,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    display: 'block',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'action.hover'
                                    }
                                }}
                             >
                                 <UploadFileIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                                 <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 1 }}>
                                     CLICK TO SELECT FILES HERE
                                 </Typography>
                                 <Typography variant="caption" display="block" color="text.secondary">
                                      یہاں فائل منتخب کرنے کے لئے کلک کریں
                                 </Typography>
                                 <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                                     SELECT FILES FROM YOUR SYSTEM OR SCAN THEM FOR UPLOAD
                                 </Typography>
                                  <Typography variant="caption" display="block" color="text.secondary">
                                     اپنے سسٹم سے فائلیں منتخب کریں یا انہیں اپ لوڈ کرنے کے لیے اسکین کریں
                                 </Typography>
                             </Box>
                             <Input 
                                id="cnic-back-upload" 
                                type="file" 
                                sx={{ display: 'none' }} 
                                inputRef={cnicBackInputRef}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'cnicBack')}
                            />
                         </Grid>

                         {/* Picture Upload */}
                         <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" gutterBottom>
                                PICTURE 
                                {/* (Urdu) */} 
                             </Typography>
                             <Box
                                component="label"
                                htmlFor="picture-upload"
                                sx={{ /* ... same styles as above ... */ 
                                    border: '2px dashed',
                                    borderColor: 'grey.400',
                                    borderRadius: 1,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    display: 'block',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'action.hover'
                                    }
                                }}
                             >
                                 <UploadFileIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                                 <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 1 }}>
                                     CLICK TO SELECT FILES HERE
                                 </Typography>
                                 <Typography variant="caption" display="block" color="text.secondary">
                                      یہاں فائل منتخب کرنے کے لئے کلک کریں
                                 </Typography>
                                  <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                                     SELECT FILES FROM YOUR SYSTEM OR SCAN THEM FOR UPLOAD
                                 </Typography>
                                  <Typography variant="caption" display="block" color="text.secondary">
                                     اپنے سسٹم سے فائلیں منتخب کریں یا انہیں اپ لوڈ کرنے کے لیے اسکین کریں
                                 </Typography>
                             </Box>
                              <Input 
                                id="picture-upload" 
                                type="file" 
                                sx={{ display: 'none' }} 
                                inputRef={pictureInputRef}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'picture')}
                             />
                         </Grid>
                     </Grid>

                </DialogContent>
                 <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSaveProfile} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default LAW_MISUserProfile; 