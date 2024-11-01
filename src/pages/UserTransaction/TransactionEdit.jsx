// import GreenBtn from "../button/AddMony";

import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
function TransactionEdit() {

  const location = useLocation();
  //console.log("location ", location.state)
  const Botinfo = location.state;

  console.log("Player Info  ", Botinfo)

  const context = useContext(offerContext)
  const { userPaymentVerify } = context


  const navigate = useNavigate();

  let [userInfo, SetuserInfo] = useState({
    userPamentId: Botinfo.userPamentId,
    userId:Botinfo.userId,
    UserName: Botinfo.UserName,
    MobileNo: Botinfo.MobileNo,
    transactionId: Botinfo.transactionId,
    amount: Botinfo.amount,
    status: Botinfo.status

  })

  useEffect(() => {

    const submitdata = async () => {
      SetuserInfo({
        userPamentId: Botinfo.userPamentId,
        userId:Botinfo.userId,
        UserName: Botinfo.UserName,
        MobileNo: Botinfo.MobileNo,
        transactionId: Botinfo.transactionId,
        amount: Botinfo.amount,
        status: Botinfo.status
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
    let res={}
    if(type==='Accept'){
      res = await userPaymentVerify({ 
        userPamentId:userInfo.userPamentId,
        userId:userInfo.userId, 
        amount:userInfo.amount, 
        status:'Accept' 
      })
    }else if(type==='Rejected'){
      res = await userPaymentVerify({ 
        userPamentId:userInfo.userPamentId, 
        status:'Rejected' 
       })
    }
    if (res.status == 200) {
      navigate('/userTransaction');
      alert(res.message)
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
                  User Transaction
                </h3>
              </div>
              <div className="w-full">

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Player Name :- {userInfo.UserName}
                  </p>
                </div>
                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Mobile Number :- {userInfo.MobileNo}
                  </p>
                </div>

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="  text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Transaction Id :- {userInfo.transactionId}
                  </p>
                </div>

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Amount :- {userInfo.amount}
                  </p>
                </div>

                <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Status :- {userInfo.status}
                  </p>
                </div>


                {/* <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 mb-4 focus-within:border-success-300 dark:border-darkblack-400">
                  <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
                    Enter amount deposit
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

                <div className="flex gap-12">
                  <button aria-label="none" onClick={()=>SaveChange('Accept')}
                    className="mt-7 bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Accept</button>

                  <button aria-label="none" onClick={()=>SaveChange('Rejected')}
                    className="mt-7 bg-red-500 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Rejected</button>

                </div>

              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default TransactionEdit;
