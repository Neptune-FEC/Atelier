import React from 'react';

function SizeSelector(props) {
  const { handleSizeSelect } = props;
  const { skus } = props;
  const allSkuIds = Object.keys(skus);
  function handleChange(event) {
    const [skuId] = event.target.value.split(',');
    handleSizeSelect(skuId);
  }
  return (
    <select onChange={handleChange}>
      {allSkuIds.map((skuId) => (
        <option key={skuId} value={skuId}>
          {skus[skuId].size}
        </option>
      ))}
    </select>
  );
}

export default SizeSelector;
