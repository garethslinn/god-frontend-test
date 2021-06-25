import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Block, Button, View} from 'vcc-ui';
import ProductPanel from "./components/ProductPanel";

interface CarData {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
}

export default function App() {
    const [carData, setCarData] = useState<CarData[]>([]);
    useEffect(() => {
        fetch('api/cars.json')
            .then(response => response.json())
            .then(data => setCarData(data))
        console.log('carData', carData)
    }, []);

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
                <div className="productPanelContainer">
                  {carData &&
                  carData.map((item:CarData) => {
                      return (<>
                          <ProductPanel
                              id={item.id}
                              bodyType={item.bodyType}
                              modelName={item.modelName}
                              modelType={item.modelType}
                              imageUrl={item.imageUrl}
                          />
                      </>)
                  })
                  }
                </div>
              </View>
          </View>
      </Block>
  );
}