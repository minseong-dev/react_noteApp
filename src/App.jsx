import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, createContext, useReducer } from "react";
import Home from "./pages/Home";
import Note from "./pages/Note";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
`;

export const NoteStateContext = createContext();
export const NoteDispatchContext = createContext();

function reducer(state, action) {
    let tempData;

    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE":
            tempData = [action.data, ...state];
            break;
        case "UPDATE":
            tempData = state.map((item) =>
                String(item.id) === String(action.data.id) ? action.data : item
            );
            break;
        case "DELETE":
            tempData = state.filter(
                (item) => String(item.id) !== String(action.data)
            );
            break;
        default:
            state;
    }

    localStorage.setItem("notes", JSON.stringify(tempData));
    return tempData;
}

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    useEffect(() => {
        const storedData = localStorage.getItem("notes");
        if (!storedData) {
            return;
        }

        let parsedData = JSON.parse(storedData);
        if (!Array.isArray(parsedData)) {
            return;
        }

        let maxId = 0;
        parsedData.forEach((item) => {
            if (Number(item.id) > Number(maxId)) {
                maxId = Number(item.id);
            }
        });

        idRef.current = maxId + 1;

        dispatch({
            type: "INIT",
            data: parsedData,
        });
    }, []);

    const onCreate = (createdDate, title, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createdDate,
                title,
                content,
            },
        });
    };

    const onUpdate = (id, createdDate, title, content) => {
        dispatch({
            type: "UPDATE",
            data: {
                id,
                createdDate,
                title,
                content,
            },
        });
    };

    const onDelete = (id) => {
        dispatch({
            type: "DELETE",
            data: id,
        });
    };

    return (
        <>
            <Wrapper>
                <NoteStateContext.Provider value={data}>
                    <NoteDispatchContext.Provider
                        value={{ onCreate, onUpdate, onDelete }}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/note" element={<Note />}>
                                <Route path=":id" element={<Note />} />
                            </Route>
                        </Routes>
                    </NoteDispatchContext.Provider>
                </NoteStateContext.Provider>
            </Wrapper>
        </>
    );
}

export default App;
