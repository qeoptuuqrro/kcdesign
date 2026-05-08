import RightMenu from "./RightMenu";
import { getAssetPath } from "../utils/paths";

export default function Navbar({ items, activeId, onSelect }) {
  return (
    <header className="site-header">
      <a className="logo-mark" href="#home" aria-label="Go to home">
        <img className="logo-image" src={getAssetPath("/logo.png")} alt="" />
      </a>
      <RightMenu items={items} activeId={activeId} onSelect={onSelect} />
    </header>
  );
}
