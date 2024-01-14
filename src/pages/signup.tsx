import React, { useState } from "react"
import { useRouter } from "next/router"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "../lib/firebase"

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = getAuth(app)
  // 必要な処理：onChangeでstate更新、onSubmitでユーザ登録（firebase）
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
  }
  const handleSubmit = async () => {
    console.log({ email, password })
    await createUserWithEmailAndPassword(auth, email, password)
    router.push("/")
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
        登録
      </Button>
    </>
  )
}

export default Signup