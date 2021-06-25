import React from 'react';
// @ts-ignore
import { Block, Button, View} from 'vcc-ui';
import ProductPanelContainer from "./components/ProductPanelContainer";

export default function App() {
  return (
      <Block extend={{ padding: 20 }}>
          <View spacing={2}>
              <View
                  padding={[1, 2]}
                  extend={{
                      border: '1px solid grey',
                      padding: 20,
                  }}
              >
                <ProductPanelContainer />
              </View>
          </View>
      </Block>
  );
}