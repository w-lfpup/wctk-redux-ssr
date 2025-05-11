/*
  store.ts

  This module creates and exports a redux store. It uses
  one reducer to account for a list of circles and squares.

  This is a vanilla redux store. Redux does NOT need any
  modifications to work alongside Lit or webcomponents.
*/
import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialShapeState = { squares: 0, circles: 0, shapeList: [] };
const removeShape = (shapes, shape) => {
    const index = shapes.lastIndexOf(shape);
    if (index > -1) {
        shapes.splice(index, 1);
    }
};
const shapeSlice = createSlice({
    name: 'shapes',
    initialState: initialShapeState,
    reducers: {
        reset: state => {
            state.circles = 0;
            state.squares = 0;
            state.shapeList = [];
        },
        increment_squares: state => {
            state.squares += 1;
            state.shapeList.push('square');
        },
        decrement_squares: state => {
            state.squares -= 1;
            removeShape(state.shapeList, 'square');
        },
        increment_circles: state => {
            state.circles += 1;
            state.shapeList.push('circle');
        },
        decrement_circles: state => {
            state.circles += 1;
            removeShape(state.shapeList, 'circle');
        },
    }
});
const store = configureStore({
    reducer: shapeSlice.reducer
});
export { store };
