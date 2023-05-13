import { useState, useEffect } from 'react'
import NoteCard from './NoteCard'
import CreateEdit from './modals/create-edit-modal'
import Filter from './filter'

// here I define a type for the notes, in order to have a well 
// typed structure when rendering each one from the general array
type NotesType = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    content: string,
    category: string[],
    active: boolean
}

const Home: React.FC = () => {
    const [notes, setNotes] = useState([])
    const [archived, setArchived] = useState(false) // state to change the view from active to archived notes, or viceversa
    const [modalCreate, setModalCreate] = useState(false) // state to open/close creation/edition modal
    const [filteredNotes, setFilteredNotes] = useState('') // state where the category filtering is kept

    const archivedNotes = notes?.filter((n: NotesType) => n.active === false) // array of archived notes with filter applied
    const activeNotes = notes?.filter((n: NotesType) => n.active === true) // array of active notes with filter applied

    // array of all categories, needed for the filtering selectBox to render as options
    // it selects categories from archived or active notes based on the current view
    const allCategories = archived ? [...new Set(archivedNotes.flatMap((n: NotesType) => n.category))] : [...new Set(activeNotes.flatMap((n: NotesType) => n.category))]

    // use of the hook to get all notes in initial rendering
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
                    <h1 className="text-4xl font-semibold text-[#FFFCF2]">{!archived ? 'My Notes' : 'Archived Notes'}</h1>

                    <div className="flex flex-row ml-auto">
                        {!archived ?
                            <>
                                <button className="text-[#FFFCF2] hover:underline underline-offset-4 decoration-[#FCA311]" onClick={() => setArchived(true)}>Archived Notes</button>

                                <button className="text-md bg-[#FCA311] py-[10px] rounded-md flex text-[#000000] 
                        font-semibold active:bg-[#d68e1a] transition-all duration-300 px-[20px] ml-[30px]"
                                    onClick={() => setModalCreate(true)}>
                                    New Note
                                </button>
                            </>
                            : <button className="text-[#FFFCF2] hover:underline underline-offset-4 decoration-[#FCA311]"
                                onClick={() => setArchived(false)}>Active Notes</button>}
                    </div>
                </div>

                <Filter categories={allCategories} setFilteredNotes={setFilteredNotes} />

                <div className='flex items-center justify-center'>
                    {filteredNotes === '' ? !archived ?
                        (activeNotes.length ?
                            <div className='flex overflow-y-auto'>
                                <div className='mt-[40px] grid grid-cols-2 gap-[25px] items-center'>
                                    {activeNotes.map((n: NotesType, index: number) => {
                                        return <NoteCard index={index} title={n.title} content={n.content} id={n.id} active={n.active} category={n.category} />
                                    })}
                                </div>
                            </div> : <span className='mt-[40px] text-3xl'>'There are no active notes.'</span>)

                        : (archivedNotes.length ?
                            <div className='flex overflow-y-auto'>
                                <div className='mt-[40px] grid grid-cols-2 gap-[25px] items-center'>
                                    {archivedNotes.map((n: NotesType, index: number) => {
                                        return <NoteCard index={index} title={n.title} content={n.content} id={n.id} active={n.active} category={n.category} />
                                    })}
                                </div>
                            </div> : <span className='mt-[40px] text-3xl'>'There are no archived notes.'</span>
                        )
                        : !archived ?
                        (activeNotes.length ?
                            <div className='flex overflow-y-auto'>
                                <div className='mt-[40px] grid grid-cols-2 gap-[25px] items-center'>
                                    {activeNotes.filter((n: NotesType) => n.category.includes(filteredNotes)).map((n: NotesType, index: number) => {
                                        return <NoteCard index={index} title={n.title} content={n.content} id={n.id} active={n.active} category={n.category} />
                                    })}
                                </div>
                            </div> : <span className='mt-[40px] text-3xl'>'There are no active notes.'</span>)

                        : (archivedNotes.length ?
                            <div className='flex overflow-y-auto'>
                                <div className='mt-[40px] grid grid-cols-2 gap-[25px] items-center'>
                                    {archivedNotes.filter((n: NotesType) => n.category.includes(filteredNotes)).map((n: NotesType, index: number) => {
                                        return <NoteCard index={index} title={n.title} content={n.content} id={n.id} active={n.active} category={n.category} />
                                    })}
                                </div>
                            </div> : <span className='mt-[40px] text-3xl'>'There are no archived notes.'</span>
                        )}
                </div>
            </div>

            {modalCreate && <CreateEdit openCreate={setModalCreate} />}
        </div>
    )
}

export default Home