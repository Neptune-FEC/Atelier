const averageRating = (ratingObject) => {
  let total = 0;
  let totalCount = 0;
  const rates = Object.keys(ratingObject);
  if (rates.length === 0) {
    return 0;
  }
  for (let i = 0; i < rates.length; i += 1) {
    const rate = parseInt(rates[i], 10);
    const count = parseInt(ratingObject[rate], 10);
    totalCount += count;
    total += rate * count;
  }
  return { totalCount, avgRating: Math.floor((total / totalCount) * 4) / 4 };
};

const sortAnsHelper = (listOfAnswers) => {
  const sellerResponses = [];
  const otherResponses = [];
  listOfAnswers.forEach((ans) => (ans.answerer_name === 'Seller' ? sellerResponses.push(ans) : otherResponses.push(ans)));
  sellerResponses.sort((a, b) => b.helpfulness - a.helpfulness);
  otherResponses.sort((a, b) => b.helpfulness - a.helpfulness);
  const allResponses = sellerResponses.concat(otherResponses);
  return allResponses;
};

module.exports = {
  averageRating,
  sortAnsHelper,
};
