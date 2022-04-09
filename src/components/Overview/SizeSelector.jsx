import React from 'react';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSizeDropdown: false,
      size: null,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectSize = this.selectSize.bind(this);
  }

  toggleDropdown() {
    const { isSizeDropdown } = this.state;
    this.setState({
      isSizeDropdown: !isSizeDropdown,
    });
  }

  selectSize(size, skuId) {
    const { handleSizeSelect, handleQuantitySelect } = this.props;
    this.setState({
      size,
      isSizeDropdown: false,
    });
    handleSizeSelect(skuId);
    handleQuantitySelect(1);
  }

  render() {
    const { skus } = this.props;
    const { size, isSizeDropdown } = this.state;
    const allSkuIds = Object.keys(skus);
    return (
      <div className="overview-size">
        <div role="presentation" className="selector" onClick={() => this.toggleDropdown()}>
          {size || 'Select size'}
          <i className="select-icon fa fa-angle-down" />
          {isSizeDropdown && (
            <ul className="options">
              {allSkuIds.map((id) => (
                <li role="presentation" className="option-item" key={id} value={id} onClick={() => { this.selectSize(skus[id].size, id); }}>
                  {skus[id].size}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      // <div className="overview-size">
      //   <select className="size-selector" onChange={handleChange}>
      //     <option value="none" selected disabled hidden>Select an Option</option>
      //     {allSkuIds.map((skuId) => (
      //       <option key={skuId} value={skuId}>
      //         {skus[skuId].size}
      //       </option>
      //     ))}
      //   </select>
      // </div>
    );
  }
}

export default SizeSelector;
