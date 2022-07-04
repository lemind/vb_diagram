import { defaultFont } from "../styles/fonts"

enum TShape {
  Ellipse,
  RoundedRectangle
}
type TNodeData = {
  key: number,
  text: string,
  color: string,
  loc: string,
  shape: TShape,
  font: string
}
type TLinkData = {
  key: number,
  from: number,
  to: number,
  text: string,
  font: string
}

export type TDiagramData = {
  nodeDataArray: TNodeData[],
  linkDataArray: TLinkData[]
}

export const getData = (): TDiagramData => {
  return {nodeDataArray: [
    { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0', shape: TShape.Ellipse, font: defaultFont },
    { key: 1, text: 'Beta', color: 'orange', loc: '0 150', shape: TShape.Ellipse, font: defaultFont },
    { key: 2, text: 'Gamma', color: 'lightgreen', loc: '150 300', shape: TShape.RoundedRectangle, font: defaultFont },
    { key: 3, text: 'Delta', color: 'pink', loc: '300 150', shape: TShape.RoundedRectangle, font: defaultFont },
    { key: 4, text: 'Epsilon', color: 'antiquewhite', loc: '150 0', shape: TShape.RoundedRectangle, font: defaultFont }
  ],
  linkDataArray: [
    { key: -1, from: 0, to: 1, text: 'one', font: defaultFont },
    { key: -2, from: 1, to: 2, text: 'two', font: defaultFont },
    { key: -3, from: 2, to: 3, text: 'three', font: defaultFont },
    { key: -4, from: 3, to: 4, text: 'four', font: defaultFont },
    { key: -5, from: 4, to: 0, text: 'five', font: defaultFont }
  ]}
}