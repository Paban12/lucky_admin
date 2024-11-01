// import GreenBtn from "../button/AddMony";

import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
function WithdrawalEdit() {

  const location = useLocation();
  //console.log("location ", location.state)
  const Botinfo = location.state;

  console.log("Player Info  ", Botinfo)

  const context = useContext(offerContext)
  const { userWithdrawalVerify } = context


  const navigate = useNavigate();

  let [userInfo, SetuserInfo] = useState({
    withdrawalId:Botinfo.withdrawalId,
    userId:Botinfo.userId,
    UserName:Botinfo.UserName,
    MobileNo:Botinfo.MobileNo,
    amount:Botinfo.amount,
    accountNumber:Botinfo.accountNumber,
    ifscCode:Botinfo.ifscCode,
    holderName:Botinfo.holderName,
    bankName:Botinfo.bankName,
    upiId:Botinfo.upiId,
    status:Botinfo.status

  })

  useEffect(() => {

    const submitdata = async () => {
      SetuserInfo({
        withdrawalId:Botinfo.withdrawalId,
        userId:Botinfo.userId,
        UserName:Botinfo.UserName,
        MobileNo:Botinfo.MobileNo,
        amount:Botinfo.amount,
        accountNumber:Botinfo.accountNumber,
        ifscCode:Botinfo.ifscCode,
        holderName:Botinfo.holderName,
        bankName:Botinfo.bankName,
        upiId:Botinfo.upiId,
        status:Botinfo.status
      })

    }

    submitdata()
  }, []);

  const [amount, setAmount] = useState(0);

  const handleAmount = (event) => {
    const { name, value } = event.target;
    setAmount(value)
  }

  const SaveChange = async (type) => {
    let res = {}
    if (type === 'Completed') {
      res = await userWithdrawalVerify({
        withdrawalId: userInfo.withdrawalId,
        userId: userInfo.userId,
        amount: userInfo.amount,
        status: 'Completed'
      })
    } else if (type === 'Rejected') {
      res = await userWithdrawalVerify({
        withdrawalId: userInfo.withdrawalId,
        status: 'Rejected'
      })
    }
    console.log({res});
    
    if (res.status == 200) {
      navigate('/withdrawalList');
      alert('Successful !')
    } else {
      alert("Error Please enter")
    }

    setAmount(0)

  }



  return (
    <>
      <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
        {/* write your code here */}
        <div className="2xl:flex 2xl:space-x-[48px]">
          <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
            <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
              <div className="flex flex-col space-y-5">
                <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                  User Withdrawal
                </h3>
              </div>
              <div className="w-full grid grid-cols-3 gap-4 py-3">

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Player Name :- <span className='font-bold'>{userInfo.UserName}</span>
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Mobile Number :- <span className='font-bold'>{userInfo.MobileNo}</span>
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Amount :- <span className='font-bold'>₹{userInfo.amount}</span>
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="  text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Account Number :- <span className='font-bold'>{userInfo.accountNumber}</span>
                  </p>
                </div>

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="  text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    IFSC :-<span className='font-bold'>{userInfo.ifscCode}</span>
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="  text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Holder Name :-<span className='font-bold'>{userInfo.holderName}</span>
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="  text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Bank Name :-<span className='font-bold'>{userInfo.bankName}</span>
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="  text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    UPI Id :- <span className='font-bold'>{userInfo.upiId}</span>
                  </p>
                </div>

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Status :-<span className='font-bold'>{userInfo.status}</span>
                  </p>
                </div>


                {/* <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Enter Amount
                  </p>
                  <div className="flex h-[35px] w-full items-center justify-between">
                    <span className="text-2xl font-bold text-bgray-900 dark:text-white">
                      ₹
                    </span>
                    <label className="w-full">
                      <input
                        type="text" onChange={handleAmount}
                        className="w-full border-none p-0 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                      />
                    </label>
                  </div>
                </div> */}

                <div className="flex gap-10 justify-start items-center ">
                  <button aria-label="none" onClick={() => SaveChange('Completed')}
                    className="bg-success-300 dark:bg-success-300 h-[3rem] dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Completed</button>

                  <button aria-label="none" onClick={() => SaveChange('Rejected')}
                    className="bg-red-500 dark:text-bgray-900 h-[3rem] border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Rejected</button>

                </div>

              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default WithdrawalEdit;
