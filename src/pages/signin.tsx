import React, { useState } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
} from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "../lib/firebase"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState<any>("")
  const [password, setPassword] = useState<any>("")
  const auth = getAuth(app)

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
  }
  const handleSubmit = async () => {
    console.log({ email, password })
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
      alert('ログインしました')
    }
    catch (e: any) {
      alert('ログインに失敗しました')
    }
  }

  return (
    <>
      <FormControl isRequired>
        <FormLabel>メールアドレス</FormLabel>
        <Input
          type="email"
          onChange={handleChangeEmail}
          value={email}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>パスワード</FormLabel>
        <Input
          type="password"
          onChange={handleChangePassword}
          value={password}
        />
      </FormControl>
      <Button onClick={handleSubmit}>
        ログイン
      </Button>
      <Link as={NextLink} href="/signup">
        新規登録はこちら
      </Link>
    </>
  )
}

export default Login