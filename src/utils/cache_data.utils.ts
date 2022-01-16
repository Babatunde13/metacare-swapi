
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cacheData: { [key: string]: any} = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setKey = (key: string, value: any) => {
    cacheData[key] = value
}

export const getKey = (key: string) => {
    return cacheData[key]
}
