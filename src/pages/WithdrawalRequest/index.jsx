
import WithdrawalTab from "./WithdrawalTab";

function WithdrawalRequest() {
  return (
    <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="2xl:w-100 w-full 2xl:mb-0 mb-6">
          <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
            <div className="flex flex-col space-y-5">
              <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                User Withdrawal
              </h3>

              <WithdrawalTab />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default WithdrawalRequest;

// <section className="2xl:flex-1 w-full">
//           <Wallet />
//           <TeamChat />
//         </section>