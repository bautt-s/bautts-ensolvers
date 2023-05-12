type CreateModalType = {
    openCreate: Function
}

const CreateEdit: React.FC<CreateModalType> = (props) => {
    const { openCreate } = props

    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-[#00000060] flex items-center justify-center">
            <div className="bg-white flex flex-col w-[540px] px-[40px] py-[25px] rounded-lg shadow-xl">
                <h1 className="text-4xl font-semibold">Create/Edit Note</h1>

                <div className="flex flex-row mt-[25px] items-center">
                    <span className="w-[100px]">Title</span>
                    <input className="bg-white border-2 ml-[15px] w-full" />
                </div>

                <div className="flex flex-row mt-[15px] items-center">
                    <span className="w-[100px]">Content</span>
                    <textarea className="bg-white border-2 ml-[15px] w-full resize-none h-[100px] text-sm"></textarea>
                </div>

                <div className="flex flex-row mt-[15px] items-center">
                    <span className="w-[100px]">Categories</span>
                    <div className="w-full h-[100px] border-2 ml-[15px]">

                    </div>
                </div>

                <div className="flex flex-row mt-[15px]">
                    <input className="bg-white border-2 ml-[94px] w-full mr-[10px]" />
                    <button className='text-black font-semibold px-[15px] py-[5px] rounded-sm border-2 border-black'>Add</button>
                </div>

                <div className="flex flex-row mt-[35px] items-center justify-end">
                    <button className='bg-[#14213D] text-white font-semibold px-[15px] py-[5px] mr-[10px] rounded-sm' 
                    onClick={() => openCreate(false)}>
                        Cancel
                    </button>

                    <button className='bg-[#FCA311] text-white font-semibold px-[15px] py-[5px] rounded-sm'>Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateEdit