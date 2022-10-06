import requireGlob from "glob";

let id = 0;

const globalDefinitions = requireGlob("*.mjs", {
  keygen() {
    // We want a flat structure here
    return id++;
  },
});

console.log(globalDefinitions);

export const definitions = Object.values(globalDefinitions);
