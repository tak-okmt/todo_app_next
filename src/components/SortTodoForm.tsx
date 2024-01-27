import { FormControl, FormLabel, Heading, Input, Select } from "@chakra-ui/react";
import { Sort } from "@/pages/todos";

export default function SortTodoForm({
  sort,
  handleSortChange
}: {
  sort: string,
  // sort: Sort,
  handleSortChange: any
}) {
  return (
    <>
      <Heading as='h3'>並び替え</Heading>
      <FormControl>
        <FormLabel>作成日</FormLabel>
        <Select name="created_at" value={sort} onChange={(e) => handleSortChange(e)}>
          <option value="">指定なし</option>
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </Select>
      </FormControl>
    </>
  )
}