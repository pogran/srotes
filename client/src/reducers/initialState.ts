export interface IntInitStores {
    stores: object[],
    loading: boolean,
    filterName: string
}

export const initStores: IntInitStores = {
    stores: [],
    loading: false,
    filterName: ''
}

/**
 * Comments
 */
export interface IntInitComments {
    data: object[],
    loading: boolean
}
export const initComments: IntInitComments = {
    data: [],
    loading: true 
}