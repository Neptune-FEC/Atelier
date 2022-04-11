import React from 'react';

function SizeSelector(props) {
  function selectSize(size, skuId) {
    const {
      handleSizeSelect, handleQuantitySelect, toggleDropdown,
    } = props;
    toggleDropdown();
    handleSizeSelect(size, skuId);
    handleQuantitySelect(1);
  }
  const {
    skus, selectedSize, isSizeDropdown, toggleDropdown, setMessage,
  } = props;
  const allSkuIds = Object.keys(skus);
  const inStockSkuIds = [];
  for (let i = 0; i < allSkuIds.length; i += 1) {
    const skuId = allSkuIds[i];
    const sku = skus[skuId];
    if (sku.quantity > 0) {
      inStockSkuIds.push(skuId);
    }
  }
  let pointerEvents = 'auto';
  let size = selectedSize;
  if (inStockSkuIds.length === 0) {
    pointerEvents = 'none';
    size = 'OUT OF STOCK';
  }
  return (
    <div
      className="overview-size"
      role="presentation"
      onClick={() => { setMessage(); }}
    >
      <div role="presentation" className="selector" onClick={() => toggleDropdown()} style={{ pointerEvents: `${pointerEvents}` }}>
        {size || 'Select size'}
        <i className="select-icon fa fa-angle-down" />
        {isSizeDropdown && (
          <ul className="options">
            {inStockSkuIds.map((id) => (
              <li role="presentation" className="option-item" key={id} value={id} onClick={() => { setMessage(); selectSize(skus[id].size, id); }}>
                {skus[id].size}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SizeSelector;
