import GitHubIcon from "@material-ui/icons/GitHub";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import OrientationMenu from "../components/OrientationMenu";
import SettingsModal from "../components/SettingsModal";
import LoginMenu from "../components/LoginModal";
import { useEditor } from "../context/AppContext";

const Header = () => {
  const { language, startLogin, pfp } = useEditor();
  console.log(pfp);
  return (
    <nav className="flex items-center justify-between px-16 py-3 shadow-md bg-paper">
      {/* Logo */}
      <Link href="/">
        <a className="flex items-center gap-3 pointer">
          <h1 className="text-2xl font-bold tracking-wider text-white">
            CodeRockc
          </h1>
        </a>
      </Link>

      {/* Navigation buttons */}
      <div className="flex items-center justify-center gap-5 text-white">
        {language === "webd" && <OrientationMenu />}
        <SettingsModal />

        <a
          href="https://github.com/ShashwatR2k"
          className="flex items-center gap-2 px-4 py-2 rounded-md justify-evenly hover:text-textSecondary focus:outline-none"
        >
          <GitHubIcon />
        </a>
        <button
          onClick={() => {
            startLogin();
          }}
        >
          <PersonIcon />
        </button>
        <LoginMenu />
      </div>
    </nav>
  );
};

export default Header;
