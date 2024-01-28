import NextLink from "next/link"
import { Todo, TodoContext } from "@/pages/_app"
import { Button, FormControl, FormLabel, Heading, Input, Link, Select } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

const TodoEdit = () => {
  const router = useRouter()
  const { id } = router.query
  const { todos, setTodos } = useContext(TodoContext)
  const targetTodo = todos.find((todo) => todo.id === Number(id)) as Todo
  const [editTodo, setEditTodo] = useState<Todo>(targetTodo)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    setEditTodo({ ...editTodo, [target.name]: target.value })
  }

  const handleSaveButtonClick = () => {
    const todosExceptEditTodo = todos.filter((todo) => todo.id !== Number(id))
    setTodos([...todosExceptEditTodo, editTodo])
    alert("保存が完了しました")
    router.push(`/todos/${id}`)
  }

  return (
    <>
      <Heading as='h1'>Todo編集</Heading>
      <FormControl>
        <FormLabel>タイトル</FormLabel>
        <Input
          type="text"
          id="title"
          name="title"
          value={editTodo.title}
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>内容</FormLabel>
        <Input
          type="textarea"
          id="detail"
          name="detail"
          value={editTodo.detail}
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>ステータス</FormLabel>
        <Select name="status" value={editTodo.status} onChange={(e) => handleInputChange(e)}>
          <option value="notStartYet">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="completed">完了</option>
        </Select>
      </FormControl>
      <Button onClick={handleSaveButtonClick}>
        保存する
      </Button>
      <Link as={NextLink} href={`/todos/${id}`}>
        Todo詳細へ戻る
      </Link>
      <Link as={NextLink} href="/todos">
        Todo一覧へ戻る
      </Link>
    </>
  )
}

export default TodoEdit