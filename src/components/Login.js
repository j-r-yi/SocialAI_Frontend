import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Login.css';
import { BASE_URL } from '../constants';

function Login(props) {
  const { handleLoggedIn } = props;
  const onFinish = (values) => {
    const { username, password } = values;
    const option = {
      method: 'POST',
      url: `${BASE_URL}/signin`,
      data: {
        username,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Axios returns a promise
    axios(option)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          handleLoggedIn(data);
          message.success('Logged In!');
        }
      })
      .catch((err) => {
        message.error('Login Failed!');
      });
  };
  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="user"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        ></Input>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        ></Input>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ backgroundColor: 'black' }}
        >
          {' '}
          Login
        </Button>{' '}
        Or <Link to="/register">Register Now!</Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
