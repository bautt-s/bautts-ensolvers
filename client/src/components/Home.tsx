import { useState, useEffect } from 'react'
import NoteCard from './NoteCard'
import CreateEdit from './create-edit-modal'
import DeleteModal from './delete-modal'

type NotesType = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    content: string,
    category: string,
    active: boolean
}

const Home: React.FC = () => {
    const [notes, setNotes] = useState([])
    const [modalCreate, setModalCreate] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('http://localhost:3001/notes/');
            const data = await response.json();

            setNotes(data)
        }

        fetchNotes()
    }, [])

    return (
        <div className="w-screen h-screen bg-[#E5E5E5] flex justify-center items-center py-[40px]">
            <div className="w-[1200px] h-full bg-white rounded-lg shadow-2xl">
                <div className="bg-[#14213D] flex flex-row py-[40px] px-[40px] rounded-t-lg">
                    <h1 className="text-4xl font-semibold text-[#FFFCF2]">My Notes</h1>

                    <div className="flex flex-row ml-auto">
                        <button className="text-[#FFFCF2]">Archived Notes</button>

                        <button className="text-md bg-[#FCA311] py-[10px] rounded-md flex text-[#000000] 
                        font-semibold active:bg-[#d68e1a] transition-all duration-300 px-[20px] ml-[30px]"
                                onClick={() => setModalCreate(true)}>
                            New Note
                        </button>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <div className='mt-[40px] grid grid-cols-2 gap-[25px] items-center'>
                        {notes.map((n: NotesType, index: number) => {
                            return <NoteCard index={index} title={n.title} content={n.content} 
                            active={n.active} openCreate={setModalCreate} openDelete={setModalDelete} />
                        })}
                    </div>
                </div>
            </div>

            {modalCreate && <CreateEdit openCreate={setModalCreate} />}
            {modalDelete && <DeleteModal openDelete={setModalDelete} />}
        </div>
    )
}

export default Home