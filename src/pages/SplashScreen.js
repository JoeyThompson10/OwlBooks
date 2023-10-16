import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import Tooltip from '@mui/material/Tooltip';

function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className='bg-warning shadow-1-strong'>
      <MDBContainer className="mt-5" breakpoint="xxl">
        <MDBRow center>
          <MDBCol md="5">
            <MDBCard className='mb-5'>
              <MDBCardBody>
                <MDBTypography variant="h1" className="text-center mb-4">
                  Welcome to the OwlBooks Accounting Web Application
                </MDBTypography>
                <MDBTypography variant="h6" className="mb-4">
                  We will develop a comprehensive accounting web application accessible to administrators, managers, and basic users.
                  This platform empowers users to effortlessly create charts of accounts, input date-stamped transactions with source documents, post transactions to designated
                  accounts, generate trial balances, perform ratio analyses, and produce income statements, balance sheets, and cash flow statements.
                  Our web application will be compatible with all major web browsers and can be accessed seamlessly from both desktop and mobile devices.
                </MDBTypography>
                <MDBTypography variant="h6" className="mb-4">
                  This project was created for Kennesaw State University's SWE Application Domain class (SWE 4713)
                  by Denice Jaquez, Owen Murphree, Joey Thompson, and Moreland Walthour.
                </MDBTypography>
                <MDBTypography className="text-center">
                  <Tooltip title="Click to log into the application">
                    <MDBBtn rounded color="primary" onClick={() => navigate("/login")}>
                      LOGIN
                    </MDBBtn>
                  </Tooltip>
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SplashScreen;
