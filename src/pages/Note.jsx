import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { NoteStateContext, NoteDispatchContext } from "../App";
import styled from "styled-components";

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
    const data = useContext(NoteStateContext).find(
        (item) => String(item.id) === String(params.id)
    );

    const [inputData, setInputData] = useState({
        createdDate: new Date().getTime(),
        title: "",
        content: "",
    });

    useEffect(() => {
        if (data) {
            setInputData({
                createdDate: data.createdDate,
                title: data.title,
                content: data.content,
            });
        }
    }, [data]);

    const { onCreate, onUpdate, onDelete } = useContext(NoteDispatchContext);

    const onClickCreate = () => {
        onCreate(new Date().getTime(), inputData.title, inputData.content);
        nav(-1, { replace: true });
    };

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
