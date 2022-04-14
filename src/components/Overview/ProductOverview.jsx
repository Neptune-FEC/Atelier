import React from 'react';

function ProductOverview(props) {
  const { product } = props;
  const { features } = product;
  return (
    <div className="description-features">
      <div className="overview-description">
        <h3>{product.slogan}</h3>
        <p>{product.description}</p>
      </div>
      <div className="overview-features">
        {features.map((feature) => (
          <li className="feature-item" key={feature.feature}>
            <span>
              {feature.feature}
              :
              {' '}
            </span>
            <span>{feature.value}</span>
          </li>
        ))}

      </div>

    </div>
  );
}

export default ProductOverview;
