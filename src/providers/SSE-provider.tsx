import { useEffect } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

export default function SSEProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getItem: getAccessToken } = useLocalStorage("accessToken");

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const eventSource = new EventSource(
      `https://api.urisik.com/api/notifications/subscribe?accessToken=${accessToken}`,
    );
    eventSource.onmessage = (event) => {
      console.log("SSE 수신:", event.data);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <>{children}</>;
}
