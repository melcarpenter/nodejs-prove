exports.resCodes = {
  ok: 200, noContent: 204, notAllowed: 401, userError: 400, notFound: 404, unprocessableEntity: 422, serverError: 500
};

exports.pagination = (data) => {
  let page;
  if (data && data.page) {
    page = parseInt(data.page, 10);
  }
  if (!page) page = 1;

  let limit;
  if (data && data.limit) {
    limit = parseInt(data.limit, 10);
  }
  if (!limit) limit = 10;

  return { page, limit };
};

exports.getBonus = (total) => {
  if (total >= 100000 && total < 249999) return 0.025;
  if (total >= 250000 && total < 499999) return 0.05;
  if (total >= 500000 && total < 999999) return 0.075;
  if (total >= 1000000 && total < 4999999) return 0.1;
  if (total >= 5000000) return 0.2;
  return 0.0;
};
