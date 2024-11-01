import ProtoTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";

function TransactionInfo({ userPamentId, userId, UserName, MobileNo, transactionId, amount, status,createdAt }) {

  const navigate = useNavigate();
  const navigateToContacts = (userPamentId, amount, status,createdAt) => {
    navigate('/userPaymentEdit', { state: { userPamentId, userId, UserName, MobileNo, transactionId, amount, status,createdAt } });
  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {UserName}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {MobileNo}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {transactionId}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          ₹{amount}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {createdAt}
        </p>
      </td>

      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {
            status==='Pending' &&
            <span className="text-yellow-500">{status}</span>
          }
          {
            status==='Rejected' &&
            <span className="text-red-500">{status}</span>
          }
          {
            status==='Accept' &&
            <span className="text-green-500">{status}</span>
          }
          
        </p>
      </td>

      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-start">
          {status !== 'Accept' && 
            <button styles={{
              "margin": "1px",
              "background-color": "white",
              "color": "white",
              "border": "none",
              "padding": "5px 10px",
              "cursor": "pointer",
              "border-radius": "4px"
            }}
              onClick={() => navigateToContacts(userPamentId, amount, status,createdAt)} >
              <img style={{ "width": "25px", "height": "25px", }} src={edit} />
            </button>
          }
          {/* <button styles={{
            "margin": "1px",
            "background-color": "white",
            "color": "white",
            "border": "none",
            "padding": "5px 10px",
            "cursor": "pointer",
            "border-radius": "4px"
          }} onClick={() => DeleteUser(UserId)} >
          <img style={{"width": "30px","height": "30px","margin": "30px"}} src={trash} />
          </button> */}
        </div>
      </td>
    </tr>
  );
}

// TransactionInfo.propTypes = {
//   UserId:ProtoTypes.string,
//   UserName:ProtoTypes.string,
//   MobileNo:ProtoTypes.string,
//   GamePlay:ProtoTypes.Number,
//   MainWallet:ProtoTypes.Number,
//   RegistrationDate:ProtoTypes.string,
//   LastLogin:ProtoTypes.string,
//   status:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default TransactionInfo;
