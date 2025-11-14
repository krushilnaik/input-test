import React from "react";

import { decodeDataProp } from "./encoding";

/**
 * Wrapper to decode data prop before passing to molecule components
 *
 * Can accept additional props to pass through to the component
 */
export function createMoleculeWrapper(
	Component: React.FC<any>,
	additionalProps?: Record<string, any>,
) {
	return (props: any) => {
		const decodedData = decodeDataProp(props.data);
		return <Component {...props} {...additionalProps} data={decodedData} />;
	};
}
