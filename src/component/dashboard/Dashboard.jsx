import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";

import offerContext from '../../context/offerContext'
import React, { useContext, useEffect, useState, useRef } from 'react';
import TotalWidgetCard from "./TotalWidgetCard";

function Dashboard() {

  const context = useContext(offerContext)
  const { dashboardData } = context
  let apiData = {}
  const [formVar, setFormVar] = useState({
    fromDate: "",
    toDate: ""
  })
  const [totalUser, settotalUser] = useState('');
  const [totalDeposit, settotalDeposit] = useState('');
  const [totalDepositPending, settotalDepositPending] = useState('');
  const [totalWithdraw, settotalWithdraw] = useState('');
  const [totalWithdrawPending, settotalWithdrawPending] = useState('');
  const [todayDeposit, settodayDeposit] = useState('');
  const [todayDepositPending, settodayDepositPending] = useState('');
  const [todayWithdraw, setTodaywithdraw] = useState('');
  const [todayWithdrawPending, setTodayWithdrawPending] = useState('');

  useEffect(() => {
    submitdata()
  }, []);
  const submitdata = async () => {
    apiData = await dashboardData({ fromDate:formVar.fromDate, toDate:formVar.toDate })

    if (apiData.totalUser != undefined)
      settotalUser(apiData.totalUser)

    if (formVar.fromDate && formVar.toDate){
      settotalDeposit(apiData.depositResult.betweenDateDeposits)
      settotalDepositPending(apiData.depositResult.betweenDateDepositsPending)
      settotalWithdraw(apiData.withdrawResult.betweenDateWithdraw)
      settotalWithdrawPending(apiData.withdrawResult.betweenDateWithdrawPending)
    }else{
      settotalDeposit(apiData.depositResult.totalDeposit)
      settotalDepositPending(apiData.depositResult.totalDepositPending)
      settotalWithdraw(apiData.withdrawResult.totalWithdraw)
      settotalWithdrawPending(apiData.withdrawResult.totalWithdrawPending)
    }
    if (apiData.depositResult != undefined)
      settodayDeposit(apiData.depositResult.todayDeposits)
    if (apiData.depositResult != undefined)
      settodayDepositPending(apiData.depositResult.todayDepositsPending)

    if (apiData.withdrawResult != undefined)
      setTodaywithdraw(apiData.withdrawResult.todayWithdraw)
    if (apiData.withdrawResult != undefined)
      setTodayWithdrawPending(apiData.withdrawResult.todayWithdrawPending)

    console.log("APIDATATATATA", apiData);
  }
  return (
    <div className="mb-[24px] w-full">
      <div className="w-full flex gap-10 pb-10">
        <div className="flex gap-10">
          <input type="date" name="" id="" max={formVar.toDate} onChange={(e) => (setFormVar((pre) => ({ ...pre, fromDate: e.target.value })))} />
          <input type="date" name="" id="" min={formVar.fromDate} onChange={(e) => (setFormVar((pre) => ({ ...pre, toDate: e.target.value })))}/>
        </div>
        <div>
          <button aria-label="none"
            className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent
             text-white rounded-lg px-4 py-3 font-semibold text-sm"
            onClick={submitdata}>Submit</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Users"
          amount={totalUser}
          groth="+ 3.5%"
          id="totalEarn"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Deposit"
          amount={totalDeposit}
          groth="+ 3.5%"
          id="totalSpending"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Deposit Pending"
          amount={totalDepositPending}
          groth="+ 3.5%"
          id="totalSpending"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Withdraw"
          amount={totalWithdraw}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Withdraw Pending"
          amount={totalWithdrawPending}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Deposit"
          amount={todayDeposit}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Deposit Pending"
          amount={todayDepositPending}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Withdraw"
          amount={todayWithdraw}
          groth="+ 3.5%"
          id="totalGoal"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Today Withdraw Pending"
          amount={todayWithdrawPending}
          groth="+ 3.5%"
          id="totalGoal"
        />
      </div>
    </div>
  );
}

export default Dashboard;
