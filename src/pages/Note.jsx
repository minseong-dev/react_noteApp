import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState, useContext } from "react";
import { NoteStateContext, NoteDispatchContext } from "../App";

const Note = () => {
    const params = useParams();
    const nav = useNavigate();
    const data = useContext(NoteStateContext).find(
        (item) => String(item.id) === String(params.id)
    );

    const [inputData, setInputData] = useState(data);

    const { onUpdate, onDelete } = useContext(NoteDispatchContext);

    const onClickUpdate = () => {
        onUpdate(
            params.id,
            new Date().getTime(),
            inputData.title,
            inputData.content
        );
        nav(-1, { replace: true });
    };

    const onClickDelete = () => {
        onDelete(params.id);
        nav(-1, { replace: true });
    };

    const onChangeInputData = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />
            <div className="Note">
                <div className="button_top">
                    <Button onClick={() => nav(-1)} text={"뒤로"} type={""} />
                </div>
                <div className="title_wrapper">
                    <input
                        onChange={onChangeInputData}
                        name="title"
                        value={inputData.title}
                        placeholder="제목을 입력하세요"
                    />
                </div>
                <div className="content_wrapper">
                    <textarea
                        onChange={onChangeInputData}
                        name="content"
                        value={inputData.content}
                        placeholder="내용을 입력하세요"
                    />
                </div>
                <div className="button_bottom">
                    <Button
                        onClick={onClickDelete}
                        text={"삭제"}
                        type={"NEGATIVE"}
                    />
                    <Button
                        onClick={onClickUpdate}
                        text={"수정"}
                        type={"POSITIVE"}
                    />
                </div>
            </div>
        </>
    );
};

export default Note;
