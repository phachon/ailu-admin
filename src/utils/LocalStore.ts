function stringify(value: unknown): string {
    return JSON.stringify(value)
}

function parse<T>(value: string): T | null {
    try {
        return JSON.parse(value) as T
    } catch (error) {
        return null
    }
}

interface ILocalStore {
    setValue(key: string, data: unknown): ILocalStore;
    getValue<T>(key: string, defaultValue?: T): T | null;
    removeValue(key: string): ILocalStore;
}

const LocalStore: ILocalStore = {
    setValue(key: string, data: unknown): ILocalStore {
        localStorage.setItem(key, stringify(data))
        return this
    },
    getValue<T>(key: string, defaultValue?: T): T | null {
        const value = localStorage.getItem(key)

        if (!value) return defaultValue || null
        const data = parse<T>(value)
        return data
    },
    removeValue(key: string): ILocalStore {
        localStorage.removeItem(key)
        return this
    }
}

export default LocalStore