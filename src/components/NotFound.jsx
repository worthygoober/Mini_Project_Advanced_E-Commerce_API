import { Container, Row, Col, Image, Button, NavLink } from 'react-bootstrap';
import natural1 from '../assets/natural1.png';
import lostMap from '../assets/lostMap.webp';

function NotFound() {
    return (
        <Container className="text-center p-3" style={{backgroundColor: '#f8f9fa', color: '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1'}}>
        <Row className="justify-content-center align-items-center">
            <Col md={6}>
                <h2 className="text-danger">404 - Page Not Found</h2>
                <p className="text-muted">Oh no! Looks like you rolled a Nat 1 trying to get to a different page. Let's roll again and get you back to the right place.</p>

                <NavLink to='/'>
                    <Button variant="primary" size="lg" className="shadow-lg">Go Home</Button>
                </NavLink>

                <NavLink to='/'>
                    <Button variant="primary" size="lg" className="shadow-lg" />
                </NavLink>
            </Col>

            <Col md={6}>
                <Image src={lostMap} alt="404 lost travelers image" fluid rounded />
            </Col>
        </Row>
    </Container>
    );
};

export default NotFound;