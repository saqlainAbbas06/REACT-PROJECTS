const { useState, useMemo } = React;

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.77,
  JPY: 149.3,
};

const CURRENCY_CODES = Object.keys(EXCHANGE_RATES);

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const convertedAmounts = useMemo(() => {
    const amountInUSD = amount / EXCHANGE_RATES[fromCurrency];

    return CURRENCY_CODES.reduce((acc, code) => {
      acc[code] = amountInUSD * EXCHANGE_RATES[code];
      return acc;
    }, {});
  }, [amount, fromCurrency]);

  const displayValue = convertedAmounts[toCurrency].toFixed(2);

  return (
    <div className="currency-converter">
      <h2>Quick Convert</h2>

      <label htmlFor="amount-input">Amount</label>
      <input
        id="amount-input"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <label htmlFor="from-currency">From</label>
      <select
        id="from-currency"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {CURRENCY_CODES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>

      <label htmlFor="to-currency">To</label>
      <select
        id="to-currency"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {CURRENCY_CODES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>

      <p className="result">
        {displayValue} {toCurrency}
      </p>
    </div>
  );
}