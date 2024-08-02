import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetchCurrencyList, useFetchLatestRates } from "@/hooks";
import { FormValues } from "@/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Currencies } from "@/constants";
import { LoaderCircleIcon } from "lucide-react";

const ButtonLoader = () => (
  <Button className="w-full" disabled>
    <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
    Loading
  </Button>
);

const CurrencyConverter = () => {
  const {
    data: exchangeRates,
    setAmount,
    setBaseCurrency,
    baseCurrency,
    amount,
    isFetching,
  } = useFetchLatestRates();
  const { data: currencyList } = useFetchCurrencyList();

  const [selectedCurrency, setSelectedCurrency] =
    useState<keyof typeof Currencies>("USD");

  const convertedAmount = exchangeRates.find(
    ({ currency }) => currency === selectedCurrency
  )?.rate;

  const form = useForm<FormValues>({
    defaultValues: {
      amount,
      toCurrency: selectedCurrency,
      baseCurrency,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAmount(data.amount);
    setBaseCurrency(data.baseCurrency);
    setSelectedCurrency(data.toCurrency);
  };

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Get the Latest Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="flex flex-row gap-1">
                <FormField
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="baseCurrency"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            <SelectLabel>Currencies</SelectLabel>
                            {currencyList?.map(({ currency, name }) => (
                              <SelectItem value={currency} key={currency}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-1">
                <FormField
                  name="converted"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Converted To</FormLabel>
                      <FormControl>
                        <Input {...field} value={convertedAmount} readOnly />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="toCurrency"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            <SelectLabel>Currencies</SelectLabel>
                            {currencyList?.map(({ currency, name }) => (
                              <SelectItem value={currency} key={currency}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="p-0 mt-6">
              {isFetching ? (
                <ButtonLoader />
              ) : (
                <Button type="submit" className="w-full" disabled={!amount}>
                  Convert
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
