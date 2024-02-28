import { useState, useEffect } from 'react';
import MyLayout from './components/layout';
import { Card, Button, Table, Slider, Space, Typography, Checkbox, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Floating from './components/Floating';
import Link from 'next/link';
const { Column } = Table;
const { Title } = Typography;

const Dashboard = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [sliderValues, setSliderValues] = useState({});
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // Initialize the expandedDescriptions state with false for each product
        const expandedState = {};
        data.forEach(product => {
          expandedState[product.id] = false;
        });
        setExpandedDescriptions(expandedState);

        setDataSource(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleToggleDescription = (productId) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts(prevState => {
      if (prevState.includes(productId)) {
        return prevState.filter(id => id !== productId);
      } else {
        return [...prevState, productId];
      }
    });
  };

  const handleSliderChange = (value, productId) => {
    setSliderValues(prevState => ({
      ...prevState,
      [productId]: value,
    }));
  };

  const handleSaveSelectedProducts = () => {
    const selected = dataSource.filter(product => selectedProducts.includes(product.id));
    const updatedSelected = selected.map(product => ({
      ...product,
      percentage: sliderValues[product.id] || 0
    }));
    setSavedProducts(updatedSelected);
    localStorage.setItem('savedProducts', JSON.stringify(updatedSelected));
  };

  useEffect(() => {
    const savedProductsFromLocalStorage = JSON.parse(localStorage.getItem('savedProducts')) || [];
    setSavedProducts(savedProductsFromLocalStorage);
  }, []);

  return (
    <MyLayout>
      <div className="p-8">
        <Title level={2}>Dashboard</Title>
        <Card className="mb-8" title="Recent Products">
          <Table
            dataSource={dataSource}
            pagination={{ pageSize: 4 }}
            loading={loading}
            className="w-full"
          >
            <Column title="Name" dataIndex="title" key="title" />
            <Column 
              title="Description" 
              dataIndex="description" 
              key="description" 
              render={(text, record) => (
                <>
                  <span>
                    {expandedDescriptions[record.id] ? text : `${text.slice(0, 50)}...`}
                  </span>
                  {text.length > 50 && (
                    <Button type="link" onClick={() => handleToggleDescription(record.id)}>
                      {expandedDescriptions[record.id] ? 'Show Less' : 'Show More'}
                    </Button>
                  )}
                </>
              )}
            />
            <Column title="Price" dataIndex="price" key="price" />
            <Column
              title="Select"
              key="select"
              render={(text, record) => (
                <Checkbox onChange={() => handleCheckboxChange(record.id)} checked={selectedProducts.includes(record.id)} />
              )}
            />
          </Table>
        </Card>

        <Card className="mb-8" title="Selected Products">
          <Table
            dataSource={dataSource.filter(product => selectedProducts.includes(product.id))}
            pagination={false}
            className="w-full"
          >
            <Column title="Name" dataIndex="title" key="title" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column
              title="Sale %"
              key="percentage"
              render={(text, record) => (
                <Slider defaultValue={0} onChange={(value) => handleSliderChange(value, record.id)} />
              )}
            />
          </Table>
          <Button type="primary" onClick={handleSaveSelectedProducts} className='mt-4 bg-slate-500'>Save</Button>
        </Card>

        <Card className="mb-8" title="Saved Products">
          <Row gutter={[16, 16]}>
            {savedProducts.map(product => (
              <Col key={product.id}  xs={24} sm={12} md={8} lg={6} xl={4}>
                <Link href={`/products/${product.id}`}>
                <Card title={product.title}>
                  <img src={product.image} alt={product.title} style={{ width: '100%', marginBottom: '8px' }} />
                  <p className=" text-xs">Price: <span className=' font-bold text-sm'> {product.price}</span>Rs</p>
                  <p className=" text-xs">Sale: <span className=' font-bold text-sm'> {product.percentage}</span> %</p>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Card>
        <Card title="Actions">
          <Space className='flex flex-col'>
            <Button className="bg-slate-500" type="primary" icon={<EditOutlined />}>
              Some Icon button in different style
            </Button>
            <Button type="danger" icon={<DeleteOutlined/>}>
              Some Icon button
            </Button>
          </Space>
        </Card>
      </div>
      <Floating/>
    </MyLayout>
  );
};

export default Dashboard;
