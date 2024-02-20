import { useContext, useEffect, useMemo, useState } from "react"
import { getAuth } from "firebase/auth"
import { app } from "@/lib/firebase"
import { Todo, TodoContext } from "@/pages/_app"
import { isUsersOwnTodo } from "@/lib/userOwnTodo"
import { Filter, Sort } from "@/pages/todos"

export const useTodos = () => {
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
      // TODO firebaseのデータ構造：todoの作成者のuidが入れて、それを使ってログインユーザーのtodoのみを表示する
      // フロントでフィルタリングはあまり好ましくない
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

  // パフォーマンス向上のためにuseMemoを使ってみる
  // useEffect(() => {
  //   let newArray: Todo[];
  //   newArray = useMemo(() => filteringTodos(todos), [todos, filter]);
  //   newArray = useMemo(() => sortingTodos(newArray), [newArray, sort]);
  //   setDisplayedTodos(newArray);
  // }, [filter, sort, todos]);

  return {
    currentUser,
    displayedTodos,
    filter,
    handleFilterChange,
    handleSortChange,
    sort,
  }
}