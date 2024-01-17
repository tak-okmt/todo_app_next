import React, { useState } from "react"
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

type Todo = {
  id: number;
  title: string;
  detail: string;
  status: "notStartYet" | "inProgress" | "completed";
}

const Todos = () => {
  const [todo, setTodo] = useState<Todo | {}>({})
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <>
      <TableContainer>
        <Table>
          <TableCaption>todo一覧</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo) => {
              return (
                <Tr key={todo.id}>
                  <Td>{todo.title}</Td>
                  <Td>{todo.detail}</Td>
                  <Td>{todo.status}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Todos