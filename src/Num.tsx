import React from 'react';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography'

interface INumProps {
  value: number;
  hidden: boolean;
  handle: (right: boolean) => void;
}

interface INumState {
  value: string;
}

export default class Num extends React.Component<INumProps, INumState> {
  state = {
    value: ''
  }

  updateInput(e: any) {
    this.setState({
      ...this.state,
      value: e.target.value,
    })
  }

  handleSubmit(e: any) {
    if (e.key === 'Enter') {
      this.props.handle(parseInt(this.state.value) === this.props.value);
      this.setState({
        ...this.state,
        value: '',
      })
    }
  }

  render() {
    if (this.props.hidden) {
      return <Input onChange={this.updateInput.bind(this)} value={this.state.value} onKeyPress={this.handleSubmit.bind(this)} autoFocus style={{ width: 50, fontSize: '1.25rem', fontWeight: 500}}/>
    } else {
      return <Typography variant="h6" style={{ display: 'inline'}}>{this.props.value}</Typography>;
    }
  }
}
