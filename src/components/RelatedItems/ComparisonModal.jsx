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

  render() {
    const { product, currentProduct } = this.props;
    const { isVisible } = this.state;

    return (
      isVisible
        ? (
          <div
            className="comparisonModal"
          >
            <div
              className="modalContent"
            >
              comparison modal
              <button
                type="button"
                onClick={() => this.toggleModal()}
              >
                X
              </button>
              {
                product.features.map(({ feature, value }, i) => (
                  value
                    ? (
                      <p key={i}>
                        {value.replace(/["]+/g, '')}
                      </p>
                    )
                    : (
                      <p key={i}>
                        {feature}
                      </p>
                    )

                ))
              }
              {
                currentProduct.features.map(({ feature, value }, i) => (
                  value
                    ? (
                      <p key={i}>
                        {value.replace(/["]+/g, '')}
                      </p>
                    )
                    : (
                      <p key={i}>
                        {feature}
                      </p>
                    )

                ))
              }
            </div>
          </div>
        )
        : (
          <button
            className="actionButtonCompModal"
            type="button"
            onClick={() => this.toggleModal()}
          >
            *
          </button>
        )
    );
  }
}

export default ComparisonModal;
