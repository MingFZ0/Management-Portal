import {testPing, testDocs, testCollections} from './api'

test('call ping endpoint', async() => {

  let result = await testPing();
  expect(result).toBe('pong');
});

test('Call list collections', async()=>{
  let result = await testCollections();
  //Since the content can vary, just check for something coming back
  expect(result.length).toBeGreaterThan(0);
})

test('list docs in collection ', async() => {
  let result = await testDocs();
  //Since the content can vary, just check for something coming back
  expect(result.length).toBeGreaterThan(0);
});