type FilterType = {
    categories: string[],
    setFilteredNotes: Function
}

const Filter: React.FC<FilterType> = (props) => {
    const { categories, setFilteredNotes } = props

    return (
        <div className="flex flex-row items-center ml-[50px] mt-[40px]">
            <span>Category:</span>

            <select className="border-2 ml-[10px] w-[200px]" onChange={(e) => setFilteredNotes(e.target.value)}>
                <option value=''>All</option>
                {categories.map(c => {
                    return (
                        <option value={c}>{c}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Filter