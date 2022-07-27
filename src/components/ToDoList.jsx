import React from "react";
import ListHeader from "./ListHeader/ListHeader";
import List from "./List/List";
import ListFooter from "./ListFooter/ListFooter";

export default function ToDoList () {
    return (
        <>
            <ListHeader />
            <List />
            <ListFooter />
        </>
    )
}
