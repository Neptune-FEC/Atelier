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
  fullStart,
  emptyStar,
  quaterStar,
  halfStar,
  thirdQuaterStar,
) => {
  const remainderStars = 5 - starRating;
  const remainder = remainderStars - Math.floor(remainderStars);
  const stars = [];
  for (let i = 1; i < starRating; i += 1) {
    stars.push(fullStart);
  }
  if (remainder === 0.5) {
    stars.push(halfStar);
  }
  if (remainder === 0.25) {
    stars.push(quaterStar);
  }
  if (remainder === 0.75) {
    stars.push(thirdQuaterStar);
  }
  for (let i = 1; i < remainderStars; i += 1) {
    stars.push(emptyStar);
  }

  return stars;
};

const displayStars = (rating) => {
  // star logos html
  const fullStar = <i className="full-star fa fa-star" />;
  const emptyStar = <i className="empty-star full-star fa fa-star" />;
  const quaterStar = <i className="half-star fa fa-star-half" />;
  const halfStar = <i className="half-star fa fa-star-half" />;
  const thirdQuaterStar = <i className="half-star fa fa-star-half" />;

  return displayStarRating(
    rating,
    fullStar,
    emptyStar,
    quaterStar,
    halfStar,
    thirdQuaterStar,
  );
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
  displayStarRating,
  displayStars,
  sortAnsHelper,
};
