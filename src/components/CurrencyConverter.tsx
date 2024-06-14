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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[350px] space-y-3 p-3"
      >
        <div className="flex gap-x-2">
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
        <div className="flex gap-x-2">
          <FormField
            name="converted"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Converted Amount</FormLabel>
                <FormControl>
                  <Input {...field} value={exchangeRates[0]?.rate} readOnly />
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
        <Button type="submit" className="w-full">
          Convert
        </Button>
      </form>
    </Form>
  );
};

export default CurrencyConverter;
