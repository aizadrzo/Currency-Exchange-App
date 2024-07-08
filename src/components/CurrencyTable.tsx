import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currencies } from "@/constants";
import { useFetchRates } from "@/hooks";

const CurrencyTable = () => {
  const { exchangeRates } = useFetchRates();

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Currency</TableHead>
          <TableHead className="w-[100px]">Past 30d</TableHead>
          <TableHead className="w-[100px]">Past 24h</TableHead>
          <TableHead className="w-[100px] text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exchangeRates.map((rate) => (
          <TableRow>
            <TableCell className="font-medium">
              {Currencies[rate.currency]}
            </TableCell>
            <TableCell>{rate.rate}</TableCell>
            <TableCell>{rate.rate}</TableCell>
            <TableCell className="text-right">{rate.rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CurrencyTable;
