import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvents, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../helpers";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvents = (calendarEvent) => {
    dispatch(onSetActiveEvents(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    // TODO Update event

    // TODO If todo bien
    if (calendarEvent._id) {
      //* Actualizando
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      //*Creando

      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log({ data });

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      // dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) );
    }
  }

  const startDeleteEvent = () => {
    //Todo Llegar al backend
    dispatch(onDeleteEvent());
  }


  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events');      
      const eventos = convertEventsToDate( data.eventos );      
      console.log(eventos);

    } catch (error) {
      console.log('Error cargando eventos.');
      console.log(error);
    }
  }

  return {
    events, activeEvent, hasEventSelected: !!activeEvent,

    setActiveEvents, startSavingEvent, startDeleteEvent, startLoadingEvents,
  }
}
