import ProtoTypes from "prop-types";
import offerContext from '../../context/offerContext';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function PlayerInfo({ id, name, email, mobileno, dateOfpayout, payoutamount, bankAc, IFSCcode, acname, upi_id, paymentmode, status }) {

  const context = useContext(offerContext)
  const { PayoutUpdate,host } = context

  const styles = {
    backgroundColor: status == -1 ? "red" : status == 0 ? "red" : "green"
  };

  const navigate = useNavigate();
  const navigateToContacts = () => {
      // 👇️ navigate to /contacts 
      navigate('/payoutpendding');
     
  };

  const handleApprove = async (id) =>{
    console.log("handleApprove ",id)
    const Update = await PayoutUpdate({ trnsId:id,status:1})

    if(Update.status == "ok"){
      navigate('/payoutpendding?status=Success');
    }else{
        alert("Error Please enter")
    }

  }
  const handlerejected = async (id) =>{
    console.log("handlerejected ",id)

    console.log("handleApprove ",id)
    const Update = await PayoutUpdate({ trnsId:id,status:0})

    if(Update.status == "ok"){
      navigate('/payoutpendding?status=Rejected'); 
  }else{
      alert("Error Please enter")
  }

  }

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {id}
        </p>
      </td>

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {name}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {email}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {mobileno}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {dateOfpayout}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{payoutamount}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {bankAc}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {IFSCcode}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {acname}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {upi_id}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {paymentmode}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">

        <p style={styles}>

          {status == -1 ? "pendding" : status == 0 ? "Rejected" : "Success"}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <div className="flex justify-center">
      

        {status == -1 ? <button
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold mt-5 py-3.5 px-4"
                onClick={ () => handleApprove(id) }
              >
                Approve
              </button> : ""}

        </div>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <div className="flex justify-center">
         

        {status == -1 ? <button
                aria-label="none"
                className="rounded-lg bg-red-300 text-white font-semibold mt-5 py-3.5 px-4"
                onClick={ () => handlerejected(id) }
              >
              Rejected
              </button> : "" }

        </div>
      </td>
    </tr>
  );
}

// PlayerInfo.propTypes = {
//   UserId:ProtoTypes.string,
//   UserName:ProtoTypes.string,
//   MobileNo:ProtoTypes.string,
//   GamePlay:ProtoTypes.Number,
//   MainWallet:ProtoTypes.Number,
//   RegistrationDate:ProtoTypes.string,
//   LastLogin:ProtoTypes.string,
//   Block:ProtoTypes.string,
//   Status:ProtoTypes.string
// };

export default PlayerInfo;
