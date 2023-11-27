import Link from "next/link";
import Minter from "../Minter";

export default function Success() {
    return (
        <>
            <h1 className="text-black text-6xl font-medium mb-5">Minting Successful</h1>
            <img className="w-1/12 mb-9" src="https://i.imgur.com/06N63Ey.png" alt="" />
            <Link href={"/"} ><button className='bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44' >Try again</button></Link>
        </>
    )
}