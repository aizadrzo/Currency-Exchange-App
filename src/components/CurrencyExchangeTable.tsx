import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currencies } from "@/constants/Currencies";
import { CountryFlags } from "@/constants/CountryFlag";
import { cn, formatMoney } from "@/lib/utils";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ExchangeRates } from "@/types";

const splitArrayIntoChunks = (array: ExchangeRates[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const CurrencyExchangeTable = ({
  exchangeRates,
}: {
  exchangeRates: ExchangeRates[];
}) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const paginatedCurrencies = useMemo(
    () => splitArrayIntoChunks(filteredCurrencies, itemsPerPage),
    [filteredCurrencies]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader>
        <div className="relative w-full">
          <Input
            className="pl-9"
            placeholder="Search Currencies..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-0 left-0 w-4 h-4 m-3 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead colSpan={5}>Country</TableHead>
              <TableHead className="text-right">Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCurrencies.length > 0 &&
            paginatedCurrencies[currentPage - 1] ? (
              paginatedCurrencies[currentPage - 1].map(({ currency, rate }) => (
                <TableRow key={currency}>
                  <TableCell colSpan={5}>
                    <div className="flex items-center gap-2">
                      {CountryFlags[currency]}
                      <p>{Currencies[currency]}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatMoney(currency, rate)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <p className="text-sm">No matching currencies found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn("cursor-pointer", {
                  "cursor-not-allowed text-muted-foreground hover:bg-transparent hover:text-muted-foreground":
                    currentPage === 1,
                })}
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {paginatedCurrencies.map((_, index) => {
              const pageIndex = index + 1;
              if (
                pageIndex === 1 ||
                pageIndex === currentPage ||
                pageIndex === paginatedCurrencies.length
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={pageIndex === currentPage}
                      onClick={() => handlePageChange(pageIndex)}
                    >
                      {pageIndex}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (
                pageIndex === paginatedCurrencies.length - 1 &&
                currentPage < paginatedCurrencies.length - 2
              ) {
                return <PaginationItem key={index}>...</PaginationItem>;
              }

              if (pageIndex === 2 && currentPage > 3) {
                return <PaginationItem key={index}>...</PaginationItem>;
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                className={cn("cursor-pointer", {
                  "cursor-not-allowed text-muted-foreground hover:bg-transparent hover:text-muted-foreground":
                    currentPage === paginatedCurrencies.length,
                })}
                onClick={() =>
                  handlePageChange(
                    Math.min(currentPage + 1, paginatedCurrencies.length)
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};

export default CurrencyExchangeTable;
