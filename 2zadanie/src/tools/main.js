export function r(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomObject(data, states) {
  return data.map((item) => {
    return {
      ...item,
      state: "gray",
      rating: r(1, 5),
      review: r(0, 200),
      reply: r(0, 20),
      update: r(0, 5),
      totalShops: 0,
      syncShops: 0,
      isTurnedOff: false,
    };
  });
}

export function sortItems(data) {
  if (!data || data.length === 0) {
    return {};
  }

  const colorOrder = { purple: 0, orange: 1, gray: 2 };

  const sortedData = data
    .filter((item) => item.state)
    .sort((a, b) => {
      return colorOrder[a.state] - colorOrder[b.state];
    });

  return sortedData;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomCompany(company, states) {
  let newState = states[getRandomNumber(0, states.length - 1)];
  while (newState === company.state) {
    newState = states[getRandomNumber(0, states.length - 1)];
  }

  const isSync = getRandomNumber(0, 10);
  const totalShops = getRandomNumber(10, 120);

  let companyUpdate = {
    ...company,
    state: newState,
    rating: 0,
    review: 0,
    reply: 0,
    update: 0,
    totalShops: 0,
    syncShops: 0,
    isTurnedOff: true,
  };

  if (
    company.id === 5 &&
    newState === "gray" &&
    getRandomNumber(41, 42) === 42
  ) {
    return {
      ...companyUpdate,
    };
  } else if (isSync === 0) {
    return {
      ...companyUpdate,
      rating: r(1, 5),
      review: r(0, 200),
      reply: r(0, 20),
      update: r(0, 5),
      totalShops: totalShops,
      syncShops: getRandomNumber(1, totalShops),
      isTurnedOff: false,
    };
  } else {
    return {
      ...companyUpdate,
      state: newState,
      rating: getRandomNumber(1, 5),
      review: getRandomNumber(0, 200),
      reply: getRandomNumber(0, 20),
      update: getRandomNumber(0, 5),
      totalShops: totalShops,
      syncShops: totalShops,
      isTurnedOff: false,
    };
  }
}
