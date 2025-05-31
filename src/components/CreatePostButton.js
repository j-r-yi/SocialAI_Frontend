import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
import axios from 'axios';

// Recall PostForm uses forwardRef
import { PostForm } from './PostForm';
import { BASE_URL, TOKEN_KEY } from '../constants';

class CreatePostButton extends Component {
  // Don't need "this" if state outside of constructor
  state = {
    visible: false,
    confirmLoading: false,
  };

  // Class component methods
  // Arrow functions don't need binding
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    // validateFields provided by PostForm component (from antd Forms)
    this.postForm
      .validateFields() // returns a promise
      .then((form) => {
        const { description, uploadPost } = form;
        const { type, originFileObj } = uploadPost[0]; // destructure type of file and the file itself
        const postType = type.match(/^(image|video)/g)[0]; // regex, returns "image" or "video"
        if (postType) {
          let formData = new FormData();
          formData.append('message', description);
          formData.append('media_file', originFileObj);
          const opt = {
            method: 'POST',
            url: `${BASE_URL}/upload`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
            data: formData,
          };

          axios(opt)
            .then((res) => {
              if (res.status === 200) {
                message.success('the image/video is uploaded successfully');
                this.postForm.resetFields();
                this.handleCancel();
                this.props.onShowPost(postType);
              }
            })
            .catch((err) => {
              message.error('something went wrong');
            })
            .finally(() => {
              this.setState({
                confirmLoading: false,
              });
            });
        }
      })
      .catch((err) => {
        console.log('err validate form ->', err);
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          open={visible}
          onOk={this.handleOk}
          okText="Create"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PostForm
            // The ref provided by PostForm, control given to the current component
            ref={(refInstance) => {
              this.postForm = refInstance;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default CreatePostButton;
