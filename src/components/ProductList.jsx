import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Row, Col} from 'react-bootstrap'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://12.7.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
                fetchProducts();
        } catch (error) {
            console.error('Error deleting products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container className="text-center p-3" style={{backgroundColor: '#f8f9fa', color: '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1'}}>
            <Row>
                <Col>
                    <h3 className="mt-3 mb-3 test-center">Products</h3>
                    <ListGroup>
                        {products.map(product => (
                            <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm, p-3 mb-3 bg-white rounded">
                                {product.name} (ID: {product.id})
                                <div>
                                    <Button variant="primary" onClick={() => navigate(`/edit-product/${product.id}`)} className="me-2">Edit</Button>
                                    <Button variant='danger' onClick={() => deleteProduct(product.id)}>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;