/*
  store.ts

  This module creates and exports a redux store. It uses
  one reducer to account for a list of circles and squares.

  This is a vanilla redux store. Redux does NOT need any
  modifications to work alongside Lit or webcomponents.
*/

import type { Reducer, Action } from '@reduxjs/toolkit';

import { configureStore, createSlice } from '@reduxjs/toolkit';

type Shape = 'square' | 'circle';
type RemoveShape = (state: Shape[], shape: Shape) => void;

interface ShapeState {
	circles: number;
	squares: number;
	shapeList: Shape[];
}

const initialShapeState: ShapeState = { squares: 0, circles: 0, shapeList: [] };

const removeShape: RemoveShape = (shapes: Shape[], shape: Shape) => {
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

export type { ShapeState, Shape };
export { store };