import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvents, onUpdateEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvents = (calendarEvent) => {
    dispatch(onSetActiveEvents(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {

    try {

      //*Actualizar el evento
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      //*Crear el evento.
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      // dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) );

    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar.', error.response.data.msg, 'error');
    }

  }


  const startDeleteEvent = () => {
    //Todo Llegar al backend
    dispatch(onDeleteEvent());
  }


  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events');
      const eventos = convertEventsToDate(data.eventos);
      dispatch(onLoadEvents(eventos));

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
