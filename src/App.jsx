import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>
        Welcome to the OwlBooks Accounting Web Application test
      </h1>

      <p>
        We will develop a comprehensive accounting web application accessible to administrators, managers, and basic users. This platform empowers users to effortlessly create charts of accounts, input date-stamped transactions with source documents, post transactions to designated accounts, generate trial balances, perform ratio analyses, and produce income statements, balance sheets, and cash flow statements. Our web application will be compatible with all major web browsers and can be accessed seamlessly from both desktop and mobile devices.
      </p>

      <p>
        This project was created fofr Kennesaw State University's SWE Application Domain class (SWE 4713) by Denice Jaquez, Owen Murphree, Joey Thompson, and Moreland Walthour.
      </p>

      <input type="button" id="loginPageButton" value="Login" onClick={()=>navigate("/login")}></input>
    </div>
  );
}

export default App;
