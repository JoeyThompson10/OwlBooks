import React from 'react';
import './headerFooterStyles.css';


const Header = () => {
  return (
    <header>
      <h2>Owl Books</h2>
      <nav>
        <a href="/">Dashboard</a>
        {/* Add more navigation links if necessary */}
      </nav>
    </header>
  );
}

export default Header;
