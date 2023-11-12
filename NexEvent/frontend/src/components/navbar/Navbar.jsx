import NavbarButton from "./NavbarButton";
import logo from "../../assets/nexevent-logo.png";
import { useAuth } from "../../hooks/AuthContext";

function Navbar() {
  const { isLoggedIn, logOut } = useAuth();

  return (
    <nav className="grid grid-cols-3 p-1 shadow-md">
      <div className="flex justify-start">
        <img src={logo} alt="" className="w-32" />
      </div>
      <div className="flex justify-center">
        <NavbarButton
          onClick={() => {
            window.location.href = "/";
          }}
          outline={false}
        >
          Home
        </NavbarButton>
        {isLoggedIn ? (
          <NavbarButton
            onClick={() => {
              window.location.href = "/my-events";
            }}
            outline={false}
          >
            My Events
          </NavbarButton>
        ) : null}
      </div>

      <div className="flex justify-end">
        {isLoggedIn ? (
          <NavbarButton
            onClick={() => {
              localStorage.removeItem("token");
              logOut();
            }}
            outline={true}
          >
            Log Out
          </NavbarButton>
        ) : (
          <div className="flex ">
            <NavbarButton
              onClick={() => {
                window.location.href = "/login";
              }}
              outline={false}
            >
              Log in
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                window.location.href = "/signup";
              }}
              outline={true}
            >
              Sign up
            </NavbarButton>
          </div>
        )
        }
      </div>
    </nav >
  );
}


export default Navbar;
