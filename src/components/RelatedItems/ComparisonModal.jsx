import React from 'react';

class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  toggleModal() {
    const { isVisible } = this.state;

    this.setState({
      isVisible: !isVisible,
    });
  }

  generateComparison(relatedProduct, currentProduct) {
    const relatedProductArray = relatedProduct.features.map(({ feature, value }) => (
      value
        ? (
          `${value.replace(/["]+/g, '')} ${feature}`
        )
        : (
          feature
        )
    ));
    const currentProductArray = currentProduct.features.map(({ feature, value }) => (
      value
        ? (
          `${value.replace(/["]+/g, '')} ${feature}`
        )
        : (
          feature
        )
    ));

    const featuresWithDuplicates = relatedProductArray.concat(currentProductArray);
    const features = [...new Set(featuresWithDuplicates)];
    const relatedCheckmarks = [];
    const currentCheckmarks = [];

    features.forEach((feature) => {
      if (relatedProductArray.includes(feature)) {
        relatedCheckmarks.push('✔');
      } else {
        relatedCheckmarks.push('');
      }
      if (currentProductArray.includes(feature)) {
        currentCheckmarks.push('✔');
      } else {
        currentCheckmarks.push('');
      }
    });

    return {
      features,
      relatedCheckmarks,
      currentCheckmarks,
    };
  }

  render() {
    const { product, currentProduct } = this.props;
    const { isVisible } = this.state;
    const features = this.generateComparison(product, currentProduct);

    return (
      isVisible
        ? (
          <div
            className="comparisonModal"
            onClick={() => this.toggleModal()}
          >
            <div
              className="modalContent"
            >
              <div>
                <span
                  className="modalRelatedName"
                >
                  <b>{product.name}</b>
                </span>
                <span
                  className="modalCurrentName"
                >
                  <b>{currentProduct.name}</b>
                </span>
              </div>
              <div
                className="modalFeatureList"
              >
                {
                  features.features.map((feature, i) => (
                    <div
                      key={i}
                      className="modalFeatureRow"
                    >
                      <span
                        className="modalCurrentProductCheckmark"
                      >
                        {features.currentCheckmarks[i]}
                      </span>
                      <span
                        className="modalComparisonFeature"
                      >
                        {feature}
                      </span>
                      <span
                        className="modalRelatedProductCheckmark"
                      >
                        {features.relatedCheckmarks[i]}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )
        : (
          <i
            className="actionButtonCompModal fa-solid fa-star-exclamation"
            type="button"
            onClick={() => this.toggleModal()}
          ></i>
        )
    );
  }
}

export default ComparisonModal;
