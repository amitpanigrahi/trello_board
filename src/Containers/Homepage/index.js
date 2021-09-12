import React from "react";
import MainBoard from "../../Components/MainBoard";
import BoardContextProvider from "./BoardContext";


const HomePageContainer = () => {
    return (
        <BoardContextProvider>
            <MainBoard/>
        </BoardContextProvider>
    );
};

export default HomePageContainer;
