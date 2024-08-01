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

const CurrencyConverter = () => {
  const {
    data: exchangeRates,
    setAmount,
    setBaseCurrency,
    setToCurrency,
    baseCurrency,
    toCurrency,
    amount,
  } = useFetchLatestRates();
  const { data: currencyList } = useFetchCurrencyList();

  const form = useForm<FormValues>({
    defaultValues: {
      amount,
      toCurrency,
      baseCurrency,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAmount(data.amount);
    setBaseCurrency(data.baseCurrency);
    setToCurrency(data.toCurrency);
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
              <div className="flex flex-col gap-1 sm:flex-row">
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
              <div className="flex flex-col gap-1 sm:flex-row">
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
            <Button type="submit" className="w-full mt-6">
              Convert
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
