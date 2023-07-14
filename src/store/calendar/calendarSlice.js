import { createSlice } from "@reduxjs/toolkit";

/**
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Titulo del evento",
  notes: "Notas del evento",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    id: "123465",
    name: "Rafael Brenes",
  },
};
 */

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
     events: [
      // tempEvent
    ],
    isLoadingEvents: true,
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvents: (state, { payload }) => {      
      state.activeEvent = payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },

    onDeleteEvent: (state) => {

      if (state.activeEvent) {

        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }


    },

    onLoadEvents: (state, { payload= [] }) => {
      state.isLoadingEvents = false;
      // state.event = payload;

      payload.forEach(event => {
        const exist = state.events.some(dbEvent => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });


    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvents, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents,
} = calendarSlice.actions;
