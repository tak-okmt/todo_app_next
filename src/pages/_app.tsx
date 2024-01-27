import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  detail?: string;
  status: "notStartYet" | "inProgress" | "completed";
  createdAt: Date;
}

type ContextType = {
  setTodos: (value: Todo[]) => void
  todos: Todo[]
}

export const TodoContext = createContext<ContextType>({} as ContextType)

export default function App({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <ChakraProvider>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <Component {...pageProps} />
      </TodoContext.Provider>
    </ChakraProvider>
  )
}
