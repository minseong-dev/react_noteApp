import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    background-color: #dadada;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;

    display: flex;
    justify-content: space-between;

    * {
        margin: 0px;
    }
`;

const NoteWrapper = styled.div`
    width: calc(100% - 80px);
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const DateWrapper = styled.div`
    min-width: 80px;

    p {
        text-align: right;
        font-size: 12px;
    }
`;

const NoteItem = ({ id, createdDate, title, content }) => {
    const nav = useNavigate();

    return (
        <Wrapper onClick={() => nav(`/note/${id}`)}>
            <NoteWrapper>
                <h2>{title}</h2>
                <p>{content}</p>
            </NoteWrapper>
            <DateWrapper>
                <p>{new Date(createdDate).toLocaleDateString()}</p>
            </DateWrapper>
        </Wrapper>
    );
};

export default NoteItem;
