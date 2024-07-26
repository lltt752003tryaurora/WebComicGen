import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        "thinh": "deptrai",
    },
});

export default store;