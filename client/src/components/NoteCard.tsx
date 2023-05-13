import { FaStickyNote, FaArchive, FaPen, FaTrash, FaUpload } from 'react-icons/fa'
import CreateEdit from './modals/create-edit-modal'
import ModalArchive from './modals/modal-archive'
import DeleteModal from './modals/delete-modal'
import NoteModal from './modals/note-modal'
import { useState } from 'react'

// need to type props
type NoteCardType = {
    id: number,
    title: string,
    content: string,
    active: boolean,
    category: string[]
    index: number,
}

const NoteCard: React.FC<NoteCardType> = (props) => {
    const { id, title, content, active, category, index } = props

    // control the opened/closed state of each modal
    const [modalArchive, setModalArchive] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalNote, setModalNote] = useState(false)

    return (
        <>
            <div key={index} className='flex flex-row w-[440px] md:w-[540px] rounded-lg px-[5px] py-[5px] border-[2px] hover:border-[#FCA311]'>
                <div className='flex flex-row items-center'>
                    <FaStickyNote className='text-6xl text-[#14213D] hover:scale-105 transition-transform duration-300' onClick={() => setModalNote(true)} />

                    <div className='flex flex-col ml-[10px]'>
                        <h1 className='font-bold'>{title}</h1>
                        <span className='hidden md:contents'>{content.length > 45 ? content.slice(0, 45) + '...' : content}</span>
                        <span className='contents md:hidden'>{content.length > 30 ? content.slice(0, 30) + '...' : content}</span>
                    </div>
                </div>

                <div className='flex flex-row items-end ml-auto'>
                    {active ? <FaArchive className='text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' onClick={() => setModalArchive(true)}/>
                        : <FaUpload className='text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' onClick={() => setModalArchive(true)}/>}

                    <FaPen className='ml-[10px] text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' onClick={() => setModalCreate(true)} />

                    <FaTrash className='ml-[10px] text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' onClick={() => setModalDelete(true)} />
                </div>
            </div>

            {modalDelete && <DeleteModal openDelete={setModalDelete} id={id} />}
            {modalArchive && <ModalArchive openArchive={setModalArchive} id={id} active={active} />}
            {modalNote && <NoteModal openNote={setModalNote} title={title} content={content} category={category} />}
            {modalCreate && <CreateEdit openCreate={setModalCreate} id={id} noteTitle={title} noteContent={content} noteCategory={category} />}
        </>
    )
}

export default NoteCard