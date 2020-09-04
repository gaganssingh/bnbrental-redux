const initialState = {};

export default (state = initialState, action) => {
    if (action.type === "REGISTER_ACTION") {
        return action.payload;
    } else if (action.type === "LOGOUT") {
        return initialState;
    }
    return state;
};
