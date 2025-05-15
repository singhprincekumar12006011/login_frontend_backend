import{ useContext } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header as="h4" className="bg-primary text-white">
          Dashboard
        </Card.Header>
        <Card.Body>
          <Card.Title>Welcome, {user?.username}!</Card.Title>
          <Card.Text>
            You are now logged in successfully.
          </Card.Text>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
