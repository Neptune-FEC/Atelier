import React from "react";

function QuantitySelector(props) {
  const { skus, skuId, handleQuantitySelect } = props;
  function handleChange(event) {
    const quantity = event.target.value;
    handleQuantitySelect(quantity);
  }
  if (skuId) {
    const { quantity } = skus[skuId];
    const quantities = [];
    for (let i = 1; i <= quantity; i += 1) {
      quantities.push(i);
    }

    return (
      <select onChange={handleChange}>
        {quantities.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    );
  }
  return (
    // skuId ? <div>{skus[skuId]}</div> : <div>No size selected</div>
    <div>None</div>
  );
}

export default QuantitySelector;
