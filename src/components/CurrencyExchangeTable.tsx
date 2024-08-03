import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currencies } from "@/constants";
import { useFetchLatestRates } from "@/hooks";
import { formatMoney } from "@/lib/utils";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const CurrencyExchangeTable = () => {
  const { data: exchangeRates } = useFetchLatestRates();
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="relative w-full">
        <Input
          className="pl-9"
          placeholder="Search Currencies..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute top-0 left-0 w-4 h-4 m-3 text-muted-foreground" />
      </div>
      <Table>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead colSpan={3}>Country</TableHead>
            <TableHead className="text-right">Currency</TableHead>
            <TableHead className="text-right">Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exchangeRates
            .filter(({ currency }) => {
              return search.toLowerCase() === ""
                ? currency
                : currency.includes(search) ||
                    currency.toLowerCase().includes(search) ||
                    Currencies[currency].includes(search) ||
                    Currencies[currency].toLowerCase().includes(search);
            })
            .map(({ currency, rate }) => (
              <TableRow key={currency}>
                <TableCell colSpan={3}>{Currencies[currency]}</TableCell>
                <TableCell className="text-right">{currency}</TableCell>
                <TableCell className="text-right">
                  {formatMoney(currency, rate)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CurrencyExchangeTable;
