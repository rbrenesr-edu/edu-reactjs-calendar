import { parseISO } from "date-fns";

export const convertEventsToDate = ( eventos = [] ) => {
  return eventos.map ( event=>{

    event.start = parseISO( event.start );
    event.end = parseISO( event.end );

    return event;
  } )
}
