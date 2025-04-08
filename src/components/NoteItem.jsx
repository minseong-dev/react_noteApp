import "./NoteItem.css";

const NoteItem = ({ id, createdDate, title, content }) => {
    return (
        <div className="NoteItem">
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
