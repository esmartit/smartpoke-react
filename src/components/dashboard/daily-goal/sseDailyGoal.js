import { useState, useEffect } from "react";

class sseDataService {

  useEventDailyGoal(url) {
    const [goal, updateGoal] = useState(null);
  
    useEffect(() => {
      let isMounted = true;

      let sseDailyGoal = new EventSource(url);
      sseDailyGoal.onmessage = function logEvents(event) {
        if (isMounted) updateGoal(JSON.parse(event.data));
      };
      sseDailyGoal.onerror = () => {
        sseDailyGoal.close();
      }
      return () => {
        isMounted = false;
        sseDailyGoal.close();
      };
    }, [url]);
  
    return goal;
  };
};

export default new sseDataService();
