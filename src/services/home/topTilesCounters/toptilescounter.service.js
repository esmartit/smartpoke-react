import { useState, useEffect } from "react";

class sseDataService {

useEventSource(url) {
    const [data, updateData] = useState(null);
  
    useEffect(() => {
      let isMounted = true;
      let sse = new EventSource(url);
      sse.onmessage = function logEvents(event) {
        if (isMounted) updateData(JSON.parse(event.data));
      };
      sse.onerror = () => {
        sse.close();
      }
      return () => {
        isMounted = false;
        sse.close();
      };
    }, [url]);
  
    return data;
  };

};

export default new sseDataService();
