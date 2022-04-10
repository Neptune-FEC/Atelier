import React from 'react';

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSizeDropdown: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
  }

  toggleDropdown() {
    const { isSizeDropdown } = this.state;
    this.setState({
      isSizeDropdown: !isSizeDropdown,
    });
  }

  selectQuantity(selectedQuantity) {
    const { handleQuantitySelect } = this.props;
    this.setState({
      isSizeDropdown: false,
    });
    handleQuantitySelect(selectedQuantity);
  }

  render() {
    const { skus, skuId, selectedQuantity } = this.props;
    const { isSizeDropdown } = this.state;
    const quantities = [];
    let pointerEvents = 'none';
    if (skuId) {
      pointerEvents = 'auto';
      const { quantity } = skus[skuId];
      const limit = Math.min(quantity, 15);
      for (let i = 1; i <= limit; i += 1) {
        quantities.push(i);
      }
    }
    return (
      <div className="overview-quantity">
        <div role="presentation" className="selector quantity-selector" onClick={() => this.toggleDropdown()} style={{ pointerEvents: `${pointerEvents}` }}>
          {selectedQuantity || '-'}
          <i className="select-icon fa fa-angle-down" />
          {isSizeDropdown && (
            <ul className="options">
              {quantities.map((element) => (
                <li role="presentation" className="option-item" key={element} value={element} onClick={() => { this.selectQuantity(element); }}>
                  {element}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      // <select onChange={handleChange}>
      //   {quantities.map((element) => (
      //     <option key={element} value={element}>
      //       {element}
      //     </option>
      //   ))}
      // </select>
    );
  }
  // return(
  //     // skuId ? <div>{skus[skuId]}</div> : <div>No size selected</div>
  //     <div />
  //   );
}

export default QuantitySelector;
