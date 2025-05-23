/*
  store.ts

  This module creates and exports a redux store. It uses
  one reducer to tally a list of circles and squares.

  This is a vanilla redux store. Redux does NOT need any
  modifications to work alongside the WCTK or webcomponents
  in general,.
*/

import type { Unsubscribe } from "@reduxjs/toolkit";
import { configureStore, createSlice } from '@reduxjs/toolkit';

// is not exported from redux toolkit
type ListenerCallback = () => {};

type Shape = 'square' | 'circle';

interface ShapeState {
	circles: number;
	squares: number;
	shapeList: Shape[];
}

const stateMap = document.querySelector('script[type=statemap]');
const initialShapeState: ShapeState = JSON.parse(stateMap.textContent);

function removeShape(shapeList: Shape[], shape: Shape) {
	const index = shapeList.lastIndexOf(shape);
	if (index > -1) {
		shapeList.splice(index, 1);
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
			state.squares = Math.max(0, state.squares - 1);
			removeShape(state.shapeList, 'square');
		},
		increment_circles: state => {
			state.circles += 1;
			state.shapeList.push('circle');
		},
		decrement_circles: state => {
			state.circles = Math.max(0, state.circles - 1);
			removeShape(state.shapeList, 'circle');
		},
	}
});

const datastore = configureStore({
	reducer: shapeSlice.reducer
});

function subscribe(cb: ListenerCallback): Unsubscribe {
	return datastore.subscribe(cb);
}

function unsubscribe(cb: Unsubscribe): void {
	cb();
}

export type { ShapeState, Shape };
export { datastore, subscribe, unsubscribe };