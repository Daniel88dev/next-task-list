import { ShoppingListItemType } from "@/drizzle/shoppingList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  items: ShoppingListItemType[];
};

const ShoppingListTable = ({ items }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={`shoppingItem-${item.id}`}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>TO_DO</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShoppingListTable;
