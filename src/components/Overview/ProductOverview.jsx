import React from 'react';

function ProductOverview(props) {
  const { product, handleClick } = props;
  const { features } = product;
  return (
    <div className="description-features" role="presentation" onClick={(e) => { handleClick(e, 'ProductOverview'); }}>
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
