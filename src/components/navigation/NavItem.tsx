function NavItem({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button
      key={name}
      className="text-black border-x border-black w-full h-full border-dashed cursor-pointer"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default NavItem;
