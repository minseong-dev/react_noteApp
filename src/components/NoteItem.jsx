import "./NoteItem.css";
import { useNavigate } from "react-router-dom";

const NoteItem = ({ id, createdDate, title, content }) => {
    const nav = useNavigate();

    return (
        <div className="NoteItem" onClick={() => nav(`/note/${id}`)}>
            <div className="note_wrapper">
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
            <div className="date_wrapper">
                <p>{new Date(createdDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default NoteItem;
