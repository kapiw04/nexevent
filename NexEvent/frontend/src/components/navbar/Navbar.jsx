import NavbarButton from "./NavbarButton";
import logo from "../../assets/nexevent-logo.png";

function Navbar() {
  return (
    <nav className="grid-cols-2 p-1">
      <div className="flex justify-between items-center">
        <img src={logo} alt="" className="w-32" />
        <div className="flex items-center space-x-4">
          <NavbarButton
            onClick={() => {
              console.log("Events button clicked!");
            }}
            outline={false}
          >
            Home
          </NavbarButton>
          <NavbarButton
            onClick={() => {
              console.log("Events button clicked!");
            }}
            outline={false}
          >
            Events
          </NavbarButton>
        </div>
        <NavbarButton
          onClick={() => {
            console.log("Events button clicked!");
          }}
          outline={true}
        >
          Log Out
        </NavbarButton>
      </div>
    </nav>
  );
}

export default Navbar;
