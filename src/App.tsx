import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import KakaoProvider from "./providers/kakao-provider";
import { Toaster } from "react-hot-toast";
import SSEProvider from "./providers/SSE-provider";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <KakaoProvider>
          <SSEProvider>
            <RouterProvider router={router} />
          </SSEProvider>
        </KakaoProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
