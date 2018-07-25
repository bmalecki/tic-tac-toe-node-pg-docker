import { range } from 'lodash';
import BOARD_SIZE from '../constants/boardSize';
import FIELD_STATUS from '../constants/fieldStatus';

const FIELD_SIZE = 90;
const OFFSET = 10;

function clear({ ctx, width, height }) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(0, 50, 50, 1)';
  ctx.fillRect(0, 0, width, height);
}

function createCoordinates(ctx) {
  ctx.font = '20px serif';

  range(BOARD_SIZE.ROW).forEach((i) => {
    ctx.fillStyle = 'black';
    ctx.fillText(
      String.fromCharCode('A'.charCodeAt(0) + i),
      5,
      (FIELD_SIZE * i) + 45
    );

    range(BOARD_SIZE.COLUMN).forEach((k) => {
      ctx.fillText(k + 1, OFFSET + (FIELD_SIZE * k) + (0.75 * FIELD_SIZE), 20);
    });
  });
}

function setUnitColor({
  ctx, fields, i, k
}) {
  const fieldCoordinate =
    String.fromCharCode('A'.charCodeAt(0) + i) + (k + 1);

  switch (fields[fieldCoordinate]) {
    case FIELD_STATUS.WINNER_O:
      ctx.fillStyle = 'blue';
      break;
    case FIELD_STATUS.WINNER_X:
      ctx.fillStyle = 'red';
      break;
    case FIELD_STATUS.FREE: default:
      ctx.fillStyle = 'white';
  }
}

function drawUnit({ ctx, i, k }) {
  ctx.beginPath();
  ctx.fillRect(
    25 + (FIELD_SIZE * k),
    25 + (FIELD_SIZE * i),
    FIELD_SIZE, FIELD_SIZE
  );
  ctx.rect(
    25 + (FIELD_SIZE * k),
    25 + (FIELD_SIZE * i),
    FIELD_SIZE, FIELD_SIZE
  );
  ctx.stroke();
}

function drawO(ctx, i, k) {
  ctx.beginPath();
  ctx.arc(
    25 + (FIELD_SIZE * k) + (FIELD_SIZE / 2),
    25 + (FIELD_SIZE * i) + (FIELD_SIZE / 2),
    0.4 * FIELD_SIZE, 0, 2 * Math.PI, true
  );
  ctx.stroke();
}

function drawX(ctx, i, k) {
  const x = 25 + (FIELD_SIZE * k) + (FIELD_SIZE / 2);
  const y = 25 + (FIELD_SIZE * i) + (FIELD_SIZE / 2);

  ctx.beginPath();

  ctx.moveTo(x - 20, y - 20);
  ctx.lineTo(x + 20, y + 20);

  ctx.moveTo(x + 20, y - 20);
  ctx.lineTo(x - 20, y + 20);
  ctx.stroke();
}

function setUnitContent({
  ctx, fields, i, k
}) {
  const fieldCoordinate =
    String.fromCharCode('A'.charCodeAt(0) + i) + (k + 1);

  switch (fields[fieldCoordinate]) {
    case FIELD_STATUS.X:
    case FIELD_STATUS.WINNER_X:
      drawX(ctx, i, k);
      break;
    case FIELD_STATUS.O:
    case FIELD_STATUS.WINNER_O:
      drawO(ctx, i, k);
      break;
    case FIELD_STATUS.FREE: default:
      ctx.fillStyle = 'white';
  }
}

function createFields(ctx, fields) {
  ctx.lineWidth = '2';
  ctx.strokeStyle = 'black';

  range(BOARD_SIZE.ROW).forEach((i) => {
    range(BOARD_SIZE.COLUMN).forEach((k) => {
      setUnitColor({
        ctx, i, k, fields
      });
      drawUnit({ ctx, i, k });
      setUnitContent({
        ctx, i, k, fields
      });
    });
  });
}

function board({
  canvas, fields, width, height
}) {
  const c = canvas;
  const ctx = c.getContext('2d');
  clear({ ctx, width, height });
  createCoordinates(ctx);
  createFields(ctx, fields);
}


export default board;
