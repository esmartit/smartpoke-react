import { useState, useEffect } from "react";

class sseDataService {

  useEventDailyGoal(url) {
    const [dailyGoal, updateDailyGoal] = useState(null);
  
    useEffect(() => {
      let isMounted = true;

      let sseDailyGoal = new EventSource(url);
      sseDailyGoal.onmessage = function logEvents(event) {
        if (isMounted) updateDailyGoal(JSON.parse(event.data));
      };
      sseDailyGoal.onerror = () => {
        sseDailyGoal.close();
      }
      return () => {
        isMounted = false;
        sseDailyGoal.close();
      };
    }, [url]);

    if (!dailyGoal) return 0;
  
    return dailyGoal.count;
  };
};

export default new sseDataService();
