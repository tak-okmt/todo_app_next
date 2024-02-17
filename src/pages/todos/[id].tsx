import { NextPage } from "next";
import NextLink from "next/link"
import { useRouter } from "next/router";
import { useContext } from "react";
import { TodoContext } from "../_app";
import { statusForDisplay } from "../todos";
import { Button, Heading, Link } from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { app, db } from "@/lib/firebase";
import { isUsersOwnTodo } from "@/lib/userOwnTodo";
import { getAuth } from "firebase/auth";

const TodosPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { todos, setTodos } = useContext(TodoContext)
  const targetTodo = todos.find((todo) => todo.id === Number(id))

  const currentUser = getAuth(app).currentUser

  const handleDeleteButtonClick = async () => {
    const confirm = window.confirm("削除します。よろしいですか？")
    if (confirm) {
      if (targetTodo) { await deleteDoc(doc(db, "todos", targetTodo.uid)) }
      const newArray = todos.filter((todo) => todo.id !== Number(id))
      setTodos(newArray)
      alert("todoの削除が完了しました")
      router.push("/todos")
    }
  }

  return (
    <>
      <Heading as='h1'>todo詳細</Heading>
      {targetTodo && isUsersOwnTodo(targetTodo, currentUser) ? (
        <>
          <div>タイトル：{targetTodo.title}</div>
          <div>内容：{targetTodo.detail}</div>
          <div>ステータス：{statusForDisplay[targetTodo.status]}</div>
          <div>作成日：{new Intl.DateTimeFormat('ja-JP').format(targetTodo.createdAt)}</div>
          <div>
            <Button as={NextLink} href={`/todos/${targetTodo.id}/edit`}>
              編集
            </Button>
            <Button onClick={handleDeleteButtonClick}>
              削除
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>該当のTodoは見つかりません</div>
        </>
      )}
      <Link as={NextLink} href="/todos">
        Todo一覧へ戻る
      </Link>
    </>
  )
}

export default TodosPage