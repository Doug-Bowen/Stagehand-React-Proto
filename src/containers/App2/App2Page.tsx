import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Alert,
  Autocomplete,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  DarkMode,
  Code,
  DataObject,
  Security,
  Analytics,
  Person,
  Email,
  Refresh,
  CheckCircle,
  TrendingUp,
  Speed,
  Assignment
} from '@mui/icons-material';

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      light: '#e7b9ff',
      dark: '#8858c8'
    },
    secondary: {
      main: '#03dac6',
      light: '#5ddef9',
      dark: '#00a895'
    },
    background: {
      default: '#0d1117',
      paper: '#161b22'
    },
    text: {
      primary: '#f0f6fc',
      secondary: '#8b949e'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.015em'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#161b22',
          border: '1px solid #30363d'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 12
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0d1117',
            '& fieldset': {
              borderColor: '#30363d'
            },
            '&:hover fieldset': {
              borderColor: '#bb86fc'
            }
          }
        }
      }
    }
  }
});

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
      id={`app2-tabpanel-${index}`}
      aria-labelledby={`app2-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const App2Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    referenceNumber: '',
    comments: '',
    technologies: null as string | null
  });
  
  // Captcha state
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Tech options for autocomplete
  const techOptions = [
    'React',
    'TypeScript',
    'Material-UI',
    'Next.js',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    'Java',
    'C#'
  ];

  // Sample data for table (matching test requirements)
  const tableData = [
    { id: 1, firstName: 'John', lastName: 'Doe', department: 'Engineering', status: 'Active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', department: 'Design', status: 'Active' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', department: 'Marketing', status: 'Inactive' },
    { id: 4, firstName: 'Alice', lastName: 'Brown', department: 'Sales', status: 'Active' }
  ];

  // Stats data
  const statsData = [
    { label: 'Total Files', value: 86, icon: Assignment, color: '#bb86fc' },
    { label: 'Active Users', value: 142, icon: Person, color: '#03dac6' },
    { label: 'Success Rate', value: '98.5%', icon: TrendingUp, color: '#4caf50' },
    { label: 'Response Time', value: '2.1s', icon: Speed, color: '#ff9800' }
  ];

  // Generate captcha code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput('');
    setCaptchaVerified(false);
    setCaptchaError(false);
  };

  // Verify captcha
  const verifyCaptcha = () => {
    if (captchaInput.toUpperCase() === captchaCode) {
      setCaptchaVerified(true);
      setCaptchaError(false);
      setShowSuccessDialog(true);
    } else {
      setCaptchaError(true);
      setTimeout(() => {
        generateCaptcha();
        setCaptchaError(false);
      }, 2000);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Initialize captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#0d1117',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(187, 134, 252, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(3, 218, 198, 0.1) 0%, transparent 50%)
        `
      }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header Section */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <DarkMode sx={{ fontSize: 40, mr: 2, color: '#bb86fc' }} />
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                Nexus Dashboard
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary">
              Advanced Analytics & Management Platform
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #161b22 0%, #21262d 100%)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 25px rgba(187, 134, 252, 0.2)`
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography color="text.secondary" variant="body2" gutterBottom>
                          {stat.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </Box>
                      <Avatar sx={{ 
                        bgcolor: `${stat.color}20`, 
                        border: `2px solid ${stat.color}40`,
                        width: 56, 
                        height: 56 
                      }}>
                        <stat.icon sx={{ color: stat.color, fontSize: 28 }} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Main Content Tabs */}
          <Paper sx={{ 
            mb: 4,
            background: 'linear-gradient(135deg, #161b22 0%, #21262d 100%)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              background: 'linear-gradient(90deg, #bb86fc 0%, #03dac6 100%)',
              p: 1
            }}>
              <Tabs 
                value={activeTab} 
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem'
                  },
                  '& .Mui-selected': {
                    color: 'white !important'
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'white',
                    height: 3
                  }
                }}
              >
                <Tab label="Form Controls" icon={<Code />} />
                <Tab label="Data Display" icon={<DataObject />} />
                <Tab label="Security" icon={<Security />} />
              </Tabs>
            </Box>

            {/* Tab 1: Form Controls */}
            <TabPanel value={activeTab} index={0}>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                  <Card>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: '#bb86fc',
                        mb: 3
                      }}>
                        <Person sx={{ mr: 2 }} />
                        Input Controls Form
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange('firstName')}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange('lastName')}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Reference Number"
                            value={formData.referenceNumber}
                            onChange={handleInputChange('referenceNumber')}
                            type="number"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            value={formData.technologies}
                            onChange={(_, newValue) => setFormData(prev => ({ ...prev, technologies: newValue }))}
                            options={techOptions}
                            renderInput={(params) => (
                              <TextField {...params} label="Technologies" variant="outlined" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Comments"
                            value={formData.comments}
                            onChange={handleInputChange('comments')}
                            multiline
                            rows={4}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>

                      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button 
                          variant="contained" 
                          size="large"
                          sx={{ 
                            background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
                            color: 'white'
                          }}
                        >
                          Submit Form
                        </Button>
                        <Button variant="outlined" size="large">
                          Reset
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Card sx={{ height: 'fit-content' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="#03dac6">
                        Form Status
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Completion</Typography>
                          <Chip 
                            label="75%" 
                            size="small" 
                            sx={{ bgcolor: '#bb86fc20', color: '#bb86fc' }}
                          />
                        </Box>
                        
                        <LinearProgress 
                          variant="determinate" 
                          value={75} 
                          sx={{
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #bb86fc, #03dac6)'
                            }
                          }}
                        />

                        <Typography variant="body2" color="text.secondary">
                          Complete all fields to enable submission
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Tab 2: Data Display */}
            <TabPanel value={activeTab} index={1}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: '#03dac6',
                    mb: 3
                  }}>
                    <Analytics sx={{ mr: 2 }} />
                    User Directory
                  </Typography>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ '& th': { borderBottom: '2px solid #30363d' } }}>
                          <TableCell sx={{ fontWeight: 'bold', color: '#bb86fc' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#bb86fc' }}>First Name</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#bb86fc' }}>Last Name</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#bb86fc' }}>Department</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#bb86fc' }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#bb86fc' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row, index) => (
                          <TableRow 
                            key={row.id}
                            sx={{ 
                              '&:hover': { backgroundColor: '#21262d' },
                              '& td': { borderBottom: '1px solid #30363d' }
                            }}
                          >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  sx={{ 
                                    mr: 2, 
                                    bgcolor: index % 2 === 0 ? '#bb86fc' : '#03dac6',
                                    width: 32,
                                    height: 32
                                  }}
                                >
                                  {row.firstName.charAt(0)}
                                </Avatar>
                                {row.firstName}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'medium' }}>{row.lastName}</TableCell>
                            <TableCell>
                              <Chip 
                                label={row.department} 
                                size="small"
                                sx={{ 
                                  bgcolor: '#30363d', 
                                  color: 'text.primary'
                                }}
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
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Edit">
                                  <IconButton size="small" sx={{ color: '#bb86fc' }}>
                                    <Person />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Contact">
                                  <IconButton size="small" sx={{ color: '#03dac6' }}>
                                    <Email />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Tab 3: Security (Captcha) */}
            <TabPanel value={activeTab} index={2}>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                  <Card>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="h5" gutterBottom sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#bb86fc',
                        mb: 4
                      }}>
                        <Security sx={{ mr: 2 }} />
                        Security Verification
                      </Typography>

                      {/* Captcha Display */}
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 3, 
                          mb: 3,
                          backgroundColor: '#0d1117',
                          border: '2px solid #30363d',
                          borderRadius: 2,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Animated background */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                              linear-gradient(45deg, transparent 40%, rgba(187, 134, 252, 0.1) 50%, transparent 60%),
                              linear-gradient(-45deg, transparent 40%, rgba(3, 218, 198, 0.1) 50%, transparent 60%)
                            `,
                            animation: 'pulse 2s ease-in-out infinite alternate'
                          }}
                        />
                        
                        <Typography 
                          variant="h3" 
                          sx={{ 
                            fontFamily: 'monospace',
                            letterSpacing: 12,
                            transform: 'skew(-10deg) rotate(-2deg)',
                            background: 'linear-gradient(45deg, #bb86fc, #03dac6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 20px rgba(187, 134, 252, 0.5)',
                            position: 'relative',
                            zIndex: 2,
                            fontWeight: 'bold'
                          }}
                        >
                          {captchaCode}
                        </Typography>
                      </Paper>

                      <TextField
                        fullWidth
                        label="Enter Security Code"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        variant="outlined"
                        disabled={captchaVerified}
                        error={captchaError}
                        helperText={
                          captchaVerified 
                            ? 'Verification successful!' 
                            : captchaError 
                            ? 'Incorrect code. New code generated.' 
                            : 'Enter the code exactly as shown above'
                        }
                        sx={{ mb: 3 }}
                        inputProps={{ 
                          style: { 
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            letterSpacing: 2
                          } 
                        }}
                      />

                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                          variant="contained"
                          onClick={verifyCaptcha}
                          disabled={!captchaInput || captchaVerified}
                          size="large"
                          sx={{
                            background: captchaVerified 
                              ? 'linear-gradient(45deg, #4caf50, #8bc34a)'
                              : 'linear-gradient(45deg, #bb86fc, #03dac6)',
                            minWidth: 120
                          }}
                          startIcon={captchaVerified ? <CheckCircle /> : <Security />}
                        >
                          {captchaVerified ? 'Verified' : 'Verify'}
                        </Button>
                        
                        <Button
                          variant="outlined"
                          onClick={generateCaptcha}
                          disabled={captchaVerified}
                          size="large"
                          startIcon={<Refresh />}
                        >
                          New Code
                        </Button>
                      </Stack>

                      {captchaVerified && (
                        <Alert 
                          severity="success" 
                          sx={{ 
                            mt: 3,
                            '& .MuiAlert-icon': {
                              color: '#4caf50'
                            }
                          }}
                        >
                          <strong>Captcha verified successfully!</strong> Security check complete.
                        </Alert>
                      )}

                      {captchaError && (
                        <Alert 
                          severity="error" 
                          sx={{ 
                            mt: 3,
                            '& .MuiAlert-icon': {
                              color: '#f44336'
                            }
                          }}
                        >
                          <strong>Verification failed!</strong> Please try again with the new code.
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>

          {/* Success Dialog */}
          <Dialog 
            open={showSuccessDialog} 
            onClose={() => setShowSuccessDialog(false)}
            PaperProps={{
              sx: {
                backgroundColor: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 3
              }
            }}
          >
            <DialogTitle sx={{ 
              textAlign: 'center',
              background: 'linear-gradient(45deg, #bb86fc, #03dac6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🎉 Success!
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body1">
                Captcha verified successfully! You have completed the security verification.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
              <Button 
                onClick={() => setShowSuccessDialog(false)}
                variant="contained"
                sx={{ 
                  background: 'linear-gradient(45deg, #bb86fc, #03dac6)',
                }}
              >
                Continue
              </Button>
            </DialogActions>
          </Dialog>

          {/* Footer */}
          <Box sx={{ 
            mt: 6, 
            py: 3, 
            textAlign: 'center',
            borderTop: '1px solid #30363d'
          }}>
            <Typography variant="body2" color="text.secondary">
              Nexus Dashboard © 2024 • Advanced Analytics Platform
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App2Page;