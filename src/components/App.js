import React, { useState } from 'react';
import Main from './Main';
import ResponsiveAppBar from './ResponsiveAppBar';

import { TOKEN_KEY } from '../constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
    // true
  );

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      <ResponsiveAppBar
        isLoggedIn={isLoggedIn}
        handleLogout={logout}
      ></ResponsiveAppBar>
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;
