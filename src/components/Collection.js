import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Tabs, message, Row, Col } from 'antd';
import Search from 'antd/lib/transfer/search';

import SearchBar from './SearchBar';
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from '../constants';
import PhotoGallery from './PhotoGallery';

import '../styles/Collection.css';

const { TabPane } = Tabs;

function Collection(props) {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('image');
  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    keyword: '',
  });

  const handleSearch = (option) => setSearchOption(option);

  useEffect(() => {
    fetchPosts(searchOption); // API
  }, [searchOption]);

  const fetchPosts = (option) => {
    const { type, keyword } = option;
    let url = '';

    if (type === SEARCH_KEY.all) {
      url = `${BASE_URL}/search`;
    }
    // Use query parameters
    else if (type === SEARCH_KEY.user) {
      url = `${BASE_URL}/search?user=${keyword}`;
    } else {
      url = `${BASE_URL}/search?keywords=${keyword}`;
    }

    const opt = {
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      })
      .catch((err) => {
        message.error('Failed to fetch posts');
      });
  };

  // Render images and videos separately,
  // because rendering of image is different from video
  const renderPosts = (type) => {
    // Corner Case
    // Cannot guarantee post is even an array (and not null)
    if (!posts || posts.length === 0) {
      return <div>No Data</div>;
    }

    let filtered;

    // PhotoAlbum for images
    if (type === 'image') {
      filtered = posts.filter((post) => post.type === 'image');
      // Corner case
      if (!filtered || filtered.length === 0) {
        return <div>No Images!</div>;
      }
      const imageArr = filtered.map((image) => {
        return {
          postId: image.id,
          src: image.url,
          // src: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/10/pokemon-psyduck-wood-carving.jpg',
          user: image.user,
          caption: image.message,
          thumbnail: image.url,
          // thumbnail:'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/10/pokemon-psyduck-wood-carving.jpg',
          thumbnailWidth: 300,
          thumbnailLength: 200,
        };
      });

      return <PhotoGallery images={imageArr} />;
    }
    // <video/> for videos
    else if (type === 'video') {
      filtered = posts.filter((post) => post.type === 'video');
      if (!filtered || filtered.length === 0) {
        return <div>No Videos!</div>;
      }
      return (
        <Row>
          {filtered.map((post) => {
            return (
              <Col span={24} key={post.url}>
                <video src={post.url} controls={true}></video>
              </Col>
            );
          })}
        </Row>
      );
    }
  };

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
        <Tabs
          onChange={(key) => setActiveTab(key)}
          defaultActiveKey="image"
          activeKey={activeTab}
        >
          <TabPane tab="Images" key="image">
            {renderPosts('image')}
          </TabPane>
          <TabPane tab="Videos" key="video">
            {renderPosts('video')}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Collection;
