import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.disPlayImage = this.disPlayImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(style) {
    const { handleStyleSelect, handleSizeSelect, handleQuantitySelect } = this.props;
    handleStyleSelect(style);
    handleSizeSelect(null, null);
    handleQuantitySelect(null);
    this.disPlayImage(style.style_id);
  }

  disPlayImage(styleId) {
    const { indexStyleMapping, setIndexImage, setIndexThumbnail } = this.props;
    const imageIndex = indexStyleMapping[styleId];
    // document.getElementById('thumbnail_0').scrollTop(`${imageIndex * 33}%`);
    document.getElementById(`img_${imageIndex}`).scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
    setIndexImage(imageIndex);
    // setIndexThumbnail(imageIndex);
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
