import { Link } from "react-router-dom";

// originally, this would have been a login screen, but time did not help
function App() {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-[#14213D]">
			<div className="flex flex-col">
				<h1 className="text-center text-5xl text-[#FFFFFF] font-bold">Welcome to Notely!</h1>
				<h3 className="text-center text-2xl mt-[15px] text-[#FFFFFF]">An app to keep track of your most important thoughts.</h3>

				<Link to='/notes'>
					<button className="text-xl mt-[35px] bg-[#FCA311] py-[10px] rounded-md flex mx-auto px-[25px] text-[#000000] 
				font-semibold active:bg-[#d68e1a] transition-all duration-500 hover:scale-105">
						Check my Notes
					</button>
				</Link>
			</div>
		</div>
	);
}

export default App;