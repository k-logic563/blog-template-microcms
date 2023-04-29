import { sleep } from '../sleep'

test('sleep waits for the given amount of time', async () => {
  expect(await sleep(100)).toBe(100)
})
