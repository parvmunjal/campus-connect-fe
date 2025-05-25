import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const SignupForm = ({ onSwitch, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'ROLE_USER',
    description: '',
    dpUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';

    if (!formData.password.trim()) errs.password = 'Password is required';
    if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';

    if (formData.role === 'ROLE_ORGANIZER') {
      if (!formData.description.trim()) errs.description = 'Description is required';
      if (!formData.dpUrl.trim()) errs.dpUrl = 'DP URL is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    try {
      await onSubmit(formData);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <>
      <h3 className="mb-4" style={{ color: 'var(--primary-color)' }}>Sign Up</h3>
      <Form onSubmit={handleSubmit}>
        {submitError && <Alert variant="danger">{submitError}</Alert>}

        <Form.Group controlId="signupName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="signupEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="signupPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="signupPhone" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="signupRole" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={formData.role} onChange={handleChange}>
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ORGANIZER">Organizer</option>
          </Form.Select>
        </Form.Group>

        {formData.role === 'ROLE_ORGANIZER' && (
          <>
            <Form.Group controlId="signupDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="signupDpUrl" className="mb-3">
              <Form.Label>DP URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter display picture URL"
                name="dpUrl"
                value={formData.dpUrl}
                onChange={handleChange}
                isInvalid={!!errors.dpUrl}
              />
              <Form.Control.Feedback type="invalid">{errors.dpUrl}</Form.Control.Feedback>
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <span className="switchLink" onClick={onSwitch}>
          Already have an account? <strong>Sign in</strong>
        </span>
      </div>
    </>
  );
};

export default SignupForm;
