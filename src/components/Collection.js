import React from 'react';
import { userState, useEffect } from 'react';

import SearchBar from './SearchBar';
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from '../constants';

function Collection(props) {
  const [searchOption, setSearchOption] = userState({
    type: SEARCH_KEY.all,
    keyword: '',
  });

  const handleSearch = (option) => setSearchOption(option);

  return <div>collection</div>;
}

export default Collection;
