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

    features.forEach((feature, i) => {
      if (relatedProductArray.includes(feature)) {
        relatedCheckmarks.push('\u2713');
      } else {
        relatedCheckmarks.push('');
      }
      if (currentProductArray.includes(feature)) {
        currentCheckmarks.push('\u2713');
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
          <button
            className="actionButtonCompModal"
            type="button"
            onClick={() => this.toggleModal()}
          >
            ☆
          </button>
        )
    );
  }
}

export default ComparisonModal;
