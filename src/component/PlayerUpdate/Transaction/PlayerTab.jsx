import React, { useState, useContext, useEffect } from 'react';
import ProtoTypes from "prop-types";
import CustomerInfo from "./PlayerInfo";
import offerContext from '../../../context/offerContext';
import { useNavigate, useLocation } from 'react-router-dom';

function PlayerTab({ UserId, gameName }) {

  //-------------------------------------------------------------------------------------------------------
  const [active, setActive] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const Dropdown = (item) => {
    setPageSize(item)
    setActive(!active)
  }
  //------------------------------------------------------------------------------------------------------------
  const location = useLocation();
  const Botinfo = location.state;
  console.log(" Botinfo.UserId ", Botinfo)
  let [gameHistoryData, setGameHistoryData] = useState([]);

  const context = useContext(offerContext)
  const { GetBlackandWhiteHistoryData, aviatorHistoryData, GetCompleteWithdrawalData,GetUserWithdrawalData, GetCompleteDespositeData, GetRegisterReferralBonusData } = context


  useEffect(() => {
    const submitdata = async () => {
      setGameHistoryData([])
      // <HistoryTable gameName="AviatorGame"/>
      // <HistoryTable gameName="BlackandWhite"/>
      // <HistoryTable gameName="Withdrawal"/>
      // <HistoryTable gameName="Deposit"/>
      // <HistoryTable gameName="reffrel"/>
      console.log("gameName ",gameName)
      if (gameName == "Withdrawal") {
        let res=await GetUserWithdrawalData(Botinfo.UserId)
        setGameHistoryData(res)

        console.log("gameHistoryData ",gameHistoryData,res)

      } else if (gameName == "Deposite") {

        setGameHistoryData(await GetCompleteDespositeData( Botinfo.UserId))
      }
      // else if(gameName == "Withdrawal"){

      //   SetcompleteWithdrawal(await GetCompleteWithdrawalData())
      // }else if(gameName == "Deposit"){

      //   SetcompleteDeposite(await GetCompleteDespositeData())
      // }else if(gameName == "reffrel"){

      //   SetmyReferral(await GetMyReferralData())
      // }

      // SetrouletteHistory(await GetRouletteHistoryData(userID) )
      // SetcompleteWithdrawal(await GetCompleteWithdrawalData(userID) )
      // SetcompleteDeposite(await GetCompleteDespositeData(userID) )
      // SetregisterReferralBonus(await GetRegisterReferralBonusData(userID))
      // SetmyReferral(await GetMyReferralData(userID) )


    }
    submitdata()
  }, [gameName]);

  //--------------------------- Paggeation and No Of Pages ------------------------------------
  // Filter the user data based on date range and search term
  let filteredUsers = []
  if(gameHistoryData && gameHistoryData.length > 0){
    filteredUsers = gameHistoryData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).filter((user) => {
      console.log("User :::::::::::::::::::::::::::::::::::::::::::::",user)
      const registrationDate = new Date(user.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      return (
        (!from || registrationDate >= from) &&
        (!to || registrationDate <= to) &&
        (searchTerm === '' ||
          user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.PhoneNumber.includes(searchTerm))
      );
    });
  }

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the user data for the current page
  const usersOnCurrentPage = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetDate = () => {
    setFromDate("")
    setToDate("")
  }
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    let hours = dateObject.getHours();
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, '0');
  
    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  };
  //-----------------------------------------------------------------------------------------------


  return (
    <>
      <div className="flex h-[56px] w-full space-x-4">
        <div className="hidden h-full rounded-lg border border-transparent bg-bgray-100 px-[18px] focus-within:border-success-300 dark:bg-darkblack-500 sm:block sm:w-70 lg:w-88">
          <div className="flex h-full w-full items-center space-x-[15px]">
            <span>
              <svg
                className="stroke-bgray-900 dark:stroke-white"
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9.80204"
                  cy="10.6761"
                  r="8.98856"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.0537 17.3945L19.5777 20.9094"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <label htmlFor="listSearch" className="w-full">
              <input
                type="text"
                id="listSearch"
                placeholder="Search by name, email, or others..."
                className="search-input w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-bgray-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="filter-content w-full">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          <input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ marginLeft: "1rem" }}
          />
          <button aria-label="none"
            className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm" onClick={resetDate}>Reset</button>


        </div>
      </div>

      <div className="table-content w-full overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-bgray-300 dark:border-darkblack-400">
              
              <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    Date Time
                  </span>
                  <span>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.332 1.31567V13.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.66602 13.3157V1.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                    Name
                  </span>
                  <span>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.332 1.31567V13.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.66602 13.3157V1.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 xl:px-0">
                <div className="flex items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Mobile	
                  </span>
                  <span>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.332 1.31567V13.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.66602 13.3157V1.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              <td className="w-[165px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Withdrawal
                  </span>
                  <span>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.332 1.31567V13.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.66602 13.3157V1.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              <td className="w-[165px] px-6 py-5 xl:px-0">
                <div className="flex w-full items-center space-x-2.5">
                  <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  status
                  </span>
                  <span>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.332 1.31567V13.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.66602 13.3157V1.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                        stroke="#718096"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              
            </tr>
            {usersOnCurrentPage?.map((user, index) =>
              pageSize
                ? index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user._id}
                    createdAt={formatDate(user.createdAt)}
                    uniqueId={user.userId?.name}
                    oppWinningChips={user.userId?.mobileNumber}
                    trnxAmount={user.amount}
                    totalBucket={user.status}

                  />
                )
                : index < 3 && (
                  <CustomerInfo
                    key={user._id}
                    createdAt={formatDate(user.createdAt)}
                    uniqueId={user.userId?.name}
                    oppWinningChips={user.userId?.mobileNumber}
                    trnxAmount={user.amount}
                    totalBucket={user.status}

                  />
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-content w-full">
        <div className="flex w-full items-center justify-center lg:justify-between">
          <div className="hidden items-center space-x-4 lg:flex">
            <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
              Show result:
            </span>
            <div className="relative">
              <button
                aria-label="none"
                onClick={() => setActive(!active)}
                type="button"
                className="flex items-center space-x-6 rounded-lg border border-bgray-300 px-2.5 py-[14px] dark:border-darkblack-400"
              >
                <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
                {pageSize}
                </span>
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                      stroke="#A0AEC0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id="result-filter"
                style={{ display: active ? "block" : "none" }}
                className="absolute right-0 top-14 z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <ul>
                  {[5, 10, 20, 25, 50].map((item) => (
                    <li
                      key={item}
                      onClick={() => Dropdown(item)}
                      className="text-bgray-90 cursor-pointer px-5 py-2 text-sm font-medium hover:bg-bgray-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5 sm:space-x-[35px]">
            <button aria-label="none" type="button" onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-sm font-semibold text-bgray-600 dark:text-bgray-50"
            >
              Previous
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
                    stroke="#A0AEC0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <button aria-label="none" type="button" onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-sm font-semibold text-bgray-600 dark:text-bgray-50"
            >
              Next
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
                    stroke="#A0AEC0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

PlayerTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default PlayerTab;
