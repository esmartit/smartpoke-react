import { useState, useEffect } from "react";

class sseDataService {

  useEventSource(url) {
    // const [data, updateData] = useState([]);
    const [data, updateData] = useState({});
    useEffect(() => {
      let isMounted = true;
      let seSpotMap = new EventSource(url);
      seSpotMap.onmessage = function logEvents(event) {
        if (isMounted) {
          // updateData(JSON.parse(event.data));
          let eventData = JSON.parse(event.data);
          for (let i=0; i < eventData.length; i++) { 
              let name = eventData[i].name;
              let value = eventData[i].value;
              data[name] = value
          }
        }
        updateData(data);
      };

      seSpotMap.onerror = () => {
        seSpotMap.close();
      };
      return () => {
        isMounted = false;
        seSpotMap.close();
      };
    });

    return data;
  }
}

export default new sseDataService();
