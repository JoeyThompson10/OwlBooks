import { MDBBtn } from 'mdb-react-ui-kit';
import { sendEmail } from '../../MongoDbClient';
import React, { useEffect, useState } from 'react';
import { GetAlmostExpiredUsers } from '../../MongoDbClient';


const AddNewAccount = () => {
  const [almostExpiredUsers, setAlmostExpiredUsers] = useState([]);

  async function handleGetAlmostExpiredUsers() {
    const usersReport = await GetAlmostExpiredUsers(50);
    setAlmostExpiredUsers(usersReport);
  }

  useEffect(() => {
    handleGetAlmostExpiredUsers();
  }, []);

  return (
    almostExpiredUsers.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Manager</th>
            <th>Active</th>
            <th>Password Timeout</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {almostExpiredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>{user.isManager ? "Yes" : "No"}</td>
              <td>{user.isActive ? "Yes" : "No"}</td>
              <td>{user.passwordTimeout}</td>
              <td>
                <MDBBtn
                  size="sm"
                  onClick={() => sendEmail(user.email, "OwlBooks - Password Expiration", `
                        <html>
                            <body style="font-family: Arial, sans-serif;">
                                <p>Hello,</p>
                                <p>Your password is expired. Please click the link below to reset your password:</p>
                                <p><a href="https://owlbooks-swe4713.netlify.app/ResetPassword" target="_blank" style="color: #3498db; text-decoration: none;">Reset Your Password</a></p>
                                <p>If you do not have an OwlBooks account, you can safely ignore this email.</p>
                            </body>
                        </html>
                    `)}
                >
                  Send Email
                </MDBBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No users have expired passwords.</p>
    )
  );
};

export default AddNewAccount;