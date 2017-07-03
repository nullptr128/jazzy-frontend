/**
 * Jazzy-Frontend
 * 
 * Simple component that indicates progress.
 */

import * as React from 'react';

interface GaugeProps {
    value: number;
    total: number;
}

/**
 * Returns CSS-friendly width based on value/total fields.
 * @param props props with value and total amounts
 */
function getGaugeWidthStyle( props: GaugeProps ): string {
    const widthPercent: number = Math.max( 0 , ( props.value / props.total ) * 100 );
    return `${widthPercent}%`;
}

const Gauge: React.SFC<GaugeProps> = (props) => {
    return (
        <div className="gauge gauge-purple">
            <div className="gauge-inner" style={ { width: getGaugeWidthStyle( props ) } }>
            </div>
        </div>
    );
};

export default Gauge;
