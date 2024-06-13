import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetchCurrencyList, useFetchLatestRates } from "@/hooks";
import { FormValues } from "@/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem>
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
                  <SelectContent>
                    {currencyList?.map(({ currency }) => (
                      <SelectItem value={currency} key={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="converted"
            render={({ field }) => (
              <FormItem>
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
            render={({ field }) => {
              console.log(field);
              return (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue>{field.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {currencyList?.map(({ currency }) => (
                        <SelectItem value={currency} key={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
        </div>
        <Button type="submit">Convert</Button>
      </form>
    </Form>
  );
};

export default CurrencyConverter;
