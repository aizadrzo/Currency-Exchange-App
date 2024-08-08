import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { useFetchCurrencyList } from "@/hooks";
import { ExchangeRates, FormValues } from "@/types";
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
import { Currencies } from "../constants/Currencies";
import { LoaderCircleIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TProps = {
  amount: number;
  baseCurrency: keyof typeof Currencies;
  exchangeRates: ExchangeRates[];
  isFetching: boolean;
  setAmount: (val: number) => void;
  setBaseCurrency: (val: keyof typeof Currencies) => void;
};

const schema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: "Amount must be a positive number",
      })
      .positive("Amount must be greater than zero")
      .min(1)
  ),
  baseCurrency: z.enum(Object.keys(Currencies) as [keyof typeof Currencies]),
  toCurrency: z.enum(Object.keys(Currencies) as [keyof typeof Currencies]),
});

const ButtonLoader = () => (
  <Button className="w-full rounded-full" disabled>
    <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
    Loading
  </Button>
);

const CurrencyConverter = ({
  amount,
  baseCurrency,
  exchangeRates,
  isFetching,
  setAmount,
  setBaseCurrency,
}: TProps) => {
  const { data: currencyList } = useFetchCurrencyList();

  const [selectedCurrency, setSelectedCurrency] =
    useState<keyof typeof Currencies>("USD");

  const convertedAmount = exchangeRates.find(
    ({ currency }) => currency === selectedCurrency
  )?.rate;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount,
      toCurrency: selectedCurrency,
      baseCurrency,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setAmount(data.amount);
    setBaseCurrency(data.baseCurrency);
    setSelectedCurrency(data.toCurrency);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Latest Rates</CardTitle>
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
                      {form.formState.errors.amount?.message && (
                        <FormMessage>
                          {form.formState.errors.amount.message}
                        </FormMessage>
                      )}
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
              <p className="text-sm">
                For <span className="font-semibold">learning purposes</span>{" "}
                only. Please consult a real money exchange for accurate rates.
              </p>
              <div className="mt-4">
                {isFetching ? (
                  <ButtonLoader />
                ) : (
                  <Button type="submit" className="w-full rounded-full">
                    Convert Currency
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
