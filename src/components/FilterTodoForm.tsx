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
          <option value="notStartYet">notStartYet</option>
          <option value="inProgress">inProgress</option>
          <option value="completed">completed</option>
        </Select>
      </FormControl>
    </>
  )
}