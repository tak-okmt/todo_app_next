import React, { useContext, useEffect, useState } from "react"
import { FormControl, FormLabel, Heading, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Todo, TodoContext } from "./_app"
import FilterTodoForm from "@/components/filterToDoForm";

// TODO:
// 1. ソート
// 2. TODO作成ボタン

export type Filter = {
  title?: string;
  status?: "notStartYet" | "inProgress" | "completed";
}

const Todos = () => {
  const { todos, setTodos } = useContext(TodoContext)

  const [filter, setFilter] = useState<Filter>({})
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    setFilter({ ...filter, [target.name]: target.value })
  }

  const filteringTodos = () => {
    const newArray = todos.filter((todo) => {
      if (filter.title && !todo.title.includes(filter.title)) {
        return false
      }
      if (filter.status && filter.status !== todo.status) {
        return false
      }
    })
    setFilteredTodos(newArray)
  }

  useEffect(() => {
    filteringTodos()
  }, [filter, todos])

  return (
    <>
      <Heading as='h1'>todo一覧</Heading>

      <FilterTodoForm
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <TableContainer>
        <Table>
          <TableCaption>todo一覧</TableCaption>
          <Thead>
            <Tr>
              <Th>タイトル</Th>
              <Th>詳細</Th>
              <Th>ステータス</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTodos.map((todo) => {
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