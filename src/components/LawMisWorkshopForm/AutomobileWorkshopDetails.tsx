import React, { useState, useRef } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    FormLabel,
    useTheme,
    Button,
    Input
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Helper component for labels with primary/secondary text
const FieldLabel = ({ primary, secondary }: { primary: string; secondary?: string }) => {
    const theme = useTheme();
    return (
        <Box sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2" component="label" sx={{ fontWeight: 'medium', display: 'block' }}>
                {primary}
            </Typography>
            {secondary && (
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }} display="block">
                    {secondary}
                </Typography>
            )}
        </Box>
    );
};

// Helper for Section Headers
const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    const theme = useTheme();
    return (
        <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100], p: 1.5, mb: 2, borderRadius: 1 }}>
             <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                 {title} 
                 {subtitle && <Typography variant="body2" component="span" sx={{ color: theme.palette.text.secondary, ml: 1 }}>({subtitle})</Typography>}
            </Typography>
         </Box>
    );
}

// Helper for File Upload Box
const FileUploadBox = (
    { id, label, secondaryLabel, fileSizeNote, selectedFileName, onChange }: 
    { id: string; label: string; secondaryLabel?: string; fileSizeNote?: string; selectedFileName: string | null; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; }
) => {
    const theme = useTheme();
    return (
        <Box>
            <FieldLabel primary={label} secondary={secondaryLabel} />
             {fileSizeNote && <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary, mb: 1 }}>{fileSizeNote}</Typography>}
            <Box
                component="label"
                htmlFor={id}
                sx={{
                    border: '2px dashed',
                    borderColor: 'grey.400',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'block',
                    mb: 1,
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover'
                    }
                }}
             >
                <UploadFileIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium', mt: 1 }}>
                    CLICK TO SELECT FILES HERE
                </Typography>
                 <Typography variant="caption" display="block" color="text.secondary">
                     یہاں فائل منتخب کرنے کے لئے کلک کریں
                </Typography>
                 <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, fontSize: '0.65rem' }}>
                    SELECT FILES FROM YOUR SYSTEM OR SCAN THEM FOR UPLOAD
                </Typography>
                 <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                    اپنے سسٹم سے فائلیں منتخب کریں یا انہیں اپ لوڈ کرنے کے لیے اسکین کریں
                </Typography>
             </Box>
             <Input 
                id={id} 
                type="file" 
                sx={{ display: 'none' }} 
                onChange={onChange}
                // Consider adding accept attribute e.g., accept="image/*,.pdf"
             />
             {selectedFileName && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center' }}>
                    Selected: {selectedFileName}
                </Typography>
            )}
        </Box>
    );
};

const AutomobileWorkshopDetails: React.FC = () => {
    const theme = useTheme();
    const [applicationType, setApplicationType] = useState('new');
    const [workshopName, setWorkshopName] = useState('');
    const [workshopAddress, setWorkshopAddress] = useState('');
    const [mobile1, setMobile1] = useState('03');
    const [mobile2, setMobile2] = useState('03');
    const [email, setEmail] = useState('');
    const [kanal, setKanal] = useState('');
    const [marla, setMarla] = useState('');

    // --- New States for additional fields ---
    const [dedicatedArea, setDedicatedArea] = useState('No');
    const [carParking, setCarParking] = useState('No');
    const [itRoom, setItRoom] = useState('No');
    const [publicToilets, setPublicToilets] = useState('No');
    const [waitingArea, setWaitingArea] = useState('No');
    const [inspectionLanes, setInspectionLanes] = useState('');
    const [landOwnership, setLandOwnership] = useState('');
    const [workshopAreaType, setWorkshopAreaType] = useState('');
    const [district, setDistrict] = useState('');

    // --- New States for File Uploads ---
    const [buildingPlan, setBuildingPlan] = useState<File | null>(null);
    const [frontPicture, setFrontPicture] = useState<File | null>(null);
    const [rightPicture, setRightPicture] = useState<File | null>(null);

    const handleMobileChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        if (value.startsWith('03') && /^[0-9]*$/.test(value)) {
            setter(value);
        } else if (value === '0' || value === '3') {
            setter(value);
        } else if (value === '') {
            setter('03');
        }
    };

    // Helper for Yes/No Radio Groups
    const YesNoRadio = (
        { label, secondaryLabel, value, onChange }: 
        { label: string; secondaryLabel?: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; } 
    ) => (
        <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FieldLabel primary={label} secondary={secondaryLabel} />
            <RadioGroup row value={value} onChange={onChange} name={label.toLowerCase().replace(/ /g, '-')}>
                <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" sx={{ mr: 2 }}/>
                <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
            </RadioGroup>
        </FormControl>
    );

    // --- Handle File Change ---
    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            // TODO: Add file size validation (e.g., 4MB)
            setter(event.target.files[0]);
        } else {
            setter(null);
        }
        // Clear the input value so the same file can be selected again if needed
        event.target.value = ''; 
    };

    return (
        <Box sx={{ p: 0 }}>
            {/* --- Type of Application --- */}
            <SectionHeader title="TYPE OF APPLICATION" subtitle="درخواست کی نوعیت" />
            <FormControl component="fieldset" sx={{ mb: 3, ml: 1.5 }}>
                <RadioGroup
                    aria-label="type of application"
                    name="applicationType"
                    value={applicationType}
                    onChange={(e) => setApplicationType(e.target.value)}
                >
                    <FormControlLabel 
                        value="new" 
                        control={<Radio size="small" />} 
                        label={<>APPLY FOR NEW LICENCE <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>(نئے لائسنس کے لیے درخواست دیں)</Typography></>}
                        sx={{ mb: 1 }} // Stack vertically
                    />
                    <FormControlLabel 
                        value="renewal" 
                        control={<Radio size="small" />} 
                        label={<>APPLY FOR LICENCE RENEWAL <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>(لائسنس کی تجدید کے لیے درخواست دیں)</Typography></>}
                    />
                </RadioGroup>
            </FormControl>

            {/* --- Workshop Details Section --- */}
             <SectionHeader title="AUTOMOBILE WORKSHOP DETAILS" subtitle="آٹو موبائل ورکشاپ کی تفصیلات" />

            <Grid container spacing={2.5} sx={{ px: 1.5 }}>
                {/* Row 1 */}
                <Grid xs={12} sm={6} md={6} lg={6}>
                    <FieldLabel primary="AUTOMOBILE WORKSHOP FULL NAME" secondary="آٹو موبائل ورکشاپ کا پورا نام" />
                    <TextField
                        fullWidth
                        placeholder="ENTER WORKSHOP FULLNAME"
                        size="small"
                        value={workshopName}
                        onChange={(e) => setWorkshopName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6}>
                    <FieldLabel primary="AUTOMOBILE WORKSHOP COMPLETE ADDRESS" secondary="آٹو موبائل ورکشاپ کا مکمل پتہ" />
                    <TextField
                        fullWidth
                        placeholder="ENTER WORKSHOP COMPLETE ADDRESS"
                        size="small"
                        value={workshopAddress}
                        onChange={(e) => setWorkshopAddress(e.target.value)}
                        required
                    />
                </Grid>

                {/* Row 2 */}
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <FieldLabel primary="WORKSHOP MOBILE NUMBER" secondary="ورکشاپ موبائل نمبر" />
                    <TextField
                        fullWidth
                        placeholder="03XXXXXXXXX"
                        size="small"
                        value={mobile1}
                        onChange={(e) => handleMobileChange(setMobile1, e.target.value)}
                        inputProps={{ maxLength: 11 }}
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6}>
                    <FieldLabel primary="WORKSHOP MOBILE NUMBER (OPTIONAL)" secondary="ورکشاپ موبائل نمبر" />
                    <TextField
                        fullWidth
                        placeholder="03XXXXXXXXX"
                        size="small"
                        value={mobile2}
                        onChange={(e) => handleMobileChange(setMobile2, e.target.value)}
                        inputProps={{ maxLength: 11 }}
                    />
                </Grid>

                {/* Row 3 */}
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <FieldLabel primary="WORKSHOP EMAIL ADDRESS" secondary="ای میل ایڈریس" />
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="ENTER EMAIL ADDRESS"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6}>
                    <FieldLabel primary="AUTOMOBILE WORKSHOP TOTAL AREA (KANAL / MARLA)" secondary="آٹو موبائل ورکشاپ کا کل رقبہ" />
                     <Grid container spacing={1} alignItems="center">
                        <Grid xs={5}>
                            <FormControl fullWidth size="small" required>
                                <InputLabel id="kanal-select-label">Kanal</InputLabel>
                                <Select
                                    labelId="kanal-select-label"
                                    label="Kanal"
                                    value={kanal}
                                    onChange={(e) => setKanal(e.target.value)}
                                >
                                    <MenuItem value=""><em>Choose...</em></MenuItem>
                                    {[...Array(20).keys()].map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                         <Grid xs={2} sx={{ textAlign: 'center' }}>
                            <Typography variant="body1">/</Typography>
                        </Grid>
                        <Grid xs={5}>
                            <FormControl fullWidth size="small" required>
                                <InputLabel id="marla-select-label">Marla</InputLabel>
                                <Select
                                    labelId="marla-select-label"
                                    label="Marla"
                                    value={marla}
                                    onChange={(e) => setMarla(e.target.value)}
                                >
                                    <MenuItem value=""><em>Choose...</em></MenuItem>
                                    {[...Array(20).keys()].map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                {/* --- New Facility Fields --- */ }
                 <Grid xs={12}><Divider sx={{ my: 1 }} /></Grid> {/* Separator */}
                 
                {/* Row 4: Facility Yes/No */}
                 <Grid xs={12} sm={6} md={6} lg={6}>
                     <YesNoRadio
                        label="IS AREA DEDICATED FOR INSPECTION OF MOTOR CARS ?"
                        secondaryLabel="کیا موٹر کاروں کی جانچ کے لیے جگہ موجود ہیں؟"
                        value={dedicatedArea}
                        onChange={(e) => setDedicatedArea(e.target.value)}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <YesNoRadio
                        label="IS CAR PARKING AVAILABLE ?"
                        secondaryLabel="کیا گاڑی پارک کرنے کی جگہ دستیاب ہے؟"
                        value={carParking}
                        onChange={(e) => setCarParking(e.target.value)}
                    />
                </Grid>
                
                {/* Row 5: Facility Yes/No */}
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <YesNoRadio
                        label="IT ROOM FACILITY AVAILABLE ?"
                        secondaryLabel="کیا آئی ٹی کی سہولت دستیاب ہے؟"
                        value={itRoom}
                        onChange={(e) => setItRoom(e.target.value)}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <YesNoRadio
                        label="ARE PUBLIC TOILETS AVAILABLE ?"
                        secondaryLabel="کیا عوامی بیت الخلاء دستیاب ہے؟"
                        value={publicToilets}
                        onChange={(e) => setPublicToilets(e.target.value)}
                    />
                </Grid>

                {/* Row 6: Facility Yes/No / Inspection Lanes */}
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <YesNoRadio
                        label="IS CUSTOMER WAITING AREA AVAILABLE ?"
                        secondaryLabel="کیا صار فین کے انتظار کی جگہ دستیاب ہے؟"
                        value={waitingArea}
                        onChange={(e) => setWaitingArea(e.target.value)}
                    />
                </Grid>
                 <Grid xs={12} sm={6} md={6} lg={6}>
                     <FieldLabel primary="NUMBER OF INSPECTION LANES ESTABLISHED AT AUTOMOBILE WORKSHOP FOR INSPECTION OF MOTOR CARS" secondary="موٹر کاروں کے معائنے کے لئے آٹو موبائل ورکشاپ میں قائم معائنہ لائنوں کی تعداد" />
                    <FormControl fullWidth size="small" required>
                        <InputLabel id="inspection-lanes-label">Choose...</InputLabel>
                        <Select
                            labelId="inspection-lanes-label"
                            label="Choose..."
                            value={inspectionLanes}
                            onChange={(e) => setInspectionLanes(e.target.value)}
                        >
                            <MenuItem value=""><em>Choose...</em></MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4+</MenuItem> 
                        </Select>
                    </FormControl>
                </Grid>

                 {/* Row 7: Ownership / Area Type */}
                 <Grid xs={12} sm={6} md={6} lg={6}>
                     <FieldLabel primary="OWNERSHIP STATUS OF LAND ON WHICH VEHICLE INSPECTION STATION / CENTRE IS ESTABLISHED" secondary="زمین کی ملکیت کی حیثیت جس پر وہیکل انسپکشن اسٹیشن / سینٹر قائم کیا گیا ہے" />
                    <FormControl fullWidth size="small" required>
                        <InputLabel id="land-ownership-label">Select Land Type...</InputLabel>
                        <Select
                            labelId="land-ownership-label"
                            label="Select Land Type..."
                            value={landOwnership}
                            onChange={(e) => setLandOwnership(e.target.value)}
                        >
                            <MenuItem value=""><em>--SELECT LAND TYPE--</em></MenuItem>
                            <MenuItem value="owned">Owned</MenuItem>
                            <MenuItem value="rented">Rented/Leased</MenuItem>
                            {/* Add other options if needed */}
                        </Select>
                    </FormControl>
                </Grid>
                 <Grid xs={12} sm={6} md={6} lg={6}>
                     <FieldLabel primary="WORKSHOP AREA TYPE" secondary="ورکشاپ ایریا کی قسم" />
                    <FormControl fullWidth size="small" required>
                        <InputLabel id="area-type-label">Select Option</InputLabel>
                        <Select
                            labelId="area-type-label"
                            label="Select Option"
                            value={workshopAreaType}
                            onChange={(e) => setWorkshopAreaType(e.target.value)}
                        >
                             <MenuItem value=""><em>SELECT OPTION</em></MenuItem>
                            <MenuItem value="commercial">Commercial</MenuItem>
                            <MenuItem value="industrial">Industrial</MenuItem>
                            <MenuItem value="residential">Residential (Verify if allowed)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Row 8: District */}
                <Grid xs={12} sm={6} md={6} lg={6}>
                     <FieldLabel primary="DISTRICT" secondary="ضلع" />
                    <FormControl fullWidth size="small" required>
                        <InputLabel id="district-label">Select District...</InputLabel>
                        <Select
                            labelId="district-label"
                            label="Select District..."
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        >
                             <MenuItem value=""><em>--SELECT DISTRICT--</em></MenuItem>
                             {/* Add actual district options here */}
                            <MenuItem value="lahore">Lahore</MenuItem>
                            <MenuItem value="rawalpindi">Rawalpindi</MenuItem>
                            <MenuItem value="faisalabad">Faisalabad</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* Empty Grid item to maintain 2-column layout for the last row */}
                <Grid xs={12} sm={6} md={6} lg={6} />

            </Grid> {/* End of main details Grid container */}

            {/* --- File Upload Section --- */}
            {/* Add a new Grid container for this section */}
            <Grid container spacing={2.5} sx={{ px: 1.5, mt: 3 }}> {/* Added container with spacing/padding */}
                <Grid xs={12}><Divider /></Grid> {/* Removed my:3 from Divider, handled by container mt */}

                {/* Row 9: Building Plan Upload (Full Width) */}
                <Grid xs={12}>
                     <FileUploadBox
                        id="building-plan-upload"
                        label="APPROVED BUILDING PLAN FROM RELEVANT AUTHORITY"
                        secondaryLabel="متعلقہ اتھارٹی کی طرف سے تصدیق شدہ بلڈنگ پلان"
                        fileSizeNote="Max Picture size to be 4MB"
                        selectedFileName={buildingPlan?.name || null}
                        onChange={handleFileChange(setBuildingPlan)}
                     />
                </Grid>

                 {/* Row 10: Workshop Pictures Title (Full Width) */}
                <Grid xs={12} sx={{ mt: 2 }}>
                    <SectionHeader title="ADD PICTURES OF THE WORKSHOP" subtitle="ورکشاپ کی تصاویر" />
                </Grid>

                {/* Row 11: Workshop Picture Uploads (Attempting 3 columns on wider screens) */}
                <Grid xs={12} sm={6} md={4}>
                     <FileUploadBox
                        id="front-pic-upload"
                        label="FRONTSIDE PICTURE OF THE WORKSHOP"
                        secondaryLabel="ورکشاپ کی سامنے کی تصویر"
                        fileSizeNote="Max File size to be 4MB"
                        selectedFileName={frontPicture?.name || null}
                        onChange={handleFileChange(setFrontPicture)}
                     />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <FileUploadBox
                        id="front-side-pic-upload" // Assuming this is distinct or maybe just "Side Picture"?
                        label="FRONT SIDE PICTURE OF WORKSHOP" // Adjust label if needed
                        secondaryLabel="ورکشاپ کی سامنے والی تصویر"
                        fileSizeNote="Max File size to be 4MB"
                        selectedFileName={null} // Add state for this if it's separate: e.g., frontSidePicture
                        onChange={() => {}} // Add handler: e.g., handleFileChange(setFrontSidePicture)
                     />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <FileUploadBox
                        id="right-pic-upload"
                        label="RIGHT SIDE PICTURE OF THE WORKSHOP"
                        secondaryLabel="ورکشاپ کی دائیں طرف کی تصویر"
                        fileSizeNote="Max File size to be 4MB"
                        selectedFileName={rightPicture?.name || null}
                        onChange={handleFileChange(setRightPicture)}
                     />
                </Grid>
            </Grid> {/* End of File Upload Grid container */}

        </Box>
    );
};

export default AutomobileWorkshopDetails; 