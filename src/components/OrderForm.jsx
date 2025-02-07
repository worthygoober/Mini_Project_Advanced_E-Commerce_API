import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";

const OrderForm = ({ customers = [], products = [], onSubmit}) => {
    const [order, setOrder] = useState({
        customerId: '',
        products: [],
        orderDate: new Date().toISOString().split('T')[0],
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/orders')
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => setError(error.message))
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder((prevOrder) => ({...prevOrder, [name]: value }));
    };

    const handleProductSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setOrder((prevOrder) => ({...prevOrder, products: selectedOptions }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!order.customerId || order.products.length === 0 ) {
            setError('Please select a customer and at least one product.');
            return;
        }
        setError(null);
        setIsSubmitting(true);
        try {
            await axios.post('http://127.0.0.1:5000/orders', order);
            setShowSuccessModal(true);
            onSubmit(order);
            setOrder({
                customerId: '',
                products: [],
                orderDate: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            setError(error.message);
        } finally {
            isSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowSuccessModal(false);
    };

    return (
        <Container className="text-center p-3" style={{backgroundColor: '#f8f9fa', color: '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1'}}>
            <Form onSubmit={handleSubmit}>
                <h3 className="mt-3 mb-3 test-center">Orders</h3>
                {error && <Alert variant="danger">{error}</Alert>}

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="customerSelect">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control as='select' name="customerId" value={order.customerId} onChange={handleChange} required>
                            <option value=''>Select a Customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="productSelect">
                        <Form.Label>Products</Form.Label>
                        <Form.Control as='select' name="productIds" multiple value={order.products} onChange={handleProductSelection} required>
                            <option value=''>Select Products</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group controlId="orderDate">
                        <Form.Label>Order Date</Form.Label>
                        <Form.Control type="date" name="orderDate" value={order.orderDate} onChange={handleChange} required />
                    </Form.Group>
                </Row>

                <br />

                <Button variant="primary" type="submit">Place Order</Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleChange}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your order has been placed successfully!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrderForm;