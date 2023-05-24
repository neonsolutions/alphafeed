from tasks import ingest, score
import time

ONE_HOUR = 3600

while True:
    start_time = time.time()
    ingest()
    score()
    end_time = time.time()

    sleep_time = ONE_HOUR - (end_time - start_time)

    print(f"Sleeping for {sleep_time} seconds")

    time.sleep(sleep_time)
