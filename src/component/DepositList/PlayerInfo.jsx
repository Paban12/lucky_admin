import ProtoTypes from "prop-types";
import offerContext from '../../context/offerContext';
import React, { useState, useContext, useEffect } from 'react';

function PlayerInfo({ UserId,name,email,mobileno,dateOfdeposit,screenshort,depositamount,bankAc,IFSCcode,acname,upi_id,paymentmode,status}) {

  const context = useContext(offerContext)
  const { host } = context

  const styles = {
    backgroundColor: status == -1 ? "red":status == 0 ? "green":"green"
  };

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">

      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {UserId}
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
          {dateOfdeposit}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={host+"/"+screenshort}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>

        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
        ₹{depositamount} 
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

          {status == -1 ? "pendding":status == 0 ? "Rejected":"Success"}
        </p>
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
