import redis
import datetime
import json


def inspect(miner_hash):
  miner = r.hget("miner_data", miner_hash)
  miner = json.loads(miner)
  x = miner['shareCredits']


r = redis.Redis(host='127.0.0.1')
miners = r.hgetall("miner_data")
for miner_hash in miners:
  try:
    inspect(miner_hash)
  except Exception:
    print 'oops',miner_hash
