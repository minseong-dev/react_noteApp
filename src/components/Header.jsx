import "./Header.css";

const Header = ({ leftChild }) => {
    return (
        <div className="Header">
            <div className="Header_left">{leftChild}</div>
            <div className="Header_center">Simple Notes</div>
            <div className="Header_right"></div>
        </div>
    );
};

export default Header;
