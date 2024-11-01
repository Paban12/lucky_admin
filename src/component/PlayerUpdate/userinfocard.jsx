import GreenBtn from "../button/AddMony";

import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
function userInfo() {

  const location = useLocation();
  //console.log("location ", location.state)
  const Botinfo = location.state;

  console.log("Player Info  ", Botinfo)

  const context = useContext(offerContext)
  const { AddMoney, DeductMoney, host } = context


  const navigate = useNavigate();
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts 
    navigate('/transaction');
  };

  let [userInfo, SetuserInfo] = useState({
    userId: Botinfo.UserId,
    UserName: Botinfo.UserName,
    profileUrl: Botinfo.profileUrl,
    status: Botinfo.status,
    MobileNo: Botinfo.MobileNo,
    aviatorGamePlay: Botinfo.aviatorGamePlay,
    blackandwhiteGamePlay: Botinfo.blackandwhiteGamePlay,
    MainWallet: Botinfo.MainWallet,
    WinWallet: Botinfo.WinWallet,
    BonusWallet: Botinfo.BonusWallet,
    RegistrationDate: Botinfo.RegistrationDate,
    LastLogin: Botinfo.LastLogin,
    Status: Botinfo.status,
    email: Botinfo.email,
    uniqueId: Botinfo.uniqueId,

  })

  useEffect(() => {

    const submitdata = async () => {
      SetuserInfo({
        userId: Botinfo.UserId,
        UserName: Botinfo.UserName,
        profileUrl: Botinfo.img,
        status: Botinfo.status,
        MobileNo: Botinfo.MobileNo,
        aviatorGamePlay: Botinfo.aviatorGamePlay,
        blackandwhiteGamePlay: Botinfo.blackandwhiteGamePlay,
        MainWallet: Botinfo.MainWallet,
        WinWallet: Botinfo.WinWallet,
        BonusWallet: Botinfo.BonusWallet,
        RegistrationDate: Botinfo.RegistrationDate,
        LastLogin: Botinfo.LastLogin,
        Status: Botinfo.status,
        email: Botinfo.email,
        uniqueId: Botinfo.uniqueId,
      })

    }

    submitdata()

    console.log("Player IG:::::::::::::::::", userInfo)
  }, [location.state]);

  const [amount, setAmount] = useState(0);

  const handleAmount = async (event) => {
    const { name, value } = event.target;
    await setAmount(value)

    console.log("amount", amount)

  }

  const SaveChange = async () => {
    console.log("amount ", amount)

    let res = await AddMoney({ money: amount, type: "Deposit", userId: Botinfo.UserId })

    if (res.status == "ok") {
      // let main = Number(Botinfo.MainWallet)
      // let totals = main + Number(amount)
      // console.log({totals,main});
      // location.state.MainWallet=String(totals)
      // SetuserInfo((pre) => ({...pre, MainWallet: String(totals)}))
      alert("Successfully Added...!!")
      navigateToContacts()
    } else {
      alert("Error Please enter")
    }

    setAmount(0)

  }



  const SaveChangeDeduct = async () => {
    console.log("amount ", amount)

    let res = await DeductMoney({ money: amount, type: "Deduct", userId: Botinfo.UserId })

    if (res.status == "ok") {

      alert("Successfully Deduct...!!")
      navigateToContacts()
    } else {
      alert("Error Please enter")
    }

    setAmount(0)

  }


  return (
    <>
      <div className="mb-6 w-full rounded-lg bg-white px-[42px] py-5 dark:border dark:border-darkblack-400 dark:bg-darkblack-600 lg:mb-0 lg:w-1/2 2xl:mb-6 2xl:w-full">
        <div className="my-wallet mb-8 w-full">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-bgray-900 dark:text-white">
              Player Information
            </h3>
          </div>

          <div className="flex justify-center">
            <div className="card-slider relative w-[100px] md:w-[100px]">

              <div className="w-full">
                <img src={host + "/upload/avatar/1.jpg"} alt="card" />
              </div>

            </div>
          </div>
        </div>
        <div className="w-full">

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Player Name :- {userInfo.UserName}
            </p>
          </div>
          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Eamil :- {userInfo.email}
            </p>
          </div>

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Player Id :- {userInfo.uniqueId}
            </p>
          </div>

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Mobile Number :- {userInfo.MobileNo}
            </p>
          </div>

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Status :- {userInfo.Status}
            </p>
          </div>

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Main Wallet :- {userInfo.MainWallet}
            </p>
          </div>

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Win Wallet :- {userInfo.WinWallet}
            </p>
          </div>

          <div className="flex h-[50px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Bonus Wallet :- {userInfo.WinWaBonusWalletlet}
            </p>
          </div>

          <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
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
          </div>


          <button aria-label="none" onClick={SaveChange}
            className="mt-7 bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Add Money</button>



          <div className="flex h-[98px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
            <p className="text-sm font-medium text-bgray-600 dark:text-bgray-50">
              Enter amount Deduct
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
          </div>

          <button aria-label="none" onClick={SaveChangeDeduct}
            className="mt-7 bg-red-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm">Deduct Money</button>

        </div>
      </div>
    </>
  );
}

export default userInfo;
