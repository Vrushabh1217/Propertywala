const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
// const regex = /[A-Z]/g;
const found = paragraph.match(new RegExp(`^.+fox.+`));

console.log(found);
