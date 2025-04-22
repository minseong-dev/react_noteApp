import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// prettier-ignore
import { createNote, updateNote, deleteNote } from "../features/noteSlice";

const Wrapper = styled.div`
    flex: 1;

    width: 100%;
    height: calc(100% - 63px);

    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
`;

const TitleInput = styled.input`
    flex: 1;
    background-color: #dadada;
    padding: 10px 20px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

const ContentTextarea = styled.textarea`
    background-color: #dadada;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    resize: none;
    box-sizing: border-box;
`;

const BtnBottomEdit = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BtnBottomNew = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Note = () => {
    const params = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes);
    const nextId = Math.max(...notes.map((note) => Number(note.id)), 0) + 1;

    const targetNote = notes.find(
        (note) => String(note.id) === String(params.id)
    );

    const [inputData, setInputData] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        if (targetNote) {
            setInputData({
                title: targetNote.title,
                content: targetNote.content,
            });
        }
    }, [targetNote]);

    const onChangeInputData = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const onClickCreate = () => {
        dispatch(
            createNote({
                id: nextId,
                createdDate: new Date().getTime(),
                title: inputData.title,
                content: inputData.content,
            })
        );
        nav(-1, { replace: true });
    };

    const onClickUpdate = () => {
        dispatch(
            updateNote({
                id: params.id,
                createdDate: new Date().getTime(),
                title: inputData.title,
                content: inputData.content,
            })
        );
        nav(-1, { replace: true });
    };

    const onClickDelete = () => {
        dispatch(deleteNote(params.id));
        nav(-1, { replace: true });
    };

    return (
        <>
            <Header />
            <Wrapper>
                <div>
                    <Button onClick={() => nav(-1)} text={"뒤로"} type={""} />
                </div>
                <TitleWrapper>
                    <TitleInput
                        onChange={onChangeInputData}
                        name="title"
                        value={inputData.title}
                        placeholder="제목을 입력하세요"
                    />
                </TitleWrapper>
                <ContentWrapper>
                    <ContentTextarea
                        onChange={onChangeInputData}
                        name="content"
                        value={inputData.content}
                        placeholder="내용을 입력하세요"
                    />
                </ContentWrapper>
                {params.id && (
                    <BtnBottomEdit>
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
                    </BtnBottomEdit>
                )}
                {!params.id && (
                    <BtnBottomNew>
                        <Button
                            onClick={onClickCreate}
                            text={"추가"}
                            type={"POSITIVE"}
                        />
                    </BtnBottomNew>
                )}
            </Wrapper>
        </>
    );
};

export default Note;
