// pages/products/[productId].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Typography, Breadcrumb, Image, Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ProductDetailsPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [productId]);
  const handleMenuClick = (e) => {
    console.log("Clicked on:", e.key);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="buy">Buy</Menu.Item>
      <Menu.Item key="addToCart">Add to Cart</Menu.Item>
    </Menu>
  );
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="mb-8">
        <div className="flex justify-center mb-4 p-4 border rounded-lg">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              style={{ width: "200px", margin: "0 10px" }}
            />
          )}
        </div>
        <Title level={4}>{product.title}</Title>
        <Title level={5}>Price: ${product.price}</Title>
        <Card title="Description">
          <p>{product.description}</p>
        </Card>
        <Dropdown  className="my-4 w-full flex items-center justify-center" overlay={menu}>
          <Button>
            Buy or Add to Cart <DownOutlined />
          </Button>
        </Dropdown>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;
