import React, { ComponentType } from 'react';
import {
  DesignType,
  MappingType,
} from './type';
import {
  Consumer,
  forwardProps,
  getComponentMapping,
} from '../service';

export interface Props<P> extends React.ClassAttributes<P> {
  mapping: MappingType;
}

export function withDesign<P extends Props<P>>(Component: ComponentType<P>) {
  type TExcept = Exclude<keyof P, keyof Props<P>>;
  type ForwardedProps = Pick<P, TExcept>;

  class Shadow extends React.Component<ForwardedProps> {
    wrappedComponentRef = undefined;
    getWrappedInstance = undefined;

    setWrappedComponentRef = (ref) => {
      this.wrappedComponentRef = ref;
    };

    getComponentName = () => Component.displayName || Component.name;

    renderWrappedComponent = (design: DesignType[]) => (
      <Component
        ref={this.setWrappedComponentRef}
        mapping={getComponentMapping(this.getComponentName(), design)}
        {...this.props}
      />
    );

    render() {
      return (
        <Consumer>
          {this.renderWrappedComponent}
        </Consumer>
      );
    }
  }

  const Result = Shadow;
  Result.prototype.getWrappedInstance = function getWrappedInstance() {
    const hasWrappedInstance = this.wrappedComponentRef && this.wrappedComponentRef.getWrappedInstance;
    return hasWrappedInstance ? this.wrappedComponentRef.getWrappedInstance() : this.wrappedComponentRef;
  };

  return forwardProps(Component, Result);
}
