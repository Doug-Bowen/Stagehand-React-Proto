import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Table,
  Tabs,
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Progress,
  Avatar,
  Statistic,
  Alert,
  Modal,
  Select,
  message,
  Tooltip,
  Divider,
  theme,
  ConfigProvider
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
  DashboardOutlined,
  BarChartOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const App3Page: React.FC = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Tech options for select
  const techOptions = [
    'React',
    'TypeScript',
    'Ant Design',
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
    { 
      key: '1', 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      department: 'Engineering', 
      status: 'Active',
      avatar: 'J',
      email: 'john.doe@company.com'
    },
    { 
      key: '2', 
      id: 2, 
      firstName: 'Jane', 
      lastName: 'Smith', 
      department: 'Design', 
      status: 'Active',
      avatar: 'J',
      email: 'jane.smith@company.com'
    },
    { 
      key: '3', 
      id: 3, 
      firstName: 'Bob', 
      lastName: 'Johnson', 
      department: 'Marketing', 
      status: 'Inactive',
      avatar: 'B',
      email: 'bob.johnson@company.com'
    },
    { 
      key: '4', 
      id: 4, 
      firstName: 'Alice', 
      lastName: 'Brown', 
      department: 'Sales', 
      status: 'Active',
      avatar: 'A',
      email: 'alice.brown@company.com'
    }
  ];

  // Table columns definition
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text: string, record: any) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }} size="small">
            {record.avatar}
          </Avatar>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department: string) => (
        <Tag color={
          department === 'Engineering' ? 'blue' :
          department === 'Design' ? 'purple' :
          department === 'Marketing' ? 'orange' :
          'green'
        }>
          {department}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Contact">
            <Button type="text" icon={<MailOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
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
  };

  // Verify captcha
  const verifyCaptcha = () => {
    setLoading(true);
    setTimeout(() => {
      if (captchaInput.toUpperCase() === captchaCode) {
        setCaptchaVerified(true);
        message.success('Captcha verified successfully!');
        setShowSuccessModal(true);
      } else {
        message.error('Incorrect captcha code. Please try again.');
        generateCaptcha();
      }
      setLoading(false);
    }, 1000);
  };

  // Handle form submission
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Form submitted successfully!');
  };

  // Initialize captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Dark theme configuration
  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      colorBgBase: '#0f1419',
      colorBgContainer: '#161b22',
      colorBorder: '#30363d',
      colorText: '#c9d1d9',
      colorTextSecondary: '#8b949e',
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={darkTheme}>
      <Layout style={{ minHeight: '100vh', background: '#0f1419' }}>
        {/* Header */}
        <Header style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}>
          <Space size="large" align="center">
            <RocketOutlined style={{ fontSize: '32px', color: 'white' }} />
            <Title level={3} style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>
              Stellar Dashboard
            </Title>
          </Space>
          <div style={{ marginLeft: 'auto' }}>
            <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Advanced Control Center • Ant Design
            </Text>
          </div>
        </Header>

        <Content style={{ padding: '24px' }}>
          {/* Stats Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card 
                hoverable
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                  border: 'none'
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <Statistic
                  title={<Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Total Files</Text>}
                  value={86}
                  prefix={<ThunderboltOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                hoverable
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
                  border: 'none'
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <Statistic
                  title={<Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Active Users</Text>}
                  value={142}
                  prefix={<TeamOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                hoverable
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                  border: 'none'
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <Statistic
                  title={<Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Success Rate</Text>}
                  value={98.5}
                  suffix="%"
                  prefix={<BarChartOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                hoverable
                style={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #fa8c16 0%, #d46b08 100%)',
                  border: 'none'
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <Statistic
                  title={<Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Response Time</Text>}
                  value="2.1s"
                  prefix={<DashboardOutlined style={{ color: 'white' }} />}
                  valueStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content Tabs */}
          <Card 
            style={{ 
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              size="large"
              type="card"
              style={{ margin: '-24px -24px 0 -24px' }}
              tabBarStyle={{ 
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                margin: 0,
                borderRadius: '12px 12px 0 0'
              }}
            >
              {/* Tab 1: Form Controls */}
              <TabPane 
                tab={<Space><UserOutlined />Form Controls</Space>} 
                key="1"
              >
                <div style={{ padding: '24px' }}>
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                      <Card 
                        title={
                          <Space>
                            <UserOutlined style={{ color: '#1890ff' }} />
                            <Text strong>User Information Form</Text>
                          </Space>
                        }
                        style={{ height: 'fit-content' }}
                      >
                        <Form
                          form={form}
                          layout="vertical"
                          onFinish={onFinish}
                          size="large"
                        >
                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                              >
                                <Input 
                                  placeholder="Enter first name"
                                  prefix={<UserOutlined />}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                              >
                                <Input 
                                  placeholder="Enter last name"
                                  prefix={<UserOutlined />}
                                />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Reference Number"
                                name="referenceNumber"
                                rules={[{ required: true, message: 'Please input reference number!' }]}
                              >
                                <Input 
                                  type="number"
                                  placeholder="Enter reference number"
                                  prefix={<PhoneOutlined />}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label="Technologies"
                                name="technologies"
                              >
                                <Select
                                  placeholder="Select technologies"
                                  allowClear
                                  showSearch
                                  optionFilterProp="children"
                                >
                                  {techOptions.map(tech => (
                                    <Option key={tech} value={tech}>{tech}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Form.Item
                            label="Comments"
                            name="comments"
                          >
                            <Input.TextArea
                              rows={4}
                              placeholder="Enter your comments here..."
                            />
                          </Form.Item>

                          <Form.Item style={{ marginBottom: 0 }}>
                            <Space>
                              <Button 
                                type="primary" 
                                htmlType="submit"
                                size="large"
                                icon={<CheckCircleOutlined />}
                                style={{ 
                                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                                  border: 'none'
                                }}
                              >
                                Submit Form
                              </Button>
                              <Button 
                                size="large"
                                onClick={() => form.resetFields()}
                              >
                                Reset
                              </Button>
                            </Space>
                          </Form.Item>
                        </Form>
                      </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                      <Card 
                        title={<Text strong>Form Progress</Text>}
                        style={{ height: 'fit-content' }}
                      >
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                          <div>
                            <Text type="secondary">Completion Rate</Text>
                            <Progress 
                              percent={75} 
                              strokeColor={{
                                '0%': '#1890ff',
                                '100%': '#722ed1',
                              }}
                              style={{ marginTop: 8 }}
                            />
                          </div>
                          
                          <Divider />
                          
                          <Space direction="vertical" size="middle">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text>Required Fields</Text>
                              <Tag color="orange">4/5 Complete</Tag>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text>Validation Status</Text>
                              <Tag color="green">Valid</Tag>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Text>Ready to Submit</Text>
                              <Tag color="blue">Yes</Tag>
                            </div>
                          </Space>

                          <Alert
                            message="Form Status"
                            description="Complete all required fields to enable submission."
                            type="info"
                            showIcon
                          />
                        </Space>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>

              {/* Tab 2: Data Display */}
              <TabPane 
                tab={<Space><BarChartOutlined />Data Display</Space>} 
                key="2"
              >
                <div style={{ padding: '24px' }}>
                  <Card 
                    title={
                      <Space>
                        <TeamOutlined style={{ color: '#722ed1' }} />
                        <Text strong>User Directory</Text>
                      </Space>
                    }
                    extra={
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        style={{ 
                          background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                          border: 'none'
                        }}
                      >
                        Add User
                      </Button>
                    }
                  >
                    <Table
                      columns={columns}
                      dataSource={tableData}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total} items`,
                      }}
                      scroll={{ x: 800 }}
                      style={{ marginTop: 16 }}
                    />
                  </Card>
                </div>
              </TabPane>

              {/* Tab 3: Security */}
              <TabPane 
                tab={<Space><SafetyOutlined />Security</Space>} 
                key="3"
              >
                <div style={{ padding: '24px' }}>
                  <Row justify="center">
                    <Col xs={24} md={16} lg={12}>
                      <Card 
                        title={
                          <Space>
                            <SafetyOutlined style={{ color: '#fa8c16' }} />
                            <Text strong>Security Verification</Text>
                          </Space>
                        }
                        style={{ textAlign: 'center' }}
                      >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                          {/* Captcha Display */}
                          <Card 
                            style={{ 
                              background: 'linear-gradient(135deg, #1890ff15 0%, #722ed115 100%)',
                              border: '2px dashed #1890ff',
                              borderRadius: 12
                            }}
                          >
                            <Title 
                              level={2} 
                              style={{ 
                                fontFamily: 'monospace',
                                letterSpacing: '8px',
                                transform: 'skew(-5deg)',
                                color: '#1890ff',
                                margin: 0,
                                textShadow: '2px 2px 4px rgba(24, 144, 255, 0.3)'
                              }}
                            >
                              {captchaCode}
                            </Title>
                          </Card>

                          <Input
                            size="large"
                            placeholder="Enter security code"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                            disabled={captchaVerified}
                            prefix={<SafetyOutlined />}
                            style={{ 
                              textAlign: 'center',
                              fontSize: '18px',
                              letterSpacing: '4px',
                              fontFamily: 'monospace'
                            }}
                            maxLength={6}
                          />

                          <Space>
                            <Button
                              type="primary"
                              size="large"
                              onClick={verifyCaptcha}
                              disabled={!captchaInput || captchaVerified || captchaInput.length !== 6}
                              loading={loading}
                              icon={captchaVerified ? <CheckCircleOutlined /> : <SafetyOutlined />}
                              style={captchaVerified ? {
                                background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                                border: 'none'
                              } : {
                                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                                border: 'none'
                              }}
                            >
                              {captchaVerified ? 'Verified' : 'Verify'}
                            </Button>
                            
                            <Button
                              size="large"
                              onClick={generateCaptcha}
                              disabled={captchaVerified || loading}
                              icon={<ReloadOutlined />}
                            >
                              New Code
                            </Button>
                          </Space>

                          {captchaVerified && (
                            <Alert
                              message="Security Verification Complete"
                              description="Captcha has been successfully verified! You may proceed with secure operations."
                              type="success"
                              showIcon
                              icon={<CheckCircleOutlined />}
                              style={{ textAlign: 'left' }}
                            />
                          )}

                          <Divider />

                          <div style={{ textAlign: 'left' }}>
                            <Title level={5}>Security Features:</Title>
                            <Space direction="vertical">
                              <Text><StarOutlined style={{ color: '#faad14' }} /> Advanced encryption protocols</Text>
                              <Text><StarOutlined style={{ color: '#faad14' }} /> Multi-factor authentication</Text>
                              <Text><StarOutlined style={{ color: '#faad14' }} /> Real-time threat detection</Text>
                              <Text><StarOutlined style={{ color: '#faad14' }} /> Secure data transmission</Text>
                            </Space>
                          </div>
                        </Space>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Card>

          {/* Success Modal */}
          <Modal
            title={
              <Space>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>Verification Successful!</span>
              </Space>
            }
            open={showSuccessModal}
            onOk={() => setShowSuccessModal(false)}
            onCancel={() => setShowSuccessModal(false)}
            centered
            okButtonProps={{
              style: {
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                border: 'none'
              }
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Text>🎉 Congratulations! Your security verification has been completed successfully.</Text>
              <Alert
                message="System Access Granted"
                description="You now have full access to all secure features and operations."
                type="success"
                showIcon
              />
            </Space>
          </Modal>
        </Content>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          padding: '24px',
          background: '#161b22',
          borderTop: '1px solid #30363d'
        }}>
          <Text type="secondary">
            Stellar Dashboard © 2024 • Powered by Ant Design • Advanced Control Center
          </Text>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default App3Page;