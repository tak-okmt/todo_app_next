import { FormControl, FormLabel, Heading, Input, Select } from "@chakra-ui/react";
import { Filter } from "@/pages/todos";

export default function FilterTodoForm({
  filter,
  handleFilterChange
}: {
  filter: Filter,
  handleFilterChange: any
}) {
  return (
    <>
      <Heading as='h3'>絞り込み</Heading>
      <FormControl>
        <FormLabel>タイトル</FormLabel>
        <Input
          type="text"
          id="titleFilter"
          name="title"
          value={filter.title}
          onChange={(e) => handleFilterChange(e)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>ステータス</FormLabel>
        <Select name="status" value={filter.status} onChange={(e) => handleFilterChange(e)}>
          <option value="">すべて</option>
          <option value="notStartYet">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="completed">完了</option>
        </Select>
      </FormControl>
    </>
  )
}