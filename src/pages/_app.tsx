import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Todo = {
  id: number;
  title: string;
  detail?: string;
  status: "notStartYet" | "inProgress" | "completed";
  createdAt: Date;
  uid: string;
  user_uid: string;
}

type ContextType = {
  setTodos: (value: Todo[]) => void
  todos: Todo[]
}

export const TodoContext = createContext<ContextType>({} as ContextType)

export default function App({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTodoData = async () => {
      let todosData: Todo[] = []
      const querySnapShot = await getDocs(collection(db, "todos"))
      querySnapShot.forEach((doc) => {
        const data = doc.data()
        const todoData = {
          id: data.id,
          title: data.title,
          detail: data.detail,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          uid: doc.id,
          user_uid: data.user_uid,
        }
        todosData.push(todoData)
      })
      setTodos(todosData)
    }
    getTodoData()
  }, [])

  return (
    <ChakraProvider>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <Component {...pageProps} />
      </TodoContext.Provider>
    </ChakraProvider>
  )
}
