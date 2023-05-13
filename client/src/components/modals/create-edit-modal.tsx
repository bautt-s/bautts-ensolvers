import { useState } from 'react'
import { FaTag } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

// needed to type props. the optional parameters are used
// when the user opens the modal for edition purposes
type CreateModalType = {
    id?: number,
    noteTitle?: string,
    noteContent?: string,
    noteCategory?: string[],
    openCreate: Function
}

// interface needed to type the input attributes
interface inputInterface {
    title: string,
    content: string,
    category: string[]
}

const CreateEdit: React.FC<CreateModalType> = (props) => {
    const { openCreate, id, noteTitle, noteContent, noteCategory } = props

    // backend route to query from, based on if the app is deployed or not
    const backendRoute = process.env.REACT_APP_DEPLOYED ? 'https://bautts-ensolvers.onrender.com/notes' : 'http://localhost:3001/notes/'

    const [categoryInput, setCategoryInput] = useState('') // state used to keep track of the 'add category' input

    // state where all the input is stored. if this modal is opened for creation, it all
    // starts empty new. if it is used for edition, it uses the note's current values
    const [input, setInput] = useState<inputInterface>({
        title: noteTitle ? noteTitle : '',
        content: noteContent ? noteContent : '',
        category: noteCategory ? noteCategory : []
    })

    // dynamic handling of input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, att: string) => {
        setInput({
            ...input,
            [att]: e.target.value
        })
    }

    // handling of the 'add category' input changes
    const handleCategory = () => {
        if (!input.category.find(c => c === categoryInput)) {
            setInput({
                ...input,
                category: [...input.category, categoryInput]
            })
        }

        setCategoryInput('')
    }

    // handling of deleting a category in the general categories field
    const deleteCategory = (category: string) => {
        const updatedCategories = input.category.filter(c => c !== category);
        setInput({
            ...input,
            category: updatedCategories
        });
    }

    // handling of finally pressing the 'save' button. if this is used for
    // creation, than we send a POST request to the API. if this is edition,
    // we use the PUT route with the correspondant ID. 

    // simple error handling is implemented through the alert() modals.
    const handleSave = async () => {
        if (!id) {
            fetch(backendRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            }).then(response => {
                if (!response.ok) {
                    alert('There was an error creating/editing your note.')
                }
                return window.location.reload();
            })
        } else {
            const inputWithNonEmptyValues: any = {};
            Object.entries(input).forEach(([key, value]) => {
                if (value !== '' && value.length > 0) {
                    inputWithNonEmptyValues[key] = value;
                }
            });

            fetch(`${backendRoute}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputWithNonEmptyValues)
            }).then(response => {
                if (!response.ok) {
                    alert('There was an error creating/editing your note.')
                }
                return window.location.reload();
            })
        }
    }

    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-[#00000060] flex items-center justify-center">
            <div className="bg-white flex flex-col w-[400px] sm:w-[540px] px-[40px] py-[25px] rounded-lg shadow-xl">
                <h1 className="text-4xl font-semibold">Create/Edit Note</h1>

                <div className="flex flex-row mt-[25px] items-center">
                    <span className="w-[100px]">Title</span>
                    <input className="bg-white border-2 ml-[15px] w-full text-sm px-2"
                        value={input.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'title')} />
                </div>

                <div className="flex flex-row mt-[15px] items-center">
                    <span className="w-[100px]">Content</span>
                    <textarea className="bg-white border-2 ml-[15px] w-full resize-none h-[100px] text-sm p-2"
                        value={input.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e, 'content')}>
                    </textarea>
                </div>

                <div className="flex flex-row mt-[15px] items-center">
                    <span className="w-[100px]">Categories</span>
                    <div className="w-full h-[100px] border-2 ml-[15px] grid grid-cols-3 gap-5 overflow-y-auto pl-[15px]">
                        {input.category.map((c: string, index: number) => {
                            return (
                                <div key={index} className='flex flex-row items-center'>
                                    <FaTag className='text-sm' />
                                    <span className='ml-[5px] font-mono'>{c}</span>
                                    <ImCross className='ml-[10px] mt-[2px] text-xs hover:text-[#FCA311] transition-all duration-300'
                                        onClick={() => deleteCategory(c)} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-row mt-[15px]">
                    <input className="bg-white border-2 ml-[94px] w-full mr-[10px] text-sm px-2" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} />
                    <button className='text-black font-semibold px-[15px] py-[5px] rounded-sm border-2 border-black hover:bg-gray-100 transition-all duration-300'
                        onClick={handleCategory}>
                        Add
                    </button>
                </div>

                <div className="flex flex-row mt-[35px] items-center justify-end">
                    <button className='bg-[#1e345f] hover:bg-[#101725] text-white font-semibold px-[15px] py-[5px] mr-[10px] rounded-sm transition-all duration-300'
                        onClick={() => openCreate(false)}>
                        Cancel
                    </button>

                    <button className='bg-[#FCA311] hover:bg-[#db9017] text-white font-semibold px-[15px] py-[5px] rounded-sm transition-all duration-300'
                        onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEdit