const initialState = { openClose: "closed", content: "" };

export default (state = initialState, action) => {
    if (action.type === "OPEN_MODAL") {
        return action.payload;
    }
    return state;
};
