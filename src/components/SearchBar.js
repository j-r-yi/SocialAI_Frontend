// Default vs named import
import React, { useState } from 'react';
import { Input, Radio } from 'antd';

import { SEARCH_KEY } from '../constants.js';

const { Search } = Input;

const SearchBar = (props) => {
  const [searchType, setSearchType] = useState(SEARCH_KEY.all);
  const [error, setError] = useState('');
  //   const { handleSearch } = props;

  const changeSearchType = (e) => {
    const searchType = e.target.value;
    setSearchType(searchType);
    setError('');

    // If searching all, no need to submit manually
    if (searchType === SEARCH_KEY.all) {
      props.handleSearch({
        type: searchType,
        keyword: '',
      });
    }
  };

  // When searching by keword or username
  // handleSearch defined by this component
  const handleSearch = (value) => {
    if (searchType !== SEARCH_KEY.all && value === '') {
      setError('Please input your search keyword!');
      return;
    }

    setError('');

    // handleSearch defiend by parent, passed through props
    props.handleSearch({ type: searchType, keyword: value });
  };

  return (
    <div className="search-bar">
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        disabled={searchType === SEARCH_KEY.all}
      />
      <p className="error-msg">{error}</p>

      <Radio.Group
        onChange={changeSearchType}
        value={searchType}
        className="search-type-group"
      >
        <Radio value={SEARCH_KEY.all}>All</Radio>
        <Radio value={SEARCH_KEY.Keyword}>Keyword</Radio>
        <Radio value={SEARCH_KEY.User}>User</Radio>
      </Radio.Group>
    </div>
  );
};

export default SearchBar;
