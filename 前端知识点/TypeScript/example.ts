interface a {
    b: string,
    c: string,
    d: {
        e: string[],
        f: number
    }
} 

let cm: a = {
    b: "string",
    c: "string",
    d: {
        e: ["1"],
        f: 1
    }
}

console.log(cm);