import Header from "../components/Header";
import Button from "../components/Button";
import NoteItem from "../components/NoteItem";
import { useState, useContext } from "react";
import { NoteStateContext } from "../App";
import { useNavigate } from "react-router-dom";

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
            tempData = tempData.filter((item) =>
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
            <div className="Home">
                <div className="menu_bar">
                    <input
                        value={search}
                        onChange={onChangeSearch}
                        placeholder="검색어를 입력하세요"
                    />
                    <select value={sortOrder} onChange={onChangeSortOrder}>
                        <option value={"latest"}>최신순</option>
                        <option value={"oldest"}>오래된 순</option>
                    </select>
                </div>
                <div className="list_wrapper">
                    {filteredData.map((item) => (
                        <NoteItem key={item.id} {...item} />
                    ))}
                </div>
                <div className="button_wrapper">
                    <Button
                        onClick={() => nav("/note")}
                        text="추가"
                        type="POSITIVE"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
