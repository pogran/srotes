export interface initStores {
    stores: any,
    loading: boolean,
    filterName: string
}

export const initStores: initStores = {
    stores: [],
    loading: false,
    filterName: ''
};

export const initComments: {data: any[], loading: boolean} = {
    data: [],
    loading: true,
};