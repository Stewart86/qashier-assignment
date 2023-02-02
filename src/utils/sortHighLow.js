export const sortCP = (json) => {
  let result = {
    small: {
      // < 100
      highest: { lot_available: null, cp_number: [] },
      lowest: { lot_available: null, cp_number: [] },
    },
    medium: {
      // > 100 < 300
      highest: { lot_available: null, cp_number: [] },
      lowest: { lot_available: null, cp_number: [] },
    },
    big: {
      // > 300 < 400
      highest: { lot_available: null, cp_number: [] },
      lowest: { lot_available: null, cp_number: [] },
    },
    large: {
      // > 400
      highest: { lot_available: null, cp_number: [] },
      lowest: { lot_available: null, cp_number: [] },
    },
    refreshDate: new Date(json.items[0].timestamp),
  };

  json.items[0].carpark_data.forEach((carpark) => {
    const sumOfLots = carpark.carpark_info
      .map((lot_type) => Number(lot_type.total_lots))
      .reduce((a, b) => a + b);
    const sumOfAvailableLots = carpark.carpark_info
      .map((lot_type) => Number(lot_type.lots_available))
      .reduce((a, b) => a + b);
    if (sumOfLots > 400) {
      setHighLow(sumOfAvailableLots, carpark.carpark_number, result.large);
    } else if (sumOfLots < 400 && sumOfLots >= 300) {
      // big
      setHighLow(sumOfAvailableLots, carpark.carpark_number, result.big);
    } else if (sumOfLots < 300 && sumOfLots >= 100) {
      // medium
      setHighLow(sumOfAvailableLots, carpark.carpark_number, result.medium);
    } else if (sumOfLots < 100) {
      // small
      setHighLow(sumOfAvailableLots, carpark.carpark_number, result.small);
    }
  });
  return result;
};

function setHighLow(sumOfAvailableLots, carpark_number, size) {
  // check highest and insert
  // if equal amount of lots add to array else pop and add update amount to array
  if (size.highest.lot_available === null) {
    size.highest.lot_available = sumOfAvailableLots;
    size.highest.cp_number.push(carpark_number);
  } else if (size.highest.lot_available === sumOfAvailableLots) {
    size.highest.lot_available = sumOfAvailableLots;
    size.highest.cp_number.push(carpark_number);
  } else if (size.highest.lot_available < sumOfAvailableLots) {
    size.highest.lot_available = sumOfAvailableLots;
    size.highest.cp_number.pop();
    size.highest.cp_number.push(carpark_number);
  }
  // check lowest and insert
  if (size.lowest.lot_available === null) {
    size.lowest.lot_available = sumOfAvailableLots;
    size.lowest.cp_number.push(carpark_number);
  } else if (size.lowest.lot_available === sumOfAvailableLots) {
    size.lowest.lot_available = sumOfAvailableLots;
    size.lowest.cp_number.push(carpark_number);
  } else if (size.lowest.lot_available > sumOfAvailableLots) {
    size.lowest.lot_available = sumOfAvailableLots;
    size.lowest.cp_number.pop();
    size.lowest.cp_number.push(carpark_number);
  }
}
