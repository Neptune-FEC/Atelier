import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(style) {
    const { handleStyleSelect } = this.props;
    handleStyleSelect(style);
  }

  render() {
    const { styles } = this.props;
    const allStyles = styles.results;
    return allStyles.map((style) => (
      <div
        role="button"
        tabIndex="0"
        key={style.style_id}
        onClick={() => this.handleClick(style)}
        onKeyPress={this.handleKeyPress}
      >
        {style.name}
      </div>
    ));
  }
}

export default StyleSelector;
