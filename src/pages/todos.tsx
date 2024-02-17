import React, { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import { Button, Heading, Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Todo, TodoContext } from "./_app"
import FilterTodoForm from "@/components/FilterTodoForm";
import SortTodoForm from "@/components/SortTodoForm";
import { isUsersOwnTodo } from "@/lib/userOwnTodo";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { handleLogoutClick } from "@/lib/logout";

export type Filter = {
  title?: string;
  status?: "notStartYet" | "inProgress" | "completed";
}
export type Sort = "asc" | "desc" | ""

export const statusForDisplay = {
  notStartYet: "未着手",
  inProgress: "進行中",
  completed: "完了"
}

const Todos = () => {
  const { todos } = useContext(TodoContext)

  const [filter, setFilter] = useState<Filter>({})
  const [sort, setSort] = useState<Sort>("")
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([])

  const currentUser = getAuth(app).currentUser

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    setFilter({ ...filter, [target.name]: target.value })
  }

  const filteringTodos = (targetTodos: Todo[]) => {
    const newArray = targetTodos.filter((todo) => {
      if (!isUsersOwnTodo(todo, currentUser)) return false
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
    const value: Sort = e.target.value as Sort
    setSort(value)
  }

  useEffect(() => {
    let newArray: Todo[];
    newArray = filteringTodos(todos)
    newArray = sortingTodos(newArray)
    setDisplayedTodos(newArray)
  }, [filter, sort, todos]) // HACK: filter, sortのどちらか一方が変わらなくても毎回実行されてしまう状態なのでパフォーマンス的にはベストではない？

  return (
    <>
      <Heading as='h1'>todo一覧</Heading>
      <br />
      <Button as={NextLink} href="/todos/create">
        新規Todo作成へ
      </Button>
      {currentUser ? (
        <Button onClick={handleLogoutClick}>ログアウト</Button>
      ) : (
        <Link as={NextLink} href="/signin">
          ログインはこちら
        </Link>
      )}

      <br />
      <br />

      <FilterTodoForm
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <SortTodoForm
        sort={sort}
        handleSortChange={handleSortChange}
      />

      <br />
      <br />

      <TableContainer>
        <Table>
          <TableCaption>todo一覧</TableCaption>
          <Thead>
            <Tr>
              <Th>タイトル</Th>
              <Th>内容</Th>
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
