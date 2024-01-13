import PropTypes from "prop-types";
import { useState } from 'react';
import { BsStack } from "react-icons/bs";
import { CgCalendarDates } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { GrAttachment } from "react-icons/gr";
import Modal from "../Modal/Modal";
const SingleCard = ({card}) => {
    const [showModal, setShowModal] = useState(false);
    const { cardDescription, cardComments, cardAttachmentIds, dateOfCreation, joiners, checklist , clientInformation, cardCreatorInformation } = card;
  return (
    <div>
        <div className="bg-[#FFFFFF] rounded p-4 my-4">
            <div className="flex justify-between text-xs font-bold">
                <div><img className="rounded-full w-6 inline-block mr-1" src={clientInformation.profileImage} alt="" /><span>{clientInformation.name}</span></div>
                <div><img className="rounded-full w-6 inline-block mr-1" src={cardCreatorInformation.profileImage} alt="" />{cardCreatorInformation.name}</div>
            </div>
            <div className="flex my-3 items-center">
                <h1 className="text-xs truncate text-ellipsis"><BsStack className="inline-block" /> {cardDescription}</h1>
                <span className="flex items-center bg-[#F2F4F7] p-0.5 rounded"><FaClipboardList /> <span>{checklist.filter(list => list.status === true).length}/{checklist.length}</span> </span>
            </div> 
            <div className="flex items-center justify-between">
                {
                    joiners.length > 2 ? <span>{joiners.slice(0,2).map((element,id)=> {
                        return <img className="rounded-full w-6 inline-block mr-2" key={id} src={element.profileImage} alt="" />
                    })} <span className="rounded-full p-1 bg-[#F2F4F7] text-xs">{joiners.length - 2}+</span></span> : <span>{joiners.map((element,id) => {
                        return <img key={id} src={element.profileImage} alt="" /> 
                    })} </span>
                }
                
                <span className="flex text-xs items-center"> <FaRegComments className="mr-0.5" /> <span>{cardComments.length}</span></span>
                <span className="flex text-xs items-center cursor-pointer" onClick={()=>setShowModal(true)}><GrAttachment className="mr-0.5" /><span>{cardAttachmentIds.length}</span></span>
                <span className="flex text-xs items-center"> <CgCalendarDates className="mr-0.5"/> <span>{dateOfCreation}</span></span>
            </div>
        </div>
         {showModal && <Modal card= {card} onClose={()=> setShowModal(false)}></Modal> }
    </div>

    
  )
}
SingleCard.propTypes = {
    card: PropTypes.object.isRequired
  };
export default SingleCard