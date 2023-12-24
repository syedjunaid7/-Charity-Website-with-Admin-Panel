import Card from "./Card";
import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <div className="dashBoard-container">
      <h1 className="admin-heading" style={{fontSize : "2.6rem"}}>
        Admin <span style={{ color: "#0ea5e9" }}> Panel Dashboard </span>
      </h1>
      <Card />
    </div>
  );
}
