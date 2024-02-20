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
import { useTodos } from "@/hooks/todos";

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
 const {currentUser, filter, sort, handleFilterChange, handleSortChange, displayedTodos} = useTodos()

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
            {displayedTodos.map((todo) => (
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
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Todos
