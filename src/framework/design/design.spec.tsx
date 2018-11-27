import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import {
  DesignProvider,
  withDesign,
} from './component';

const designConsumerTestId = '@design/consumer';

class Button extends React.Component<any> {
  static defaultProps = {
    testID: designConsumerTestId,
  };

  render() {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

describe('@design: design consumer checks', () => {

  it('renders properly', async () => {
    const DesignedComponent = withDesign(Button);

    const component = render(
      <DesignProvider>
        <DesignedComponent/>
      </DesignProvider>,
    );

    const designedComponent = component.getByTestId(designConsumerTestId);
    expect(designedComponent).not.toBeNull();
  });

  it('receives mappings prop', async () => {
    const DesignedComponent = withDesign(Button);

    const component = render(
      <DesignProvider>
        <DesignedComponent/>
      </DesignProvider>,
    );

    const designedComponent = component.getByTestId(designConsumerTestId);
    expect(designedComponent.props.theme).not.toBeNull();
  });

});
