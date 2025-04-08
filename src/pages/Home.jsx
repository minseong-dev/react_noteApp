import Header from "../components/Header";
import Button from "../components/Button";
import NoteItem from "../components/NoteItem";
import { useState } from "react";

const mockData = [
    {
        id: 1,
        createdDate: new Date("2025-04-08").getTime(),
        title: "1",
        content: "1번 메모 내용",
    },
    {
        id: 2,
        createdDate: new Date("2025-04-08").getTime(),
        title: "2",
        content: "2번 메모 내용",
    },
    {
        id: 3,
        createdDate: new Date("2025-04-08").getTime(),
        title: "3",
        content: "3번 메모 내용",
    },
];

const Home = () => {
    const [data, setData] = useState(mockData);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");

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
                <Button text="추가" />
            </div>
        </div>
    );
};

export default Home;
