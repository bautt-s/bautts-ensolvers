import { useState } from 'react'
import { FaTag } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

type CreateModalType = {
    id?: number,
    noteTitle?: string,
    noteContent?: string,
    noteCategory?: string[],
    openCreate: Function
}

interface inputInterface {
    title: string,
    content: string,
    category: string[]
}

const CreateEdit: React.FC<CreateModalType> = (props) => {
    const { openCreate, id, noteTitle, noteContent, noteCategory } = props
    const [categoryInput, setCategoryInput] = useState('')
    const [input, setInput] = useState<inputInterface>({
        title: noteTitle ? noteTitle : '',
        content: noteContent ? noteContent : '',
        category: noteCategory ? noteCategory : []
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, att: string) => {
        setInput({
            ...input,
            [att]: e.target.value
        })
    }

    const handleCategory = () => {
        if (!input.category.find(c => c === categoryInput)) {
            setInput({
                ...input,
                category: [...input.category, categoryInput]
            })
        }

        setCategoryInput('')
    }

    const deleteCategory = (category: string) => {
        const updatedCategories = input.category.filter(c => c !== category);
        setInput({
            ...input,
            category: updatedCategories
        });
    }

    const handleSave = async () => {
        if (id) {
            fetch('http://localhost:3001/notes/', {
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

            fetch(`http://localhost:3001/notes/${id}`, {
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
            <div className="bg-white flex flex-col w-[540px] px-[40px] py-[25px] rounded-lg shadow-xl">
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