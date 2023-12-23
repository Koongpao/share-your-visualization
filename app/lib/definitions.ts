export type TlibraryAndTags = {
    library: {
        name: string,
        is_library: boolean,
        status: string,// deaw koi pliean
    }[],
    tags: {
        name: string,
        is_library: boolean,
        status: string,
    }[]
    
}
