interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab = ({ label, active, onClick }: TabProps) => (
  <button
    className={`btn rounded-none w-full flex justify-start ps-4 md:pe-20 pe-15 ${
      label === "Sources" && "rounded-none rounded-tl-2xl"
    } ${active ? "btn-accent rounded-xl" : "active btn-outline "}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Tab;
