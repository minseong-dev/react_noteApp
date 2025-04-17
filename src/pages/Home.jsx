import Header from "../components/Header";
import Button from "../components/Button";
import NoteItem from "../components/NoteItem";
import { useState, useContext } from "react";
import { NoteStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    flex: 1;

    width: 100%;
    height: calc(100% - 63px);

    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MenuBar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`;

const MenuInput = styled.input`
    flex: 1;

    background-color: #494949;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0px 10px;

    &::placeholder {
        color: white;
        opacity: 1;
    }
`;

const MenuSelect = styled.select`
    background-color: #494949;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
`;

const ListWrapper = styled.div`
    flex: 1;

    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Home = () => {
    const data = useContext(NoteStateContext);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const nav = useNavigate();

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const onChangeSortOrder = (e) => {
        setSortOrder(e.target.value);
    };

    const getFilteredData = () => {
        let tempData = data;

        if (search !== "") {
            tempData = tempData.filter(
                (item) =>
                    item.title.toUpperCase().includes(search.toUpperCase()) ||
                    item.content.toUpperCase().includes(search.toUpperCase())
            );
        }

        if (sortOrder === "latest") {
            tempData.sort((a, b) => b.createdDate - a.createdDate);
        } else if (sortOrder === "oldest") {
            tempData.sort((a, b) => a.createdDate - b.createdDate);
        }

        return tempData;
    };

    const filteredData = getFilteredData();

    return (
        <>
            <Header />
            <Wrapper>
                <MenuBar>
                    <MenuInput
                        value={search}
                        onChange={onChangeSearch}
                        placeholder="검색어를 입력하세요"
                    />
                    <MenuSelect value={sortOrder} onChange={onChangeSortOrder}>
                        <option value={"latest"}>최신순</option>
                        <option value={"oldest"}>오래된 순</option>
                    </MenuSelect>
                </MenuBar>
                <ListWrapper>
                    {filteredData.map((item) => (
                        <NoteItem key={item.id} {...item} />
                    ))}
                </ListWrapper>
                <BtnWrapper>
                    <Button
                        onClick={() => nav("/note")}
                        text="추가"
                        type="POSITIVE"
                    />
                </BtnWrapper>
            </Wrapper>
        </>
    );
};

export default Home;
