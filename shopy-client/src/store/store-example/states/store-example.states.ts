import { StoreExampleStateInterface } from '@/store/store-example/states/store-example.state.interface';

export const STORE_EXAMPLE_EMPTY_STATE: StoreExampleStateInterface = {
    //puedo no definir example porque le puse el ?
    exampleNumber: 0,
    exampleFunction: () => {},
    exampleObject: {
        exampleAttribute: 'string'
    }
};
