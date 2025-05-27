interface Newable<A> {
    new (): A;
}

type InstanceMap<N> = Map<Newable<N>, N[]>;

interface SlottedParamsInterface<N> {
	target: ShadowRoot;
    connected: boolean;
    assignedInstances: Array<[string, Newable<N>]>;
    assignedMatches: Array<[string, string]>;
}

interface SlottedResultsInterface<N> {
    assignedInstances: Map<string, InstanceMap<N>>;
    assignedMatches: Map<string, Map<string, N[]>>; 
}

interface SlottedInterface {
    assignedInstances<N>(slotName: string, newable: Newable<N>): N[];
    assignedMatches(slotName: string, selector: string): Element[];
}

// class Slotted implements SlottedInterface {

// 	constructor(params: SlottedParamsInterface<Node>) {
//         let { target, assignedInstances, assignedMatches, connected} = params;


// 	}
// }

export type { SlottedInterface, SlottedParamsInterface };

// export { Slotted };
