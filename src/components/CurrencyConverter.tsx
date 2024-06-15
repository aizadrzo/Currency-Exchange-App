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
import { Alert, AlertDescription } from "./ui/alert";
import { InfoIcon } from "lucide-react";

const DisclaimerMessage = () => (
  <Alert>
    <InfoIcon width={18} />
    <AlertDescription>
      Rates are for guidance; verify before making financial decisions.
    </AlertDescription>
  </Alert>
);

const CurrencyConverter = () => {
  const {
    exchangeRates,
    setAmount,
    setFromCurrency,
    setToCurrency,
    fromCurrency,
    toCurrency,
    amount,
  } = useFetchLatestRates();
  const { currencyList } = useFetchCurrencyList();

  const form = useForm<FormValues>({
    defaultValues: {
      amount,
      toCurrency,
      fromCurrency,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAmount(data.amount);
    setFromCurrency(data.fromCurrency);
    setToCurrency(data.toCurrency);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout the Latest Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
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
                name="fromCurrency"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
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
            <div className="flex flex-col gap-2 sm:flex-row">
              <FormField
                name="converted"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Converted Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={exchangeRates[0]?.rate}
                        readOnly
                      />
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
            <DisclaimerMessage />
            <Button type="submit" className="w-full">
              Convert
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
