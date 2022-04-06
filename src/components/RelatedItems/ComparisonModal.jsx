import React from 'react';

class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleActionButtonClick() {
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
            comparison modal
            <button
              type="button"
              onClick={() => this.handleActionButtonClick()}
            >
              X
            </button>
            {
              product.features.map(({ feature, value }, i) => (
                value
                  ? (
                    <p key={i}>
                      {value.replace(/["]+/g, '')}
                      {/* removes the quotes from the feature */}
                      {/* {console.log(product)}  */}
                    </p>
                  )
                  : (
                    <p key={i}>
                      {feature}
                      {/* {console.log(product)} */}
                    </p>
                  )

              ))
            }
          </div>
        )
        : (
          <button
            type="button"
            onClick={() => this.handleActionButtonClick()}
          >
            action button
          </button>
        )
    );
  }
}

export default ComparisonModal;
