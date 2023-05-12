type ModalArchiveType = {
    openArchive: Function,
    id: number,
    active: boolean
}

const ModalArchive: React.FC<ModalArchiveType> = (props) => {
    const { openArchive, id, active } = props

    const handleArchive = async () => {
        if (active) {
            fetch(`http://localhost:3001/notes/disable`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            }).then(response => {
                if (!response.ok) {
                    alert('There was an error creating/editing your note.')
                }
                return window.location.reload();
            })
        } else {
            fetch(`http://localhost:3001/notes/enable`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
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
                <span>{`Are you sure you want to ${active ? 'archive' : 'unarchive'} this note?`}</span>
                <div className="flex justify-end mt-[15px] font-semibold">
                    <button className="w-[60px] border-2 rounded-sm hover:bg-gray-200 transition-all duration-300"
                            onClick={handleArchive}>
                        Yes
                    </button>

                    <button onClick={() => openArchive(false)}
                    className="w-[60px] border-2 rounded-sm ml-[10px] hover:bg-gray-200 transition-all duration-300">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalArchive