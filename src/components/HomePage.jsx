import React from "react";
import { Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container className="text-center p-3" style={{backgroundColor: '#f8f9fa', color: '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1'}}>
            <h2>Welcome to Our Dungeons & Dragons E-Commerce App Store</h2>
            <p>Find all the best gear for your party's next adventure!</p>

            <br />

            <Row className="mt-4">
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Join the Club</Card.Title>
                            <Card.Text>Sign-up today to get access to all of these exclusive products</Card.Text>
                            <Link to='/add-customer'>
                                <Button variant="success">Sign Me Up</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>See Products</Card.Title>
                            <Card.Text>See the products that are most loved by our customers.</Card.Text>
                            <Link to='/products'>
                                <Button variant="warning">Shop Now</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Place an Order</Card.Title>
                            <Card.Text>Make sure to place an order so you have all the gear for your next adventure.</Card.Text>
                            <Link to='/orders'>
                                <Button variant="danger">Place an Order</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Home;