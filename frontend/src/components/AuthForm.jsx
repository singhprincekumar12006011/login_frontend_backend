import React from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const AuthForm = ({ 
  isLogin, 
  formData, 
  handleChange, 
  handleSubmit, 
  error, 
  isLoading 
}) => {
  const title = isLogin ? 'Login' : 'Create an Account';
  const buttonText = isLogin ? 'Sign In' : 'Sign Up';
  const toggleText = isLogin 
    ? "Don't have an account? Sign Up" 
    : "Already have an account? Sign In";
  const toggleLink = isLogin ? '/register' : '/login';

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 " style={{
      background: 'linear-gradient(90deg,rgba(0, 119, 133, 1) 0%, rgba(171, 171, 212, 1) 52%, rgb(103, 153, 158) 100%)'
    }}>
      <div className="card shadow-lg" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4">{title}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
              </Form.Group>
            )}
            
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <a href={toggleLink} className="text-decoration-none">
              {toggleText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;