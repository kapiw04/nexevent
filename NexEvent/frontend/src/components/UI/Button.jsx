export default function Button({ children, onClick }) {
  return (
    <div className="flex align-middle p-8">
      <button
        onClick={onClick}
        className="p-3 text-center rounded-lg bg-gradient-to-br from-primary to-accent group-hover:from-primary group-hover:to-accent text-white transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.25]"
      >
        <span className="font-semibold text-3xl transition-all duration-300 ease-linear">
          {children}
        </span>
      </button>
    </div>
  );
}
