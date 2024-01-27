import React, { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import { Button, Heading, Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Todo, TodoContext } from "./_app"
import FilterTodoForm from "@/components/FilterTodoForm";
import SortTodoForm from "@/components/SortTodoForm";

export type Filter = {
  title?: string;
  status?: "notStartYet" | "inProgress" | "completed";
}
// export type Sort = "asc" | "desc" | ""
export type Sort = string // handleSortChangeでのsetSortへの代入で型エラーが出るので一旦こちら

export const statusForDisplay = {
  notStartYet: "未着手",
  inProgress: "進行中",
  completed: "完了"
}

const Todos = () => {
  const { todos, setTodos } = useContext(TodoContext)

  const [filter, setFilter] = useState<Filter>({})
  const [sort, setSort] = useState<Sort>("")
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    setFilter({ ...filter, [target.name]: target.value })
  }

  const filteringTodos = (targetTodos: Todo[]) => {
    const newArray = targetTodos.filter((todo) => {
      if (filter.title && !todo.title.includes(filter.title)) {
        return false
      }
      if (filter.status && filter.status !== todo.status) {
        return false
      }
      return true
    })
    return newArray
  }

  const sortingTodos = (targetTodos: Todo[]) => {
    const newArray = targetTodos.sort((a, b) => {
      if (sort === 'asc') {
        return (a.createdAt > b.createdAt ? 1 : -1);
      } else if (sort === 'desc') {
        return (a.createdAt < b.createdAt ? 1 : - 1);
      } else {
        return 0
      }
    })
    return newArray
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: Sort = e.target.value
    setSort(value)
  }

  useEffect(() => {
    let newArray: Todo[];
    newArray = filteringTodos(todos)
    newArray = sortingTodos(newArray)
    setDisplayedTodos(newArray)
  }, [filter, sort, todos]) // HACK: filter, sortのどちらか一方が変わらなくても毎回実行されてしまう状態

  return (
    <>
      <Heading as='h1'>todo一覧</Heading>

      <FilterTodoForm
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <SortTodoForm
        sort={sort}
        handleSortChange={handleSortChange}
      />

      <Button as={NextLink} href="/todos/create">
        新規Todo作成へ
      </Button>

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
            {displayedTodos.map((todo) => {
              return (
                <Tr key={todo.id}>
                  <Td>
                    <Link as={NextLink} href={`/todos/${todo.id}`}>
                      {todo.title}
                    </Link>
                  </Td>
                  <Td>{todo.detail}</Td>
                  <Td>{statusForDisplay[todo.status]}</Td>
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