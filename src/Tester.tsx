import React from 'react';
import Num from './Num';
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

interface ITesterState {
  max: number;
  plus: boolean;
  unknown: number;
  numbers: number[];
  error: boolean;
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export default class Tester extends React.Component<{}, ITesterState> {
  state = {
    max: 13,
    plus: true,
    unknown: 0,
    numbers: [0, 0, 0],
    error: false
  }

  generateNumbers() {
    let c = getRandom(11, this.state.max);
    let b = getRandom(c - 9, 9);
    let a = c - b;
    let plus = Math.random() > 0.5
    this.setState({
      ...this.state,
      plus,
      unknown: Math.floor(Math.random() * 3),
      numbers: plus ? [a, b, c] : [c, a, b],
      error: false,
    })
  }

  handle(right: boolean) {
    if (right) {
      this.generateNumbers();
    } else {
      this.setState({
        ...this.state,
        error: true,
      })
    }
  }

  changeMax(_: any, val: any) {
    if (val !== this.state.max) {
      this.setState({
        ...this.state,
        max: val
      }, () => this.generateNumbers())
    }
  }

  render() {
    return <div>
      <Typography variant="h5" style={{ color: 'red' }}>{this.state.error ? 'Chyba !' : '\u00a0'}</Typography>
      <Num value={this.state.numbers[0]} hidden={this.state.unknown === 0} handle={this.handle.bind(this)} />
      <Typography variant="h6" style={{ display: 'inline' }}>{this.state.plus ? ' + ' : ' - '}</Typography>
      <Num value={this.state.numbers[1]} hidden={this.state.unknown === 1} handle={this.handle.bind(this)} />
      <Typography variant="h6" style={{ display: 'inline' }}> = </Typography>
      <Num value={this.state.numbers[2]} hidden={this.state.unknown === 2} handle={this.handle.bind(this)} />
      <br></br>
      <Slider step={1} min={11} max={18} valueLabelDisplay="auto" defaultValue={13} onChange={this.changeMax.bind(this)} style={{ width: 200, paddingTop: 100}}></Slider>
    </div>
  }

  componentDidMount() {
    this.generateNumbers()
  }
}
