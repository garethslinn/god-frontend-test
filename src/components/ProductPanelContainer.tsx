import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Block, Button, View} from 'vcc-ui';
import ProductPanel from "../components/ProductPanel";

interface CarData {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
}

export default function ProductPanelContainer() {
    const [carData, setCarData] = useState<CarData[]>([]);
    const [containerWidth, setContainerWidth] = useState();
    const [navigation, setNavigation] = useState(0);
    const [itemtotal, setItemTotal] = useState(8);
    const desktopWidth = 1024;
    const mobileWidth = 481;

    const movePanel = (direction: number) => {
        let navDirection = navigation - containerWidth;
        setNavigation(navDirection);
    }

    const ref = useRef(null);

    const positionStyle = () => {
        return {
            left: navigation + 'px',
            position: 'relative' as 'relative'
        }
    };

    const setCurrentWidth = () => {
        // @ts-ignore
        let currentWidth = ref.current ? ref.current.offsetWidth : 0;
        setContainerWidth(currentWidth);
    }

    window.addEventListener('resize', setCurrentWidth);

    useEffect(() => {
        fetch('api/cars.json')
            .then(response => response.json())
            .then(data => setCarData(data))
    }, []);

    useEffect(() => {
        setCurrentWidth();
    }, [ref.current]);

  return (
    <>
        <div ref={ref} className="productPanelWrapper">
            <div style={positionStyle()} className="productPanelContainer">
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
        </div>

        <Button onClick={() => movePanel(1)}>Click me!</Button>
    </>
  );
}