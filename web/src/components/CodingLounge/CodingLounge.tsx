import React, { useState } from 'react'
import { MdAccessTimeFilled } from "react-icons/md"
import { GiEarthAmerica } from "react-icons/gi"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { AiTwotoneCalendar } from "react-icons/ai"
import { format, parse, addMinutes } from "date-fns";
import Calendar from './Calendar/Calendar'
import "./CodingLounge.css";

const CodingLounge = () => {

    const timeData = ["9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm"]
    const [selectedDate, _setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [lastSelectedTime, setLastSelectedTime] = useState("");
    const [confirm, setConfirm] = useState(false)
    const [confirmDate, setConfirmDate] = useState("")

    const setSelectedDate = (date:any) => {
        _setSelectedDate(date);
        setSelectedTime("");
        setLastSelectedTime("");
    }

    const calculateDate = () => {
        if (selectedDate) {
            let startTime = parse(selectedTime, "hh:mma", selectedDate);
            let endTime = addMinutes(startTime, 30);
            return selectedTime + format(endTime, ' - h:mmaaa, EEEE, LLLL d, yyyy')
        }
        return ""
    }

  return (
    <div className="w-[100vw] h-[100vh] lg:h-[100vh] md:h-auto bg-[#fbfcfd] flex justify-center items-start tall:items-center">
      {
          !confirm ? (
            <div className="w-auto h-[40rem] bg-white border-[#e8e8e8] border-[1px] rounded-lg shadow-md flex lg:flex-col lg:h-auto md:flex-col md:h-auto">
                <div className='w-[27rem] md:w-[100%] lg:w-[46rem] h-full xl:border-r-[1.2px] p-7 font-semibold flex flex-col lg:items-center lg:border-b-[1.2px] md:items-center md:border-b-[1.2px]'>
                    <span className='text-[#767676] text-lg'>Hans Mao</span>
                    <h1 className='text-3xl text-[#1d1d1d]'>30 Minute Meeting</h1>
                    <div className='flex items-center gap-2 mt-5 text-[#737373]'>
                        <MdAccessTimeFilled size={28}/>
                        <span className='text-lg'>30 min</span>
                    </div>
                </div>
                <div className='flex justify-center lg:w-auto md:flex-col md:items-center'>
                    <div className='w-[27rem] h-full p-7 flex flex-col items-center md:w-[100%]'>
                        <span className='text-xl font-semibold w-full mb-3'>Select a Date & Time</span>
                        <Calendar setSelectedDate={setSelectedDate} dateConfirmed={selectedDate}/>
                        <div className='flex flex-col w-full mt-5'>
                            <span className='font-bold'>Time Zone</span>
                            <div className='p-2 flex gap-3 items-center text-[#1a1a1a]'>
                                <GiEarthAmerica />
                                <span>Pacific Time - US & Canada</span>
                            </div>
                        </div>
                    </div>
                    {
                        selectedDate !== null && (
                            <div className='flex flex-col w-[19rem] md:w-[100%] pt-[4rem] h-full lg:h-[35rem] md:h-[26rem] md:pt-[0rem]'>
                                <span className='mb-5 text-[1.05rem] md:text-[1.5rem] md:text-center sm:text-center'>{format(selectedDate, "EEEE, LLLL d")}</span>
                                <div className='flex flex-col gap-2 overflow-y-auto overflow-x-hidden md:items-center'>
                                    {timeData.map((time, index) => selectedTime !== time ? (
                                        <div className='w-[16rem] flex justify-between'>
                                            <button key={ `time-first-row-time-${index}`}
                                                onClick = {() => { 
                                                    setLastSelectedTime(selectedTime);
                                                    setSelectedTime(time) 
                                                }}
                                                className={`w-[16rem] pt-3.5 pb-3.5 border-[1.3px] border-[#89b5ff] rounded-md flex justify-center items-center hover:border-blue-500 hover:border-[1.6px]
                                                            ${lastSelectedTime === time && 'expand-origin-left'}`}>
                                                <span className='text-[#0069ff] font-bold'>{time}</span>
                                            </button>
                                            <button key={ `time-first-row-confirm-${index}`}
                                                className={`pt-3.5 pb-3.5 border-[1.3px] bg-[#0069ff] rounded-md flex justify-center items-center
                                                            ${lastSelectedTime !== time && 'hidden'}
                                                            ${lastSelectedTime === time && 'w-[0rem] shrink-confirm border-none'}`}>
                                                <span className='text-white font-bold'>Confirm</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='w-[16rem] flex justify-between'>
                                            <div key={ `time-rest-rows-time-${index}`}
                                                className={`w-[7.85rem] pt-3.5 pb-3.5 border-[1.3px] bg-[#696969] rounded-md flex justify-center items-center shrink-origin-left`}>
                                                <span className='text-white font-bold'>{time}</span>
                                            </div>
                                            <button key={ `time-rest-rows-confirm-${index}`}
                                                className={`w-[7.85rem] pt-3.5 pb-3.5 border-[1.3px] bg-[#0069ff] rounded-md flex justify-center items-center expand-origin-right`}
                                                onClick={() => { 
                                                    setConfirm(true)
                                                    setConfirmDate(calculateDate())
                                                    setLastSelectedTime("")
                                                    setSelectedTime("") 
                                                }
                                                }
                                                >
                                                <span className='text-white font-bold'>Confirm</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
          ) : (
            <div className="w-auto h-[40rem] bg-white border-[#e8e8e8] border-[1px] rounded-lg shadow-md flex lg:flex-col lg:h-auto md:flex-col md:h-auto">
                <div className='w-[27rem] md:w-[100%] lg:w-[46rem] h-full xl:border-r-[1.2px] p-7 font-semibold 
                                flex flex-col lg:items-center lg:border-b-[1.2px] md:items-center md:border-b-[1.2px] sm:items-center
                                lg:relative md:relative sm:relative'>
                    <button type="button" 
                            className="text-[#297bff] w-[3rem] h-[3rem] border border-[#e8e8e8] hover:bg-[#dfe8ff] 
                                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full 
                                       text-sm p-2.5 text-center inline-flex items-center
                                       lg:absolute lg:left-6 top-[10.8rem] tall:top-[3vh] md:absolute md:left-4 sm:w-[2.4rem] sm:h-[2.4rem] sm:p-1.5
                                       justify-center mb-5"
                            onClick={() => setConfirm(false)}>
                        <HiOutlineArrowLeft size={28}></HiOutlineArrowLeft>
                    </button>
                    <span className='text-[#767676] text-lg mt-36 tall:mt-0'>Hans Mao</span>
                    <h1 className='text-3xl text-[#1d1d1d]'>30 Minute Meeting</h1>
                    <div className='w-full h-auto lg:flex lg:justify-center lg:gap-x-5 lg:flex-wrap'>
                        <div className='flex items-center gap-2 mt-5 text-[#737373] lg:mt-3'>
                            <MdAccessTimeFilled size={28}/>
                            <span className='text-lg'>30 min</span>
                        </div>
                        <div className='flex gap-2 mt-3 text-[#737373]'>
                            <AiTwotoneCalendar size={28} />
                            <span>{confirmDate}</span>
                        </div>
                        <div className='flex gap-2 items-center mt-3 text-[#737373]'>
                            <GiEarthAmerica size={28} />
                            <span>Pacific Time - US & Canada</span>
                        </div>
                    </div>
                </div>
                <div className='flex lg:w-auto flex-col md:items-center p-7 lg:items-center'>
                    <p className='text-xl font-semibold'>Enter Details</p>
                    <div className='w-[30rem] flex flex-col mt-3 lg:w-[40rem] md:w-auto sm:w-auto'>
                        <div className='flex w-full justify-between gap-10 md:flex-col md:gap-0'>
                            <div className="mb-5 w-full">
                                <label id="default-input" className="block mb-2 text-sm font-medium text-gray-900">Name *</label>
                                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                            </div>
                            <div className="mb-5 w-full">
                                <label id="default-input" className="block mb-2 text-sm font-medium text-gray-900">Wechat ID *</label>
                                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label id="default-input" className="block mb-2 text-sm font-medium text-gray-900">Email (@berkeley.edu email) *</label>
                            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                        </div>
                        <div className="mb-6">
                            <label id="default-input" className="block mb-2 text-sm font-medium text-gray-900">描述下想在这期Coding Lounge里解决什么问题？（至少 80字，我们会根据回答分配合适的mentor。举个例子，如果是career planning，请描述更具体一点，比方说是关于graduate school的问题还是研究方向，etc) *</label>
                            <textarea id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[13vh]" required/>
                        </div>
                        <div className="mb-3 flex gap-7">
                            <label id="default-input" className="block mb-2 text-sm font-medium text-gray-900">有加Coding Lounge Q&A 微信群吗? *</label>
                            <div className="flex">
                                <div className="flex items-center h-5">
                                    <input id="helper-radio" aria-describedby="helper-radio-text" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" required/>
                                </div>
                                <div className="ml-2 text-sm">
                                    <label id="helper-radio" className="font-medium text-gray-900">有!</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label id="default-input" className="block mb-2 text-sm font-medium text-gray-900">Any questions? Any concerns?</label>
                            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type="button" className="w-[10rem] text-white bg-[#0069ff] hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"><span className='font-bold'>Schedule Event</span></button>
                        </div>
                    </div>
                </div>
            </div>
          )
      }
    </div>
  );
};
export default CodingLounge;
