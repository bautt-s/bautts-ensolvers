// needed to type props
type NoteModalType = {
    openNote: Function,
    title: string,
    content: string,
    category: string[],
}

const NoteModal: React.FC<NoteModalType> = (props) => {
    const { openNote, title, content, category } = props

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
            <div className='bg-[#00000060] w-screen h-screen absolute z-1' onClick={() => openNote(false)}></div>

            <div className="bg-[#F4CE5E] text-center flex flex-col justify-center w-[400px] sm:w-[600px] z-50 rounded-sm font-mono px-[20px] pb-[10px]">
                <div className="bg-[#E1544B] w-[200px] h-[50px] flex mx-auto relative bottom-[30px] opacity-70 skew-x-6 skew-y-2"></div>
                <h1 className="font-bold text-3xl">{title}</h1>
                <p className="text-xl mt-[20px] w-full">{content}</p>

                <div className="flex flex-row mt-[40px]">
                    <span>Categories:</span>
                    {category.map((c, index) => {
                        return (
                            <span key={index} className="ml-[5px]">
                                {c}{!(index===category.length-1) && ', '}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NoteModal