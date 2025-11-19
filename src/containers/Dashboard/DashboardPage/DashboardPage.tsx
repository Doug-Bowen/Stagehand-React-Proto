import { FC, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Chip,
  Avatar,
  Badge,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Rating,
  Autocomplete,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Alert,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Breadcrumbs,
  Link,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Stack,
} from '@mui/material';
import {
  People,
  Assignment,
  TrendingUp,
  Notifications,
  Settings,
  Home,
  Star,
  Edit,
  Delete,
  Add,
  Share,
  Save,
  Print,
  Menu,
  ExpandMore,
  Email,
  Warning,
  Analytics,
  FileCopy,
  Timeline,
  ShoppingCart,
  Security,
  Refresh,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DashboardPage: FC = () => {
  // State for various interactive components
  const [tabValue, setTabValue] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(30);
  const [ratingValue, setRatingValue] = useState<number | null>(3);
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [toggleValue, setToggleValue] = useState('left');
  const [loading, setLoading] = useState(false);
  
  // Captcha state
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaResult, setCaptchaResult] = useState<'success' | 'error' | null>(null);

  const autocompleteOptions = ['React', 'TypeScript', 'Material-UI', 'JavaScript', 'HTML', 'CSS'];
  
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  ];

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  // Generate random captcha code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput('');
    setCaptchaResult(null);
  };

  // Verify captcha
  const verifyCaptcha = () => {
    if (captchaInput.toUpperCase() === captchaCode) {
      setCaptchaResult('success');
    } else {
      setCaptchaResult('error');
      setTimeout(() => {
        generateCaptcha();
        setCaptchaResult(null);
      }, 2000);
    }
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link color="inherit" href="/" onClick={(e) => e.preventDefault()}>
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>

      {/* Quick Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Files
                  </Typography>
                  <Typography variant="h4">
                    86
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assignment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Avg Rental Length
                  </Typography>
                  <Typography variant="h4">
                    11.2
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Days Behind
                  </Typography>
                  <Typography variant="h4">
                    0.2
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Warning />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Avg Authorized
                  </Typography>
                  <Typography variant="h4">
                    $385.21
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <Analytics />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Form Controls" icon={<Edit />} />
          <Tab label="Data Display" icon={<Timeline />} />
          <Tab label="Navigation" icon={<Menu />} />
          <Tab label="Feedback" icon={<Notifications />} />
          <Tab label="Captcha" icon={<Security />} />
        </Tabs>

        {/* Tab 1: Form Controls */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Input Controls Form" />
                <CardContent>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                    <TextField
                      fullWidth
                      label="Reference Number"
                      type="number"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      helperText="Numbers only"
                    />
                    <TextField
                      fullWidth
                      label="Comments"
                      multiline
                      rows={3}
                      placeholder="Enter your comments here"
                    />
                    <Autocomplete
                      options={autocompleteOptions}
                      value={autocompleteValue}
                      onChange={(_, newValue) => setAutocompleteValue(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} label="Technologies" />
                      )}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Selection Controls" />
                <CardContent>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>Select Option</InputLabel>
                      <Select
                        value={selectValue}
                        label="Select Option"
                        onChange={(e) => setSelectValue(e.target.value)}
                      >
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl component="fieldset">
                      <FormLabel component="legend">Radio Group</FormLabel>
                      <RadioGroup
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                      >
                        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                      </RadioGroup>
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkboxValue}
                          onChange={(e) => setCheckboxValue(e.target.checked)}
                        />
                      }
                      label="Checkbox Option"
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={switchValue}
                          onChange={(e) => setSwitchValue(e.target.checked)}
                        />
                      }
                      label="Switch Option"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Interactive Components" />
                <CardContent>
                  <Stack spacing={3}>
                    <Box>
                      <Typography gutterBottom>Slider (Value: {sliderValue})</Typography>
                      <Slider
                        value={sliderValue}
                        onChange={(_, newValue) => setSliderValue(newValue as number)}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                      />
                    </Box>

                    <Box>
                      <Typography gutterBottom>Rating</Typography>
                      <Rating
                        value={ratingValue}
                        onChange={(_, newValue) => setRatingValue(newValue)}
                      />
                    </Box>

                    <Box>
                      <Typography gutterBottom>Toggle Buttons</Typography>
                      <ToggleButtonGroup
                        value={toggleValue}
                        exclusive
                        onChange={(_, newValue) => setToggleValue(newValue)}
                      >
                        <ToggleButton value="left">Left</ToggleButton>
                        <ToggleButton value="center">Center</ToggleButton>
                        <ToggleButton value="right">Right</ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Button Groups" />
                <CardContent>
                  <Stack spacing={3}>
                    <ButtonGroup variant="contained">
                      <Button startIcon={<Add />}>Add</Button>
                      <Button startIcon={<Edit />}>Edit</Button>
                      <Button startIcon={<Delete />}>Delete</Button>
                    </ButtonGroup>

                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" color="primary">Primary</Button>
                      <Button variant="contained" color="secondary">Secondary</Button>
                      <Button variant="contained" color="success">Success</Button>
                      <Button variant="contained" color="warning">Warning</Button>
                      <Button variant="contained" color="error">Error</Button>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton color="info">
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Data Display */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Data Table" />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 1 }}>
                                  {row.name.charAt(0)}
                                </Avatar>
                                {row.name}
                              </Box>
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                              <Chip 
                                label={row.role} 
                                size="small" 
                                color={row.role === 'Admin' ? 'primary' : 'default'}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={row.status} 
                                size="small" 
                                color={row.status === 'Active' ? 'success' : 'default'}
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <Edit />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Chips & Badges" />
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography gutterBottom>Chips</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip label="React" icon={<Star />} />
                        <Chip label="TypeScript" color="primary" />
                        <Chip label="Material-UI" color="secondary" />
                        <Chip label="Deletable" onDelete={() => {}} />
                      </Stack>
                    </Box>
                    
                    <Box>
                      <Typography gutterBottom>Badges</Typography>
                      <Stack direction="row" spacing={2}>
                        <Badge badgeContent={4} color="primary">
                          <Email />
                        </Badge>
                        <Badge badgeContent={99} color="secondary">
                          <Notifications />
                        </Badge>
                        <Badge badgeContent={1} color="error">
                          <ShoppingCart />
                        </Badge>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Progress & Loading" />
                <CardContent>
                  <Stack spacing={3}>
                    <Box>
                      <Typography gutterBottom>Linear Progress</Typography>
                      <LinearProgress variant="determinate" value={sliderValue} />
                      <LinearProgress sx={{ mt: 1 }} />
                    </Box>
                    
                    <Box>
                      <Typography gutterBottom>Circular Progress</Typography>
                      <Stack direction="row" spacing={2}>
                        <CircularProgress />
                        <CircularProgress variant="determinate" value={75} />
                        <CircularProgress color="secondary" />
                      </Stack>
                    </Box>

                    <Button 
                      variant="contained" 
                      onClick={handleLoadingTest}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                    >
                      {loading ? 'Loading...' : 'Test Loading'}
                    </Button>

                    <Box>
                      <Typography gutterBottom>Skeleton Loading</Typography>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="rectangular" width="100%" height={60} />
                      <Skeleton variant="circular" width={40} height={40} />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Navigation */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Lists" />
                <CardContent>
                  <List>
                    <ListItemButton>
                      <ListItemIcon><Home /></ListItemIcon>
                      <ListItemText primary="Home" secondary="Navigate to home" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemIcon><People /></ListItemIcon>
                      <ListItemText primary="Users" secondary="Manage users" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemIcon><Settings /></ListItemIcon>
                      <ListItemText primary="Settings" secondary="Application settings" />
                    </ListItemButton>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Stepper" />
                <CardContent>
                  <Stepper activeStep={1}>
                    <Step>
                      <StepLabel>Select Campaign</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Create Ad Group</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Create Ad</StepLabel>
                    </Step>
                  </Stepper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Accordions" />
                <CardContent>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>General Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Configure general application settings and preferences.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Account Management</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Manage user accounts, permissions, and access controls.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Notifications</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Configure notification preferences and delivery methods.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 4: Feedback */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Alerts & Messages" />
                <CardContent>
                  <Stack spacing={2}>
                    <Alert severity="success">This is a success alert with an example message!</Alert>
                    <Alert severity="info">This is an info alert — check it out!</Alert>
                    <Alert severity="warning">This is a warning alert — be careful!</Alert>
                    <Alert severity="error">This is an error alert — something went wrong!</Alert>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
                  <Button onClick={() => setSnackbarOpen(true)}>Show Snackbar</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 5: Captcha */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader 
                  title="Captcha Verification" 
                  subheader="Prove you're human by entering the code below"
                />
                <CardContent>
                  <Stack spacing={3} alignItems="center">
                    {/* Captcha Display */}
                    <Paper 
                      elevation={3}
                      sx={{ 
                        p: 3, 
                        backgroundColor: '#f5f5f5',
                        border: '2px solid #ddd',
                        textAlign: 'center',
                        minHeight: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Background noise lines */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `
                            linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.1) 50%, transparent 60%),
                            linear-gradient(-45deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%)
                          `,
                          zIndex: 1
                        }}
                      />
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontFamily: 'monospace',
                          letterSpacing: 8,
                          transform: 'skew(-5deg)',
                          color: '#333',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        {captchaCode}
                      </Typography>
                    </Paper>

                    {/* Input and Controls */}
                    <TextField
                      fullWidth
                      label="Enter Captcha Code"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter the code above"
                      inputProps={{ style: { textTransform: 'uppercase' } }}
                      disabled={captchaResult === 'success'}
                      error={captchaResult === 'error'}
                      helperText={
                        captchaResult === 'success' 
                          ? 'Verification successful!' 
                          : captchaResult === 'error' 
                          ? 'Incorrect code. Try again!' 
                          : 'Enter the code exactly as shown'
                      }
                    />

                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={verifyCaptcha}
                        disabled={!captchaInput || captchaResult === 'success'}
                        color={captchaResult === 'success' ? 'success' : 'primary'}
                      >
                        {captchaResult === 'success' ? 'Verified ✓' : 'Verify'}
                      </Button>
                      
                      <Button
                        variant="outlined"
                        onClick={generateCaptcha}
                        startIcon={<Refresh />}
                        disabled={captchaResult === 'success'}
                      >
                        New Code
                      </Button>
                    </Stack>

                    {/* Success/Error Feedback */}
                    {captchaResult === 'success' && (
                      <Alert severity="success" sx={{ width: '100%' }}>
                        <strong>Captcha verified successfully!</strong> You have proven you're human.
                      </Alert>
                    )}

                    {captchaResult === 'error' && (
                      <Alert severity="error" sx={{ width: '100%' }}>
                        <strong>Verification failed!</strong> Please try again with the new code.
                      </Alert>
                    )}

                    {/* Reset Button */}
                    {captchaResult === 'success' && (
                      <Button
                        variant="text"
                        onClick={() => {
                          generateCaptcha();
                          setCaptchaResult(null);
                          setCaptchaInput('');
                        }}
                      >
                        Reset Captcha
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Info Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="About This Captcha" />
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="body1">
                      This is a makeshift captcha implementation for testing purposes.
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      <strong>Features:</strong>
                    </Typography>
                    <List dense>
                      <ListItemText 
                        primary="• 6-character alphanumeric code"
                        sx={{ py: 0 }}
                      />
                      <ListItemText 
                        primary="• Visual distortion with skewed text"
                        sx={{ py: 0 }}
                      />
                      <ListItemText 
                        primary="• Background noise pattern"
                        sx={{ py: 0 }}
                      />
                      <ListItemText 
                        primary="• Case-insensitive verification"
                        sx={{ py: 0 }}
                      />
                      <ListItemText 
                        primary="• Automatic refresh on failure"
                        sx={{ py: 0 }}
                      />
                    </List>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Current Status:</strong> {
                          captchaResult === 'success' 
                            ? '✅ Verified' 
                            : captchaResult === 'error'
                            ? '❌ Failed'
                            : '⏳ Pending'
                        }
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>

      {/* Speed Dial */}
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction icon={<FileCopy />} tooltipTitle="Copy" />
        <SpeedDialAction icon={<Save />} tooltipTitle="Save" />
        <SpeedDialAction icon={<Print />} tooltipTitle="Print" />
        <SpeedDialAction icon={<Share />} tooltipTitle="Share" />
      </SpeedDial>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Sample Dialog</DialogTitle>
        <DialogContent>
          <Typography>
            This is a sample dialog showcasing the MUI Dialog component.
            You can add forms, content, or any other elements here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          This is a snackbar message!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardPage;
