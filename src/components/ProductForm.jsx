import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, func } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner, Container } from "react-bootstrap";
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', price: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!product.name) errors.name = 'Product name is required';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/products/${id}`, product);
            } else {
                await axios.post('http://127.0.0.1:5000/products', product);
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setProduct({ name: '', price: ''});
        setSubmitting(false);
        navigate('/products');
    };

    if (isSubmitting) return <p>Submitting product data...</p>;

    return (
        <Container className="text-center p-3" style={{backgroundColor: '#f8f9fa', color: '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1'}}>
            <Form onSubmit={handleSubmit}>
                <h3 className="mt-3 mb-3 test-center">{id ? 'Edit' : 'Add'} Product</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group controlId='productName'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='productPrice'>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type='number'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as='span' animation='border' size='sm' /> : 'Submit'}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleChange}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product has been successfully {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

ProductForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
}

export default ProductForm;