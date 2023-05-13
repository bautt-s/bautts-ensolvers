// needed to type props
type DeleteModalType = {
    openDelete: Function,
    id: number
}

const DeleteModal: React.FC<DeleteModalType> = (props) => {
    const { openDelete, id } = props

    // backend route to query from, based on if the app is deployed or not
    const backendRoute = process.env.REACT_APP_DEPLOYED ? 'https://bautts-ensolvers.onrender.com/notes' : 'http://localhost:3001/notes/'

    const handleDelete = async () => {
        await fetch(`${backendRoute}/${id}`, {
            method: 'DELETE'
        })

        return window.location.reload();
    }

    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-[#00000060] flex items-center justify-center">
            <div className="bg-white flex flex-col w-[540px] px-[40px] py-[25px] rounded-lg shadow-xl">
                <span>Are you sure you want to delete this note?</span>
                <div className="flex justify-end mt-[15px] font-semibold">
                    <button className="w-[60px] border-2 rounded-sm hover:bg-gray-200 transition-all duration-300"
                            onClick={handleDelete}>
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