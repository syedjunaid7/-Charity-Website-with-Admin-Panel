import "./TopBar.scss";
import { FaHands } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <h2>
            Bodhi Charity
            <span
              style={{
                transform: "translate(6px,2px)",
                display: "inline-block",
              }}
            >
              <FaHands />
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
