import React from 'react';

function Overview({
  styles, selectedStyle, children, handleClick,
}) {
  return styles && selectedStyle ? (
    <>
      <section>
        <div className="container">
          <div className="overview-upper-part">
            <div className="left-container">
              {children[0]}
            </div>
            <div className="right-container">
              {children[1]}
              {children[2]}
              {children[3]}
              {children[4]}
              {children[5]}
              {children[6]}
            </div>
          </div>
        </div>
      </section>
      <section role="presentation" onClick={(e) => { handleClick(e, 'Overview'); }}>
        <div className="container">
          <div className="overview-lower-part">
            {children[7]}
          </div>
        </div>
      </section>
    </>
  ) : (
    <div>loading</div>
  );
}

export default Overview;
