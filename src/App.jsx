import { Routes, Route } from "react-router-dom";
import { useRef, createContext, useReducer } from "react";
import Home from "./pages/Home";
import Note from "./pages/Note";

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

export const NoteStateContext = createContext();
export const NoteDispatchContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return [action.data, ...state];
        case "UPDATE":
            return state.map((item) =>
                String(item.id) === String(action.data.id) ? action.data : item
            );
        case "DELETE":
            return state.filter(
                (item) => String(item.id) !== String(action.data)
            );
        default:
            state;
    }
}

function App() {
    const [data, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(4);

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
            <div className="App">
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
            </div>
        </>
    );
}

export default App;
