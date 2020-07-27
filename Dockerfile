FROM aredwood/deno

ENV TOKEN=abc \
    CHAT_ID=abc

WORKDIR /app
COPY . /app

ENTRYPOINT [ "deno", "run", "--allow-env", "--allow-net", "--allow-read", "main.ts" ]

