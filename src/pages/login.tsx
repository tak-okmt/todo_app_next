import React, { useState } from "react"
import { useRouter } from "next/router"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "../lib/firebase"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    }
    catch (e: any) {
      let errorCode = e.code;
      let errorMessage = e.message;
      if (errorCode === 'auth/wrong-password') {
        alert('パスワードが異なります');
      } else if (errorCode === 'auth/invalid-email') {
        alert('メールアドレスが不正です');
      } else if (errorCode === 'auth/user-disabled') {
        alert('無効なユーザです');
      } else if (errorCode === 'auth/user-not-found') {
        alert('登録されていないユーザです');
      }
      else {
        alert(errorMessage);
      }
      console.log(e);
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
    </>
  )
}

export default Login