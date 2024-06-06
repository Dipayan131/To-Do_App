import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-orange-600 text-white h-16 px-4">
      <div className="flex-1"></div>
      <div className="logo">
        <span className="font-bold text-3xl">To-Do</span>
      </div>
      <div className="flex-1 flex justify-end">
        <Link to="/oldtask"><button className="mr-4 border border-white px-4 py-2 rounded-xl">Your Old Tasks</button></Link>
      </div>
    </nav>
  );
}

export default Navbar;
