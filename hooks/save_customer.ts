

export function main(args: any) {
    let record = args.record

    let buf = []

    if (record.firstName) {
        buf.push(record.firstName)
    }

    if (record.lastName) {
        buf.push(record.lastName)
    }

    if (buf.length > 0) {
        record.name = buf.join(" ")
    }
}