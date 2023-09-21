import ScomNetworkPicker from '@scom/scom-network-picker';

const chainIds = [56, 97, 137, 80001, 43113, 43114];
const networks = chainIds.map(v => { return { chainId: v } });

export default {
    dataSchema: {
        type: 'object',
        properties: {
            networks: {
                type: 'array',
                required: true,
                items: {
                    type: 'object',
                    properties: {
                        chainId: {
                            type: 'number',
                            enum: chainIds,
                            required: true
                        }
                    }
                }
            },
        }
    },
    uiSchema: {
        type: 'VerticalLayout',
        elements: [
            {
                type: 'Control',
                scope: '#/properties/networks',
                options: {
                    detail: {
                        type: 'VerticalLayout'
                    }
                }
            }
        ]
    },
    customControls() {
        return {
            '#/properties/networks/properties/chainId': {
                render: () => {
                    const networkPicker = new ScomNetworkPicker(undefined, {
                        type: 'combobox',
                        networks
                    });
                    return networkPicker;
                },
                getData: (control: ScomNetworkPicker) => {
                    return control.selectedNetwork?.chainId;
                },
                setData: (control: ScomNetworkPicker, value: number) => {
                    control.setNetworkByChainId(value);
                }
            }
        }
    }
}