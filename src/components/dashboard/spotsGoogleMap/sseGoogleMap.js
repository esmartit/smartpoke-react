import { useState, useEffect, useRef } from "react";

class sseDataSevice {

  useEventSource(url) {
    const visitIn = useRef(0);
    const visitLimit = useRef(0);
    const visitOut = useRef(0);
    const visitHourNew = useRef((new Date()).getHours());
    const visitAntIn = useRef(0);;
    const visitAntLimit = useRef(0);
    const visitAntOut = useRef(0);
    const [data, updateData] = useState({
      valueIn: 0,
      valueLimit: 0,
      valueOut: 0,
    });

    useEffect(() => {
      let isMounted = true;
      let seGoogleMap = new EventSource(url);
      seGoogleMap.onmessage = function logEvents(event) {
        if (isMounted) {
          let eventData = JSON.parse(event.data);
          let visitHour = (new Date(eventData.time)).getHours();
          let dataIn = eventData.inCount;
          let dataLimit = eventData.limitCount;
          let dataOut = eventData.outCount;
          if (visitHour !== visitHourNew) {
              visitIn.current += dataIn;
              visitLimit.current += dataLimit;
              visitOut.current += dataOut;
              visitAntIn.current = dataIn;
              visitAntLimit.current = dataLimit;
              visitAntOut.current = dataOut;
              visitHourNew.current = visitHour;
          } else {
              if (dataIn !== visitAntIn || dataLimit !== visitAntLimit || dataOut !== visitAntOut) {
                  visitIn.current = (visitIn + dataIn) - visitAntIn;
                  visitLimit.current = (visitLimit + dataLimit) - visitAntLimit;
                  visitOut.current = (visitOut + dataOut) - visitAntOut;
                  visitAntIn.current = dataIn;
                  visitAntLimit.current = dataLimit;
                  visitAntOut.current = dataOut;
              } else {
                  visitIn.current += 0;
                  visitLimit.current += 0;
                  visitOut.current += 0;
              }
          }          
        }
        data.valueIn = visitIn.current;
        data.valueLimit = visitLimit.current;
        data.valueOut = visitOut.current;
        updateData(data);
      };
      
      seGoogleMap.onerror = () => {
        seGoogleMap.close();
      }
      return () => {
        isMounted = false;
        seGoogleMap.close();
      };    
    }, [url, data]);
  
    return data;
  };

};

export default new sseDataSevice();
