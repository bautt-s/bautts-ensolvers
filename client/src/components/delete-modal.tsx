type DeleteModalType = {
    openDelete: Function
}

const DeleteModal: React.FC<DeleteModalType> = (props) => {
    const { openDelete } = props

    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-[#00000060] flex items-center justify-center">
            <div className="bg-white flex flex-col w-[540px] px-[40px] py-[25px] rounded-lg shadow-xl">
                <span>Are you sure you want to delete this note?</span>
                <div className="flex justify-end mt-[15px] font-semibold">
                    <button className="w-[60px] border-2 rounded-sm hover:bg-gray-200 transition-all duration-300">
                        Yes
                    </button>

                    <button onClick={() => openDelete(false)}
                    className="w-[60px] border-2 rounded-sm ml-[10px] hover:bg-gray-200 transition-all duration-300">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal