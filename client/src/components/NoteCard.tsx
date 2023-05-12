import { FaStickyNote, FaArchive, FaPen, FaTrash, FaUpload } from 'react-icons/fa'

type NoteCardType = {
    title: string,
    content: string,
    active: boolean,
    index: number,
    openCreate: Function,
    openDelete: Function
}

const NoteCard: React.FC<NoteCardType> = (props) => {
    const { title, content, active, index, openCreate, openDelete } = props

    return (
        <div key={index} className='flex flex-row w-[540px] rounded-lg px-[5px] py-[5px] border-[2px] hover:border-[#FCA311] group'>
            <div className='flex flex-row items-center'>
                <FaStickyNote className='text-6xl text-[#14213D] group-hover:scale-105 transition-transform duration-300' />

                <div className='flex flex-col ml-[10px]'>
                    <h1 className='font-bold'>{title}</h1>
                    <span className=''>{content.length > 45 ? content.slice(0, 45) + '...' : content}</span>
                </div>
            </div>

            <div className='flex flex-row items-end ml-auto'>
                {active ? <FaArchive className='text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' /> 
                : <FaUpload className='text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' />}

                <FaPen className='ml-[10px] text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' onClick={() => openCreate(true)} />

                <FaTrash className='ml-[10px] text-[#14213D] hover:text-[#FCA311] transition-colors duration-300' onClick={() => openDelete(true)} />
            </div>
        </div>
    )
}

export default NoteCard