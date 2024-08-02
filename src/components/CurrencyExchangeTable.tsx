import React from "react";
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

const CurrencyExchangeTable = () => {
  const { data: exchangeRates } = useFetchLatestRates();

  return (
    <React.Fragment>
      <div className="relative w-full">
        <Input className="pl-9" placeholder="Search Currencies..." />
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
          {exchangeRates.map(({ currency, rate }) => (
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
    </React.Fragment>
  );
};

export default CurrencyExchangeTable;
