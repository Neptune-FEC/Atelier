import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(style) {
    const { handleStyleSelect, handleSizeSelect, handleQuantitySelect } = this.props;
    handleStyleSelect(style);
    handleSizeSelect(null, null);
    handleQuantitySelect(null);
  }

  render() {
    const { styles, selectedStyle } = this.props;
    const allStyles = styles.results;
    return (
      <div className="overview-styles">
        <span style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '1.3rem' }}>
          Styles
          {' '}
          {'>'}
          {' '}
        </span>
        <span style={{ fontSize: '1.3rem' }}>
          {selectedStyle.name}
        </span>
        <div className="style-thumbnails">
          {allStyles.map((style) => (
            <div key={style.style_id} className="style-thumbnail-container">
              <div
                role="presentation"
                className="style-thumbnail"
                onClick={() => this.handleClick(style)}
                onKeyPress={this.handleKeyPress}
                style={{ backgroundImage: `url(${style.photos[0].thumbnail_url}`, borderWidth: selectedStyle === style ? '2px' : '0px' }}
              />
              {selectedStyle === style ? <i className="check-icon-visible fa fa-check-circle" /> : <div />}
            </div>
          ))}
        </div>

      </div>
    );
  }
}

export default StyleSelector;
