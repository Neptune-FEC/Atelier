import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(style) {
    const { handleStyleSelect } = this.props;
    handleStyleSelect(style);
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
                style={{ backgroundImage: `url(${style.photos[0].thumbnail_url}` }}
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
