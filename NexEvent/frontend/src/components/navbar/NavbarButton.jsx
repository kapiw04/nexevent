export default function NavbarButton(props) {
  if (props.outline === true) {
    console.log("outline is true for " + props.children + " button");
    return (
      <div className="flex align-middle p-8">
        <button
          className="text-2xl relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-br from-primary to-accent group-hover:from-primary group-hover:to-accent hover:text-white"
          onClick={props.onClick}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 hover:shadow-xl">
            {props.children}
          </span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex align-middle p-8">
        <button className="text-2xl" onClick={props.onClick}>
          <span className="">{props.children}</span>
        </button>
      </div>
    );
  }
}
