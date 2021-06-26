import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Block, Button, View} from 'vcc-ui';
import ProductPanel from "../components/ProductPanel";
import { ItemProps } from '../types/types';
import NavigationControl from "./NavigationControl";

export default function ProductPanelContainer() {
    const [carData, setCarData] = useState<ItemProps[]>([]);
    const [containerWidth, setContainerWidth] = useState();
    const [navigation, setNavigation] = useState();
    const [itemtotal, setItemTotal] = useState(8);
    const desktopWidth = 1024;
    const mobileWidth = 481;

    const movePanel = (direction: number) => {
        // 0: backwards, 1: forwards
        const panelDirection = direction ? (navigation - containerWidth) : (navigation + containerWidth)
        setNavigation(panelDirection);
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
        setNavigation(0);
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
      <Block>
        <div ref={ref} className="productPanelWrapper">
            <Block>
                <div style={positionStyle()} className="productPanelContainer">
                  {carData &&
                  carData.map((item:ItemProps) => {
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
            </Block>
            <NavigationControl fnc={movePanel} />
        </div>
      </Block>
  );
}