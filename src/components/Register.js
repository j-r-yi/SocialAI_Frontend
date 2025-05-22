import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

import { BASE_URL } from '../constants';

// (mobile) responsiveness design
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register(props) {
  const [form] = Form.userForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;
    const opt = {
      method: 'POST',
      url: `${BASE_URL}/signup`,
      data: {
        username,
        password,
      },
      headers: {
        'content-type': 'application/json',
      },
    };
    axios(opt)
      .then((response) => {
        if (response.status === 200) {
          message.success('Registration Succeeded!');
          navigate('/login');
        }
      })
      .catch((error) => {
        message.error('Signup Failed');
      });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="register"
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default Register;
