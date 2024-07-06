namespace utils {
    export function columnToLetter(column): string {
        let temp, letter = "";
        while (column > 0) {
            temp = (column - 1) % 26;
            letter = String.fromCharCode(temp + 65) + letter;
            column = (column - temp - 1) / 26;
        }
        return letter;
    }

    export function* indexOfSubstrings(str: string, searchValue: string): Generator<number, void, unknown> {
        let i = 0;
        while (true) {
            const r = str.indexOf(searchValue, i);
            if (r !== -1) {
                yield r;
                i = r + 1;
            } else return;
        }
    }

    export function getInfoByTag(source: string, name: string): string {
        const begin = source.indexOf(name);
        const end = source.indexOf('\\"', begin + name.length)
        return source.substring(begin + name.length, end)
    }
}
