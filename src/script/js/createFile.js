/**
 * * Create a downloading file
 * @param {String} variableName
 * @param {[]||{}} data
 */
export async function createFile(variableName, data) {
    data = `export const ${variableName} = ${JSON.stringify(data)}`;
    const file = new File([data], "hearthStone.js", {
        type: "application/json",
    });
    saveAs(file);
}
