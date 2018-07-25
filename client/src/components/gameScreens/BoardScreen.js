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

const mapStateToProps = (state, props) => ({
  //fields: state.fields[props.roomid] || {}

  fields: { A2: 'player1', B2: 'winner_player1' }
});

export default connect(mapStateToProps)(BoardScreen);
