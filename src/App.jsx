import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Note from "./pages/Note";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { initNotes } from "./features/noteSlice";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
`;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedData = localStorage.getItem("notes");
        if (!storedData) return;

        const parsed = JSON.parse(storedData);
        if (!Array.isArray(parsed)) return;

        dispatch(initNotes(parsed));
    }, [dispatch]);

    return (
        <>
            <Wrapper>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/note" element={<Note />}>
                        <Route path=":id" element={<Note />} />
                    </Route>
                </Routes>
            </Wrapper>
        </>
    );
}

export default App;
