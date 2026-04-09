async function* dataStream(total) {
  for (let i = 1; i <= total; i++) {
    await new Promise(r => setTimeout(r, 10)); 
    yield i;
  }
}
 
async function* filterEven(source) {
  for await (const item of source) {
    if (item % 2 === 0) yield item;
  }
}
 
async function* mapTimes10(source) {
  for await (const item of source) {
    yield item * 10;
  }