
import { useState, useEffect } from 'react';
import MyLayout from './components/Layout';
import { Card, Button, Table, Slider, Space, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const Dashboard = () => {
  const { Column } = Table;
  const { Title } = Typography;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setDataSource(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSelectProduct = (record) => {
    setSelectedProducts(prevState => [...prevState, record]);
  };

  const handleSaveSelectedProducts = () => {
    console.log(selectedProducts);
  };

  return (
    <div>
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
                    {text.length > 50 ? `${text.slice(0, 50)}...` : text}
                  </span>
                  {text.length > 50 && (
                    <Button type="link">Show More</Button>
                  )}
                </>
              )}
            />
            <Column title="Price" dataIndex="price" key="price" />
            <Column
              title="Select"
              key="select"
              render={(text, record) => (
                <Button className="bg-slate-500" type="primary" onClick={() => handleSelectProduct(record)}>Select</Button>
              )}
            />
          </Table>
        </Card>

        <Card className="mb-8" title="Selected Products">
          <Table
            dataSource={selectedProducts}
            pagination={false}
            className="w-full"
          >
            <Column title="Name" dataIndex="title" key="title" />
            <Column title="Price" dataIndex="price" key="price" />
          </Table>
          <Button type="primary" onClick={handleSaveSelectedProducts} style={{ marginTop: '10px' }}>Save</Button>
        </Card>

        <Card className="mb-8" title="Slider Example">
          <Slider defaultValue={30} />
        </Card>

        <Card title="Actions">
          <Space>
            <Button className="bg-slate-500" type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Space>
        </Card>
      </div>

    </MyLayout>
    </div>
  );
};

export default Dashboard;
