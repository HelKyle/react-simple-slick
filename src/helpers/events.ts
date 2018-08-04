import { Vector } from './vector';

function getPageX(e: MouseEvent | TouchEvent) {
  return ('touches' in e) ? (<TouchEvent>e).touches[0].pageX : (<MouseEvent>e).pageX;
}

function getPageY(e: MouseEvent | TouchEvent) {
  return ('touches' in e) ? (<TouchEvent>e).touches[0].pageY : (<MouseEvent>e).pageY;
}

export const onTouchStart = (e: any) => {
  const startX = getPageX(e);
  const startY = getPageY(e);
  return {
    startPosition: new Vector(startX, startY),
    currentPosition: new Vector(startX, startY)
  }
}

export const onTouchMove = (e: any) => {
  const currentX = getPageX(e);
  const currentY = getPageY(e);
  return {
    currentPosition: new Vector(currentX, currentY),
  }
}

export const onTouchEnd = (e: any) => {
  const currentX = getPageX(e);
  const currentY = getPageY(e);
  return {
    currentPosition: new Vector(currentX, currentY),
  }
}
