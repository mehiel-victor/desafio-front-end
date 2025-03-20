import Logo from "../common/Logo";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="bg-neutral-6 flex items-center p-5 shadow-lg">
        <Logo width={92} height={34} fill="#222222" />
      </div>
    </header>
  );
};

export default Header;
