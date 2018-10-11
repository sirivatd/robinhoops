export const fetchStocks = () => {
  return $.ajax({
    method: "GET",
    url: "api/stocks"
  });
};

export const fetchStock = id => {
  return $.ajax({
    method: "GET",
    url: `api/stocks/${id}`
  });
};
