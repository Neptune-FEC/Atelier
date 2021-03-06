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

const displayStarRating = (
  starRating,
  fullStar,
  emptyStar,
  quarterStar,
  halfStar,
  thirdQuarterStar,
) => {
  const remainderStars = 5 - starRating;
  const remainder = remainderStars - Math.floor(remainderStars);
  const stars = [];
  for (let i = 1; i < starRating; i += 1) {
    stars.push(fullStar);
  }
  if (remainder >= 0.75) {
    stars.push(thirdQuarterStar);
  } else if (remainder >= 0.5) {
    stars.push(halfStar);
  } else if (remainder < 0.5) {
    stars.push(quarterStar);
  }
  for (let i = 1; i <= remainderStars; i += 1) {
    stars.push(emptyStar);
  }

  return stars;
};

const displayFullStarRating = (
  starRating,
  fullStar,
  emptyStar,
) => {
  const remainderStars = 5 - starRating;
  const stars = [];
  for (let i = 0; i < starRating; i += 1) {
    stars.push(fullStar);
  }

  for (let i = 0; i < remainderStars; i += 1) {
    stars.push(emptyStar);
  }

  return stars;
};

const sortAnsHelper = (listOfAnswers) => {
  const sellerResponses = [];
  const otherResponses = [];
  listOfAnswers.forEach((ans) => (ans.answerer_name.toLowerCase() === 'seller' ? sellerResponses.push(ans) : otherResponses.push(ans)));
  sellerResponses.sort((a, b) => b.helpfulness - a.helpfulness);
  otherResponses.sort((a, b) => b.helpfulness - a.helpfulness);
  const allResponses = sellerResponses.concat(otherResponses);
  return allResponses;
};

module.exports = {
  averageRating,
  displayStarRating,
  sortAnsHelper,
  displayFullStarRating,
};
