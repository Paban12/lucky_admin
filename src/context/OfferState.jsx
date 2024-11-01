
import offerContext from "./offerContext"
import React, { useState, useEffect } from 'react';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const host = "http://api.blackandwhitegame.in:3030" // "http://192.168.0.203:2828"//"http://luckyhits.in:2828"; //
// const host = "http://93.127.185.201:3838" // "http://192.168.0.203:2828"//"http://luckyhits.in:2828"; //
// const host = "http://localhost:3030" // "http://192.168.0.203:2828"//"http://luckyhits.in:2828"; //
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ5Y2NlM2JhNDA4YTJlMjg3ZjJlYzUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNpc3VnYW16LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHhZZzVMUlNRRWxiNENOZnVocjdncmUyUjNMOUQ5eDhaWmc0c0QxSW9uY1N6ZWFTSHgzMTIuIiwiY3JlYXRlZEF0IjoiMjAyMy0xMS0wN1QwNTozNjozNS42NjBaIiwibW9kaWZpZWRBdCI6IjIwMjMtMTEtMDdUMDU6MzY6MzUuNjYwWiIsImlhdCI6MTY5OTMzNTQxMywiZXhwIjoxNjk5OTQwMjEzfQ.NrLsWSnyD09P3h30rsng_R3bygn3TsKl8nXyD7qom4c";

const OfferState = (props) => {
    // console.log("props.adminname ",props.adminname)
    // console.log("props.adminname Email ",props.adminname)

    //props.adminname
    //props.adminEmail
    const [adminname, setAdminname] = useState();
    const [adminEmail, setAdminEmail] = useState();
    const [token, setToken] = useState(cookies.get('token'));


    const LogoutClick = async () => {

        setToken("")
        cookies.set('token', "");
        return false
    }

    const dashboardData = async (data) => {
        try {

            const response = await fetch(`${host}/admin/dashboard?fromDate=${data.fromDate}&toDate=${data.toDate}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                console.log("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 45")

                LogoutClick()
                return {}
            } else {
                return await json
            }
        } catch (e) {
            console.log("e :", e)
        }
    }

    const latatestUser = async () => {
        try {

            console.log("${host}/admin/latatestUser", `${host}/admin/dashboard/latatestUser`)
            const response = await fetch(`${host}/admin/dashboard/latatestUser`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')//token
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :Recent Player  latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                console.log("dffffffffffffffffffffffffffffffffffffffffffffffffff", cookies.get('token'))
                console.log("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 75")

                LogoutClick()

                console.log("dffffffffffffffffffffffffffffffffffffffffffffffffff", cookies.get('token'))

                return []
            } else {
                return await json.RecentUser
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    // ========= User Details =================

    const PlayerList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/user/UserList`)
            const response = await fetch(`${host}/admin/user/UserList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)


            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.userList
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const PlayerAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/user/AddUser`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const PlayerDelete = async (userId) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/user/DeleteUser/` + userId, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const PlayerData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/user/UserData`)
            const response = await fetch(`${host}/admin/user/UserData?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)


            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json.userInfo
            }

        } catch (e) {
            console.log("e :", e)
        }
    }
    // History 
    const GetBlackandWhiteHistoryData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/userhistory/UserData`, userId)
            const response = await fetch(`${host}/admin/userhistory/BackandWhiteHistory?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetBlackandWhiteHistoryData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.BlackandWhiteData
            }




        } catch (e) {
            console.log("e :", e)
        }
    }

    // History 
    const aviatorHistoryData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/userhistory/aviatorHistory`, userId)
            const response = await fetch(`${host}/admin/userhistory/aviatorHistory?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :aviatorHistoryData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.aviatorHistoryData
            }




        } catch (e) {
            console.log("e :", e)
        }
    }

    const GetCompleteWithdrawalData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/userhistory/completeWithdrawal`, userId)
            const response = await fetch(`${host}/admin/userhistory/completeWithdrawal?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetCompleteWithdrawalData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.completeWithdrawalData
            }
        } catch (e) {
            console.log("e :", e)
        }
    }
    const GetUserWithdrawalData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/withdrawal/userRequestList`, userId)
            const response = await fetch(`${host}/admin/withdrawal/userRequestList/` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetCompleteWithdrawalData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.result
            }
        } catch (e) {
            console.log("e :", e)
        }
    }
    const GetUserDespositeData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/manualPayment/userPaymentHistory`, userId)
            const response = await fetch(`${host}/admin/manualPayment/userPaymentHistory/` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetCompleteWithdrawalData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.result
            }
        } catch (e) {
            console.log("e :", e)
        }
    }
    const GetCompleteDespositeData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/userhistory/completeDeposite`, userId)
            const response = await fetch(`${host}/admin/userhistory/completeDeposite?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetCompleteDespositeData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()
                return []
            } else {
                return await json.completeDepositeData
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const GetRegisterReferralBonusData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/userhistory/registerRaferralBonus`, userId)
            const response = await fetch(`${host}/admin/userhistory/registerRaferralBonus?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetRegisterReferralBonusData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.registerRaferralBonusData
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const GetMyReferralData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/userhistory/myRaferrals`, userId)
            const response = await fetch(`${host}/admin/userhistory/myRaferrals?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :GetMyReferralData :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.myRaferralsData
            }

        } catch (e) {
            console.log("e :", e)
        }
    }


    const AddMoney = async (data) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/user/addMoney`, data)
            const response = await fetch(`${host}/admin/user/addMoney`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(data => data.json())

            const json = response
            console.log("data api from :AddMoney :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }


    const DeductMoney = async (data) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/user/deductMoney`, data)
            const response = await fetch(`${host}/admin/user/deductMoney`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(data => data.json())

            const json = response
            console.log("data api from :DeductMoney :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    //======================
    // game History 

    const BlackWhiteGameHistory = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/games/blackwhitegamehistory`)
            const response = await fetch(`${host}/admin/games/blackwhitegamehistory`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.gameHistoryData
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const AviatorGameHistory = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/games/aviatorGameHistory`)
            const response = await fetch(`${host}/admin/games/aviatorGameHistory`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.gameHistoryData
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const GetGameLogic = async (gamename) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/games/getgamelogic`)
            const response = await fetch(`${host}/admin/games/getgamelogic?gamename=` + gamename, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json.logic
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const GameLogicSet = async (data) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/games/gameLogicSet`)
            const response = await fetch(`${host}/admin/games/gameLogicSet`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    //================= socail List 

    const SocailURLsList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}//admin/social/socialURLsList`)
            const response = await fetch(`${host}/admin/social/socialURLsList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.socialURLs
            }



        } catch (e) {
            console.log("e :", e)
        }
    }

    const SocailURLsAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/social/socialurl`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)


            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const DeleteSocailURLs = async (socialid) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/social/socialurldelete/` + socialid, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    //=============================


    //================= coin Management

    const CoinsList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}//admin/coin/coinlist`)
            const response = await fetch(`${host}/admin/coin/coinlist`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                console.log("data api from :CoinsList :::...", json.coinlist)


                return await json.coinlist
            }



        } catch (e) {
            console.log("e :", e)
        }
    }

    const CoinPackeAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/coin/coinadded`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)


            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const DeleteCoinpack = async (socialid) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/coin/coindelete/` + socialid, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    //=============================



    //================= Notice  List 

    const NoticeTextList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}//admin/noticetext/noticeTextList`)
            const response = await fetch(`${host}/admin/noticetext/noticeTextList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.noticeText
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const NoticeTextLsAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/noticetext/noticeText`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const DeleteNoticeText = async (id) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/noticetext/noticedelete/` + id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)


            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    //=============================



    //================= Mail  List 

    const mailList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}//admin/mail/mailList`)
            const response = await fetch(`${host}/admin/mail/mailList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return await json.maillist

            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const MailsAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/mail/mailInsert`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const DeleteMail = async (id) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/mail/maildelete/` + id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)


            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    //=============================


    //================= gamementenance  List 

    const GetMentenance = async () => {
        try {
            console.log("PlayerList :::::::", `${host}//admin/gamementenance/getMentenanceStatus`)
            const response = await fetch(`${host}/admin/gamementenance/getMentenanceStatus`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const MentenanceUpdate = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/gamementenance/mentenanceStatusUpdate`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify({ flag: data })
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }



    //=============================


    //================= notification  List 

    const SendPushnotification = async (data) => {
        try {
            console.log("PlayerList :::::::", `${host}//admin/notification/sendNotification`)
            const response = await fetch(`${host}/admin/notification/sendNotification`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(data => data.json())

            const json = response
            console.log("data api from :SendPushnotification :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }
    //=================================================

    //================= Banner   List 

    const BannerList = async () => {
        try {

            console.log("PlayerList :::::::", `${host}//admin/banner/bannerList`)
            const response = await fetch(`${host}/admin/banner/bannerList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json.bannerListData
            } else {
                return await json.bannerListData
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const BannerAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/banner/bannerAdd`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const getSuperAdminUpi = async () => {
        try {

            console.log("PlayerList :::::::", `${host}//admin/manualPayment/superAdminUpi`)
            const response = await fetch(`${host}/admin/manualPayment/superAdminUpi`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :getSuperAdminUpi :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }
    const changeUpI = async (data) => {
        console.log(data);

        try {
            console.log("PlayerList :::::::", host)
            const formData = new FormData();
            formData.append("image", data.image);
            formData.append("upiId", data.upiId);
            const response = await fetch(`${host}/admin/manualPayment/superAdminUpi`, {
                method: 'POST',
                headers: {
                    'token': cookies.get('token')
                },
                body: formData
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }
    const getUserTransaction = async () => {
        try {

            console.log("PlayerList :::::::", `${host}//admin/manualPayment/userPayment`)
            const response = await fetch(`${host}/admin/manualPayment/userPayment`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :getSuperAdminUpi :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json.result
            } else {
                return await json.result
            }


        } catch (e) {
            console.log("e :", e)
        }
    }
    const userPaymentVerify = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/manualPayment/verifyUserPayment`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }
    const getUserWithdrawalList = async () => {
        try {

            console.log("PlayerList :::::::", `${host}//admin/withdrawal/requestList`)
            const response = await fetch(`${host}/admin/withdrawal/requestList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :getSuperAdminUpi :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json.result
            } else {
                return await json.result
            }


        } catch (e) {
            console.log("e :", e)
        }
    }
    const userWithdrawalVerify = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/withdrawal/verifyRequest`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)
            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }
    const UploadBanner = async (data) => {
        try {
            console.log("PlayerList :::::::", host)

            const formData = new FormData();
            formData.append("image", data);

            const response = await fetch(`${host}/admin/banner/BannerUpload`, {
                method: 'POST',
                headers: {
                    'token': cookies.get('token')
                },
                body: formData
            }).then(d => d.json())

            console.log("response ", response)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                if (json.flag) {
                    return json.path
                } else {
                    return ""
                }
            }



        } catch (e) {
            console.log("e :", e)
        }
    }


    const DeleteBanner = async (id) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/banner/bannerdelete/` + id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    //=============================


    // ========= Bot Details =================

    const BotList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/bot/UserList`)
            const response = await fetch(`${host}/admin/bot/BotList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.userList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }



    const BotAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/bot/BotAdd`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const UploadProfile = async (data) => {
        try {
            console.log("PlayerList :::::::", host)

            const formData = new FormData();
            formData.append("image", data);

            const response = await fetch(`${host}/admin/bot/ProfileUpload`, {
                method: 'POST',
                headers: {
                    'token': cookies.get('token')
                },
                body: formData
            }).then(d => d.json())

            console.log("response ", response)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return ""
            } else {
                if (json.flag) {
                    return json.path
                } else {
                    return ""
                }
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const BotDelete = async (userId) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/bot/BotDelete/` + userId, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const BotData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/bot/BotData`)
            const response = await fetch(`${host}/admin/bot/BotData?userId=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json.userInfo
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const BotUpdate = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            console.log("BotUpdate :::::::", data)

            const response = await fetch(`${host}/admin/bot/BotUpdate`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    //======================================================================================


    // ========= Deposite List  Details =================

    const DepositeList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/usertransction/DepositList`)
            const response = await fetch(`${host}/admin/usertransction/DepositList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.DepositeList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const DepositeAccptedList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/usertransction/AcceptList`)
            const response = await fetch(`${host}/admin/usertransction/AcceptList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.AcceptList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const DepositeRejectedList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/usertransction/RejectList`)
            const response = await fetch(`${host}/admin/usertransction/RejectList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.RejectList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const DepositeAdd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/bot/BotAdd`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const UploadScreenshort = async (data) => {
        try {
            console.log("PlayerList :::::::", host)

            const formData = new FormData();
            formData.append("image", data);

            const response = await fetch(`${host}/admin/bot/ProfileUpload`, {
                method: 'POST',
                headers: {
                    'token': cookies.get('token')
                },
                body: formData
            }).then(d => d.json())

            console.log("response ", response)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return ""
            } else {
                if (json.flag) {
                    return json.path
                } else {
                    return ""
                }
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const DepositeDelete = async (userId) => {
        try {
            console.log("PlayerList :::::::", host)
            const response = await fetch(`${host}/admin/bot/BotDelete/` + userId, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(d => d)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    const DepositeData = async (userId) => {
        try {
            console.log("PlayerList :::::::", `${host}/usertransction/DepositData?id=` + userId)
            const response = await fetch(`${host}/admin/usertransction/DepositData?id=` + userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json.DepositeData
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const DepositeUpdate = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            console.log("DepositeUpdate :::::::", data)

            const response = await fetch(`${host}/admin/usertransction/DepositeUpdate`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }
    //===============================================

    // ========= Payout Details =================

    const PayoutList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/usertransction/PayoutList`)
            const response = await fetch(`${host}/admin/usertransction/PayoutList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.PayoutList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const PayoutAccptedList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/usertransction/PayoutAcceptList`)
            const response = await fetch(`${host}/admin/usertransction/PayoutAcceptList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.AcceptList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const PayoutRejectedList = async () => {
        try {
            console.log("PlayerList :::::::", `${host}/admin/usertransction/PayoutRejectList`)
            const response = await fetch(`${host}/admin/usertransction/PayoutRejectList`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                }
            }).then(data => data.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return []
            } else {
                return json.RejectList
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const PayoutUpdate = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            console.log("PayoutUpdate :::::::", data)

            const response = await fetch(`${host}/admin/usertransction/payoutUpdate`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return {}
            } else {
                return json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    const UploadScreenshortPayout = async (data) => {
        try {
            console.log("PlayerList :::::::", host)

            const formData = new FormData();
            formData.append("image", data);

            const response = await fetch(`${host}/admin/usertransction/UploadScreenShortPayOut`, {
                method: 'POST',
                headers: {
                    'token': cookies.get('token')
                },
                body: formData
            }).then(d => d.json())

            console.log("response ", response)

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return ""
            } else {
                if (json.flag) {
                    return json.path
                } else {
                    return ""
                }
            }


        } catch (e) {
            console.log("e :", e)
        }
    }

    //=================================


    const Chnageidpwd = async (data) => {
        try {
            console.log("PlayerList :::::::", host)
            console.log("PlayerList ::::::: data ", data)

            const response = await fetch(`${host}/admin/signup-admin-update`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': cookies.get('token')
                },
                body: JSON.stringify(data)
            }).then(d => d.json())

            const json = response
            console.log("data api from :latatestUser :::...", json)

            if (json.message != undefined && (json.message == "jwt expired" || json.message == "Unauthorized access")) {
                LogoutClick()

                return json
            } else {
                return await json
            }

        } catch (e) {
            console.log("e :", e)
        }
    }

    return (
        <offerContext.Provider value={{ 
            host,
            adminname, adminEmail, dashboardData, latatestUser, PlayerList, PlayerData,
            PlayerAdd, PlayerDelete, BlackWhiteGameHistory, AviatorGameHistory, GameLogicSet, GetGameLogic, GetBlackandWhiteHistoryData, aviatorHistoryData, GetCompleteWithdrawalData,
            GetCompleteDespositeData, GetRegisterReferralBonusData, GetMyReferralData,
            SocailURLsList, SocailURLsAdd, DeleteSocailURLs,GetUserWithdrawalData,GetUserDespositeData,
            CoinsList, CoinPackeAdd, DeleteCoinpack,
            NoticeTextList, NoticeTextLsAdd, DeleteNoticeText,
            mailList, MailsAdd, DeleteMail,
            GetMentenance, MentenanceUpdate,
            SendPushnotification, changeUpI, getSuperAdminUpi, getUserTransaction, userPaymentVerify,
            BannerList, BannerAdd, DeleteBanner, UploadBanner, getUserWithdrawalList, userWithdrawalVerify,
            BotList, BotAdd, BotDelete, BotData, UploadProfile, BotUpdate,
            AddMoney, DeductMoney, LogoutClick,
            DepositeList, DepositeAccptedList, DepositeRejectedList, DepositeAdd, UploadScreenshort, DepositeDelete, DepositeData, DepositeUpdate,
            PayoutList, PayoutAccptedList, PayoutRejectedList, PayoutUpdate, UploadScreenshortPayout,
            Chnageidpwd
        }}>
            {props.children}
        </offerContext.Provider>)

}
//LogoutClick,
export default OfferState;