import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useContext, useEffect } from 'react';
import offerContext from '../../context/offerContext';

function SuperUpi() {

    const context = useContext(offerContext)

    const { changeUpI, LogoutClick, getSuperAdminUpi } = context

    const [upiId, setupiId] = useState('');
    const [fileImage, setSelectedImage] = useState('');
    const [fileUrl, setImageUrl] = useState('');
    const [lastChanges, setLastChanges] = useState('');

    useEffect(() => {
        getsuparUpi()
    }, [])
    const getsuparUpi = async () => {
        let res = await getSuperAdminUpi()
        if(res){
            setImageUrl(res.imageUrl)
            setupiId(res.upiId)
            setLastChanges(res.modifiedAt)
        }
        
    }
    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/signin');
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = (er) => {
            setImageUrl(er.target.result)
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const changeUpiId = async () => {
        if (upiId) {
            const newBanner = {
                upiId: upiId,
                image: fileImage,
            };

            let res = await changeUpI(newBanner)
            console.log("REsponce ::::::::::::::::::::::", { res, newBanner })

            if (res.status == 1) {
                setupiId('');
                setSelectedImage('');
                alert(res.message)
                LogoutClick()
                navigateToContacts()

            } else {
                alert(res.message)
            }
        }
    };


    return (
        <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 mb-4">
            <div className="flex flex-col space-y-5">
                <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                    Change UPI
                </h3>
                <div className="mt-8">
                    <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Title"
                                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                            >
                                UPI Id
                            </label>
                            <input
                                type="text"
                                id="link"
                                placeholder="Enter UPI Id"
                                name="UPI"
                                value={upiId}
                                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                onChange={(e) => setupiId(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col-2 gap-10">
                            <div className='flex flex-col gap-2'>
                                <label
                                    htmlFor="Title"
                                    className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                                >
                                    QR Code
                                </label>
                                <input
                                    type="file"
                                    id="imageUrl"
                                    accept="image/*"
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {/* </div> */}
                            <div className="flex flex-col-2 gap-5">
                                <div>
                                <label
                                    htmlFor="Title"
                                    className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                                >
                                    QR Image Preview
                                </label>
                                {fileUrl &&
                                    <div className='w-[13rem] h-[10rem]'>
                                        <img className='w-100 h-[100%]' src={fileUrl} alt="" />
                                    </div>
                                }
                                </div>
                                <div>
                                <label
                                    htmlFor="Title"
                                    className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
                                >
                                   Last Chanes
                                </label>
                                {lastChanges &&
                                    <div className='w-[13rem] h-[10rem] font-bold'>
                                        {lastChanges}
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            aria-label="none"
                            className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
                            onClick={changeUpiId}
                        >
                            Change UPI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SuperUpi;