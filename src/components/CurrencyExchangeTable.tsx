import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currencies } from "../constants/Currencies";
import { useFetchLatestRates } from "@/hooks";
import { formatMoney } from "@/lib/utils";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import AUFlag from "./flag/AUFlag";
import { CountryFlags } from "@/constants/CountryFlag";

const CurrencyExchangeTable = () => {
  const { data: exchangeRates } = useFetchLatestRates();
  const [search, setSearch] = useState("");

  const filteredCurrencies = useMemo(
    () =>
      exchangeRates.filter(({ currency }) => {
        return search.toLowerCase() === ""
          ? currency
          : currency.includes(search) ||
              currency.toLowerCase().includes(search) ||
              Currencies[currency].includes(search) ||
              Currencies[currency].toLowerCase().includes(search);
      }),
    [search, exchangeRates]
  );

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
            <TableHead colSpan={5}>Country</TableHead>
            <TableHead className="text-right">Currency</TableHead>
            <TableHead className="text-right">Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map(({ currency, rate }) => (
              <TableRow key={currency}>
                <TableCell colSpan={5}>
                  <div className="flex items-center gap-1">
                    {CountryFlags[currency]}
                    <p>{Currencies[currency]}</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">{currency}</TableCell>
                <TableCell className="text-right">
                  {formatMoney(currency, rate)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <p className="text-sm">No matching currencies found.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CurrencyExchangeTable;
