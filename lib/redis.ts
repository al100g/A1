import Redis from 'ioredis';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) {
    return null;
  }
  if (!redisClient) {
    try {
      redisClient = new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
        enableOfflineQueue: false,
        maxRetriesPerRequest: 1,
      });
      redisClient.on('error', () => {
        redisClient = null;
      });
    } catch {
      return null;
    }
  }
  return redisClient;
}

export default getRedisClient;
