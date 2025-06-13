import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const useSessionId = () => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let storedSessionId = Cookies.get("sessionId");
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      Cookies.set("sessionId", storedSessionId, { expires: 7 });
    }
    setSessionId(storedSessionId);
  }, []);

  return sessionId;
};
export default useSessionId;
