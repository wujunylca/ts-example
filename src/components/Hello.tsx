import * as React from 'react';

interface IsProps {
  title:string
}

export default class Home extends React.Component<IsProps,{}> {
  render() {
    return (
      <div> {`hello ${this.props.title}`} </div>
    )
  }
}
