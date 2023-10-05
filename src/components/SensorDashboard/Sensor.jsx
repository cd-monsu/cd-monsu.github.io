import React from 'react';
import SensorItemBody from './SensorItemBody';
import SensorDuration from './SensorDuration';
import SensorName from './SensorName';

export const Sensor = () => {
  return (
      <div className='w-[95%] mb-10'>
        <SensorName />
        <SensorItemBody />
        <SensorDuration />
      </div>

  );
};

export default Sensor;
