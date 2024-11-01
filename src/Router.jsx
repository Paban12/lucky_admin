import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HomeTwo from "./pages/homeTwo";
import Statistics from "./pages/statistics";
import Analytics from "./pages/analytics";
import Transaction from "./pages/transaction";
import MyWallet from "./pages/myWallet";
import Inbox from "./pages/inbox";
import Integrations from "./pages/integrations";
import Users from "./pages/users";
import Calender from "./pages/calender";
import History from "./pages/history";
import Support from "./pages/supportTicket";
import Settings from "./pages/settings";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ComingSoon from "./pages/commingSoon";
import Error from "./pages/error";
import Layout from "./component/layout";
import PersonalInfo from "./pages/settings/personal-info";
import Notification from "./pages/settings/notifaction";
import ProgramAndResources from "./pages/settings/program&resourses";
import Payment from "./pages/settings/payment";
import Faq from "./pages/settings/faq";
import Security from "./pages/settings/security";
import TermsAndCondition from "./pages/settings/terms&condition";
import HomeFive from "./pages/homeFive";


import Dashboard from "./pages/dashboard";
import GameHistory from "./pages/GameHistory";
import GameLogic from "./pages/gameLogic";
import BotList from "./pages/Bot";
import BotUpdate from "./pages/BotUpdate";
import Deposit from "./pages/Deposit";
import PayoutPendding from './pages/Payoutpendding'
import SocialURL from './pages/SocialURL'
import NoitceText from './pages/NoticeText'
import NotificationList from './pages/Notification'
import BannerList from './pages/Banner'
import Botadd from './pages/Botadd'
import PlayerAdd from './pages/Playeradd'
import Mail from './pages/Mail'
import Playeredit from './pages/PlayerUpdate'
import CoinManagement from './pages/CoinManagement'
import Chnagepwd from './pages/Chnagepwd'
import UserTransaction from "./pages/UserTransaction";
import TransactionEdit from "./pages/UserTransaction/TransactionEdit";
import WithdrawalRequest from "./pages/WithdrawalRequest";
import WithdrawalEdit from "./pages/WithdrawalRequest/WithdrawalEdit";
import BlackNWhiteGameHistory from "./component/gameHistory/BlackNWhite";




const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/home-3",
        element: <Statistics />,
      },
      {
        path: "/home-4",
        element: <Analytics />,
      },
      
      {
        path: "/gamehistory",
        element: <GameHistory />,
      },
      {
        path: "/gamehistory_black_n_white",
        element: <BlackNWhiteGameHistory />,
      },
      {
        path: "/gamelogic",
        element: <GameLogic />,
      },
      {
        path: "/botList",
        element: <BotList />,
      },
      {
        path: "/botUpdate",
        element: <BotUpdate />,
      },
      {
        path: "/botAddinfo",
        element: <Botadd />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/userTransaction",
        element: <UserTransaction />,
      },
      {
        path: "/userPaymentEdit",
        element: <TransactionEdit />,
      },
      {
        path: "/withdrawalList",
        element: <WithdrawalRequest />,
      },
      {
        path: "/withdrawalEdit",
        element: <WithdrawalEdit />,
      },
      {
        path: "/playeradd",
        element: <PlayerAdd />,
      },
      {
        path: "/playeredit",
        element: <Playeredit />,
      },
      {
        path: "/depositList",
        element: <Deposit />,
      },
      {
        path: "/payoutpendding",
        element: <PayoutPendding />,
      },
      {
        path: "/coinmanagement",
        element: <CoinManagement />,
      },
      {
        path: "/socialurl",
        element: <SocialURL />,
      },
      {
        path: "/noticetext",
        element: <NoitceText />,
      },
      {
        path: "/mail",
        element: <Mail />,
      },
      {
        path: "/notificationlist",
        element: <NotificationList />,
      },
      {
        path: "/bannerlist",
        element: <BannerList />,
      },
      {
        path: "/security",
        element: <Chnagepwd />,
      },
      {
        path: "/settings",
        Component: Settings,
        children: [
          {
            index: true,
            element: <PersonalInfo />,
          },
          {
            path: "notification",
            element: <Notification />,
          },
          {
            path: "program&resources",
            element: <ProgramAndResources />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "faq",
            element: <Faq />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "terms&conditions",
            element: <TermsAndCondition />,
          },
        ],
      },
      {
        path: "/my-wallet",
        element: <MyWallet />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/support-ticket",
        element: <Support />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/home-5",
    element: <HomeFive />,
  },
  {
    path: "/404",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
