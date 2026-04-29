async function* dataStream(total) {
  for (let i = 1; i <= total; i++) {
    await new Promise(r => setTimeout(r, 10));
    yield i;
  }
}

async function* filterEven(source) {
  try {
    for await (const item of source) {
      if (item % 2 === 0) yield item;
    }
  } 
  catch (err) {
    throw err;
  }
}

async function* mapTimes10(source) {
  try {
    for await (const item of source) {
      yield item * 10;
    }
  } 
  catch (err) {
    throw err;
  }
}

async function take(source, n) {
  const results = [];
  try {
    for await (const item of source) {
      results.push(item);
      if (results.length >= n) break;
    }
  } 
  catch (err) {
    throw err;
  }
  return results;
}

async function main() {
  try {
    const stream = dataStream(20);
    const evens = filterEven(stream);
    const mapped = mapTimes10(evens);
    
    const result = await take(mapped, 4);

    console.log("Result:", result);

    console.log("\nOne by one:");
    for await (const val of dataStream(5)) {
      console.log("Get:", val);
    }
  } catch (err) {
    console.error("Pipeline execution failed:", err.message);
  }
}

main();
