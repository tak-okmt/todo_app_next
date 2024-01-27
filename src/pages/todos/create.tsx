import React, { useContext, useState } from "react"
import NextLink from "next/link"
import { Todo, TodoContext } from "../_app"
import { Button, FormControl, FormLabel, Heading, Input, Link, Select } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Create = () => {
  const router = useRouter()
  const { todos, setTodos } = useContext(TodoContext)
  const [todoId, setTodoId] = useState<number>(todos.length + 1)
  const [todo, setTodo] = useState<Todo>({
    id: todoId,
    title: "",
    status: "notStartYet",
    createdAt: new Date()
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    setTodo({ ...todo, [target.name]: target.value })
  }

  const handleCreateButtonClick = () => {
    setTodos([...todos, todo])
    setTodoId((prevId) => prevId + 1)
    alert("新規todoの作成が完了しました")
    router.push("/todos")
  }

  return (
    <>
      <Heading as='h1'>新規Todo作成</Heading>
      <FormControl>
        <FormLabel>タイトル</FormLabel>
        <Input
          type="text"
          id="title"
          name="title"
          value={todo.title}
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>内容</FormLabel>
        <Input
          type="textarea"
          id="detail"
          name="detail"
          value={todo.detail}
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>ステータス</FormLabel>
        <Select name="status" value={todo.status} onChange={(e) => handleInputChange(e)}>
          <option value="notStartYet">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="completed">完了</option>
        </Select>
      </FormControl>
      <Button onClick={handleCreateButtonClick}>
        作成する
      </Button>
      <Link as={NextLink} href="/todos">
        Todo一覧へ戻る
      </Link>
    </>
  )
}
export default Create