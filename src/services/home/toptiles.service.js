import { useState, useEffect } from "react";


class endpointDataService {

  useEventSource(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
      // const interval = setInterval(() => {
        let eventSource = new EventSource(url);
        eventSource.onmessage = e => setData(JSON.parse(e.data));
      // }, 5000);
      // return () => clearInterval(interval);
    }, [url]);

    return data;  
  };
}

export default new endpointDataService();
