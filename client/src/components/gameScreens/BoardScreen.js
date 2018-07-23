import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import board from '../../game/board';

class BoardScreen extends React.Component {
  state = {
    width: 350,
    height: 350
  };

  componentDidMount() {
    this.updateBoard();
  }

  componentDidUpdate() {
    this.updateBoard();
  }

  updateBoard() {
    board({
      canvas: this.canvas,
      fields: this.props.fields,
      width: this.state.width,
      height: this.state.height
    });
  }

  render() {
    const { width, height } = this.state;

    return (
      <div>
        <h2>{this.props.text}</h2>
        <canvas
          ref={(canvas) => { this.canvas = canvas; }}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

BoardScreen.propTypes = {
  text: PropTypes.string.isRequired,
  roomid: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const joinFieldAndPlayerSign = (fields, players) => {
  if (!fields) {
    return {};
  }

  return Object.assign(
    {},
    ...Object.keys(fields).map(k => ({ [k]: players[fields[k]].sign }))
  );
};

const mapStateToProps = (state, props) => ({
  //fields: state.fields[props.roomid] || {}

  fields: joinFieldAndPlayerSign(state.fields[props.roomid], state.players)
});

export default connect(mapStateToProps)(BoardScreen);
