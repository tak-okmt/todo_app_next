import { Todo } from "@/pages/_app"

export const isUsersOwnTodo = (todo: Todo, currentUser: any) => {
  if (!currentUser || !todo.user_uid) return false
  return todo.user_uid === currentUser.uid ? true : false
}
