FROM redis:3

EXPOSE 6379
VOLUME /data

COPY redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]