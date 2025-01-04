import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function TaskCompletionGauge({ completedTasks, totalTasks }) {
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div style={{ marginTop: '20px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Gauge
        value={completionRate}
        startAngle={-110}
        endAngle={110}
        height={200} 
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontFamily: 'Poppins, sans-serif', 
            fontSize: 23,
            transform: 'translate(0px, 0px)',
          },
          
        }}
        text={({ value }) =>
          value === 100 ? '✅' : totalTasks > 0 ? `${completedTasks}/${totalTasks}` : 'no tasks planned'
        }
      />
    </div>
  );
}
